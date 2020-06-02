# １．各レースに遷移するページのHTMLを取得する
# ２．取得したHTMLに各種レースに遷移するhrefがあるかチェックする。
# ３．取得した各レースのURLをリストにして返す。
# 例'https://db.netkeiba.com/race/list/20190202/' 　に存在するHTMLからhrefをリストに格納する
# リストに格納する形式はhttps://db.netkeiba.com/race/201905010301

import requests
import urllib3
from bs4 import BeautifulSoup

class WebUrlCreate:

    def retrieveUrlList(self,inputDate):
        # 取得するHTML先のURLを生成する
        parentUrlPrefix = 'https://db.netkeiba.com/race/list/'  # 親URL先頭文字列
        childUrlPrefix = 'https://db.netkeiba.com'  # 各種レース（子）のURL先頭文字列

        parentUrl = parentUrlPrefix + inputDate + '/' #入力値から生成した親URL
        # URLを指定し、HTML情報を取得します
        r = requests.get(parentUrl)
        http = urllib3.PoolManager()
        r = http.request('GET', parentUrl)
        soup = BeautifulSoup(r.data, 'html.parser')

        childUrlList = [] #各種レースのURLリスト


        for link in soup.findAll("a"):
            if "/race/20" in link.get("href"): #親URL内に各種レースへの遷移がある場合
                childUrl = childUrlPrefix + link.get('href')
                childUrlList.append(childUrl)

        return childUrlList

