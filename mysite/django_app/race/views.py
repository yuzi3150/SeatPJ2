import json
from _decimal import ROUND_HALF_UP
from decimal import Decimal

import urllib3
from bs4 import BeautifulSoup
from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def retrieveRace(request):
    try:

        # 馬一覧格納用変数
        horselist = list()

        if "inputItemLink" in request.GET and "inputItemLink":
            # query_paramが指定されている場合の処理
            inputItemLink = request.GET.get("inputItemLink")

            # HTMLソースを取得する
            http = urllib3.PoolManager()
            r = http.request('GET',inputItemLink)
            soup = BeautifulSoup(r.data, 'html.parser')

            # 馬の行分だけループを回す
            for t in soup.select('tr.HorseList'):
                horseData = HorseData()
                # 着順を取得する
                for u in t.select('div.Rank'):
                    horseData.rank = u.get_text().replace('\n','')
                # 馬番・枠を取得する
                for u in t.select('.Num.Txt_C'):
                    horseData.num = int(u.get_text())
                    horseData.numWaku =  int(Decimal(str(horseData.num/2)).quantize(Decimal('0'), rounding=ROUND_HALF_UP))
                # 馬名を取得する
                for u in t.select('span.Horse_Name'):
                    horseData.horseName = u.get_text().replace('\n','')
                # 性齢を取得する
                for u in t.select('.Detail_Left'):
                    horseData.detailLeft = u.get_text().replace('\n','')
                # 斤量を取得する
                for u in t.select('.JockeyWeight'):
                    horseData.jockeyWeight = u.get_text().replace('\n','')
                # 騎手を取得する
                for u in t.select('.Jockey'):
                    horseData.jockey = u.get_text().replace('\n','')
                # タイムを取得する
                for u in t.select('span.RaceTime'):
                    horseData. raceTime= u.get_text().replace('\n','')
                    break
                # 人気を取得する
                for u in t.select('.OddsPeople'):
                    horseData.oddsPeople = u.get_text().replace('\n','')
                # 単勝オッズを取得する
                for u in t.select('.Odds_Ninki'):
                    horseData.oddsNinki = u.get_text().replace('\n','')
                for u in t.select('.Odds.Txt_R'):
                    horseData.oddsNinki = u.get_text().replace('\n','')
                # 後3Fを取得する
                for u in t.select( '.Time.BgOrange'):
                    horseData.time = u.get_text().replace('\n','')
                for u in t.select( '.Time.BgBlue02'):
                    horseData.time = u.get_text().replace('\n','')
                for u in t.select( '.Time.BgYellow'):
                    horseData.time = u.get_text().replace('\n','')
                # 通過順
                for u in t.select( '.PassageRate'):
                    horseData.passageRate = u.get_text().replace('\n','')
                # 厩舎を取得する
                for u in t.select('.Trainer'):
                    horseData.trainer = u.get_text().replace('\n','')
                # 馬体重を取得する
                for u in t.select('.Weight'):
                    horseData.horseWeight = u.get_text().replace('\n','')


                horselist.append(horseData)
        # 馬一覧の辞書化
        # レースリストのKeyを作成する
        dictKeys=list()
        for i in range(len(horselist)):
            dictKeys.append('horse'+str(i))

        content = dict(zip(dictKeys,horselist))

        json_str = json.dumps(content, default=default_method, indent=2)
        json_str = json_str.encode("utf-8").decode("unicode-escape").strip('"\n ')
        print(json_str)
        return HttpResponse(json_str)

    except Exception as e:
        print(e)
        content = {'message': 'ERROR'}
        return Response(content, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class HorseData():
    rank:int#着順
    numWaku:str#枠
    num:str#馬番
    horseName:str#馬名
    detailLeft:str#性齢
    jockeyWeight:str#斤量
    jockey:str#騎手
    raceTime:str#タイム
    oddsPeople:str#人気順位
    oddsNinki:str#単勝オッズ
    time:str#後3F
    passageRate:str#コーナー通過順
    trainer:str#厩舎
    horseWeight:str#馬体重

def default_method(item):
    if isinstance(item, object) and hasattr(item, '__dict__'):
        return item.__dict__
    else:
        raise TypeError



