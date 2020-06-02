import json
import urllib3
from bs4 import BeautifulSoup
from django.http import HttpResponse, Http404, JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def retrieveRaceList(request):
    try:
        # レース一覧格納用変数
        racelist = list()
        raceTitle: str
        shiba: str
        da: str
        weather:str

        if "inputRaceDate" in request.GET and "inputRaceDate":
            # query_paramが指定されている場合の処理
            inputRaceDate = request.GET.get("inputRaceDate")

            # HTMLソースを取得する
            http = urllib3.PoolManager()
            r = http.request('GET', 'https://race.netkeiba.com/top/race_list_sub.html?kaisai_date=' + inputRaceDate)
            soup = BeautifulSoup(r.data, 'html.parser')

            # 開催場所ごとにループを回す
            for t in soup.select('dl.RaceList_DataList'):
                # レースリストのタイトル(例3回中山2日目)を取得する
                for u in t.findAll('p'):
                    raceTitle = u.get_text()

                # 芝の状態を取得する
                for u in t.select('span.Shiba'):
                    shiba = u.get_text()

                # ダートの状態を取得する
                for u in t.select('span.Da'):
                    da = u.get_text()

                # レースごとに分割
                for v in t.findAll('a'):
                    raceData = RaceData()

                    print('------------------------------------------')
                    tmpItemTitle = None
                    # レースタイトルを取得する
                    for s in v.select('span.ItemTitle'):
                        tmpItemTitle = s.get_text()
                        raceData.itemTitle = s.get_text()

                    # 出走時刻を取得する
                    for s in v.select('span.RaceList_Itemtime'):
                        raceData.itemTime = s.get_text()

                    # 距離と芝orダートを取得する
                    for s in v.select('span.RaceList_ItemLong'):
                        raceData.itemLong = s.get_text()

                    # 頭数を取得する
                    for s in v.select('span.RaceList_Itemnumber'):
                        raceData.itemNumber = s.get_text()

                    # レースのリンクURLを取得する
                    if v.get('href').startswith('../race/result.html?race_id=') or v.get('href').startswith('../race/shutuba.html?race_id=') :
                        raceData.itemLink = v.get('href')

                    # レースの情報(タイトル、芝・ダートの状態)を格納する
                    if tmpItemTitle is not None:
                        raceData.raceTitle = raceTitle
                        raceData.shiba = shiba
                        raceData.da = da
                        racelist.append(raceData)

        # レースリストの辞書化
        # レースリストのKeyを作成する
        dictKeys=list()
        for i in range(len(racelist)):
            dictKeys.append('race'+str(i))

        content = dict(zip(dictKeys,racelist))

        json_str = json.dumps(content, default=default_method, indent=2)
        json_str = json_str.encode("utf-8").decode("unicode-escape").strip('"\n ')
        print(json_str)
        return HttpResponse(json_str)


    except Exception as e:
        print(e)
        content = {'message': 'ERROR'}
        return Response(content, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RaceData():
    # 開催地（2回中山8日目,1回阪神8日目,...）
    raceTitle: str
    # 芝の状態
    shiba: str
    # ダートの状態
    da: str
    # レース名（３歳未勝利,阪神大賞典(G2),...）
    itemTitle: str
    # 出走時刻（15:00,15:35,...）
    itemTime: str
    # レースの距離（2000,3000,...）
    itemLong: str
    # 頭数（14頭,16頭,...）
    itemNumber: str
    # レースURL
    itemLink: str

class Racelist():
    racelist:list()


def default_method(item):
    if isinstance(item, object) and hasattr(item, '__dict__'):
        return item.__dict__
    else:
        raise TypeError

class default_class(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, RaceData):
            return {'raceTitle': o.raceTitle
                , 'shiba': o.shiba
                , 'da': o.da
                , 'itemTitle': o.itemTitle
                , 'itemTime': o.itemTime
                , 'itemLong': o.itemLong
                , 'itemNumber': o.itemNumber
                , 'itemLink': o.itemLink
                    }
        return json.JSONEncoder.default(self, o)
