import datetime
import time
import urllib3
from bs4 import BeautifulSoup
from django.http import Http404, HttpResponse

from mysite.django_app.webscraping.modules.scraping_race_cnt import ScrapingRaceCnt
from mysite.django_app.webscraping.modules.scraping_race_result import ScrapingRaceResult
from mysite.django_app.webscraping.modules.web_url_create import WebUrlCreate

class MainWebScraping:
    # メソッド名：execute:画面で入力された期間内で行われたレースデータを取得する
    # inputDateFrom,inputDateTo:YYYYMMDD形式
    # dlPath:C:\Users\Administrator\Documents\...
    #
    def execute(self,inputDateFrom,inputDateTo,dlPath):
        wuc = WebUrlCreate();
        src = ScrapingRaceCnt();
        srr = ScrapingRaceResult();

        dateFrom=datetime.datetime.strptime(inputDateFrom, '%Y%m%d')
        dateTo=datetime.datetime.strptime(inputDateTo, '%Y%m%d')

        # 入力された日付From ＜＝ 入力された日付To　でループする
        while dateFrom <= dateTo:
            # URLリストを作成
            childUrlList = wuc.retrieveUrlList(inputDateFrom);

            # リストが0のとき
            if(len(childUrlList)==0):
                print("なし")
            # リストが複数の時
            else:
                print("あり")
                for childUrl in childUrlList:
                    # HTMLソースを取得する
                    http = urllib3.PoolManager()
                    r = http.request('GET', childUrl)
                    soup = BeautifulSoup(r.data, 'html.parser')
                    time.sleep(2)

                    # ファイル名を生成する
                    childPrefixUrlLen = len('https://db.netkeiba.com/race/')
                    fileName = childUrl[childPrefixUrlLen:-1]
                    # ダウンロード先の「年」を生成する
                    dlYear = dateFrom.strftime("%Y");
                    # 子URLのHTMLソースからレース環境を取得
                    src.retrieveRaceCnt(soup,fileName,dlPath,dlYear)

                    #  子URLのHTMLソースからレース結果を取得
                    srr.retrieveRaceResult(soup,fileName,dlPath,dlYear)

            dateFrom += datetime.timedelta(days=1)


