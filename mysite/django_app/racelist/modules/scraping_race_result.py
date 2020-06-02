# 競馬データを取得するメインクラス。
# レースの結果（順位やオッズなど）を取得する。
# 取得した結果をCSV出力する。
# URL(http://db.netkeiba.com/race/XXXXXXXXXXXX/)を指定する。
import csv
import os
import traceback

from mysite.django_app.webscraping.modules.common import createFolder


class ScrapingRaceResult:

    def retrieveRaceResult(self,soup,fileName,dlPath,dlYear):
        try:
            # 指定したurlでデータが見つからないとき
            a = soup.findAll(id="contents")
            if len(soup.findAll("td", nowrap="nowrap")) == 0:
                print('なし')
             # 指定したurlでデータが掲載しているとき
            else:
                # ディレクトリを作成する
                createFolder(dlPath + '\\keiba_race_result\\' +  dlYear)

                # 　CSVファイル名を指定し、開きます
                csv_file_nm = dlPath + '\\keiba_race_result\\' +  dlYear + '\\' + fileName + '.csv'

                with open(csv_file_nm, 'w') as f:
                    writer = csv.writer(f, lineterminator='\n')
                    # レース結果のすべてを取得します
                    # 21項目を順番にリストへ格納します
                    race_result_list = [] #　レース結果の全てです
                    race_result_list_line = [] # レース結果の1行を格納するリストです
                    for t in soup.findAll("td", nowrap="nowrap"):
                        race_data_row = t.get_text()
                        race_data = race_data_row.replace("\n", "")
                        race_result_list_line.append(race_data)

                        # 21項目を取得したら、親の配列にリストを格納します
                        if len(race_result_list_line) == 21:
                            race_result_list_line.append(fileName)
                            race_result_list.append(race_result_list_line)
                            writer.writerow(race_result_list_line)
                            race_result_list_line =[]

                    # CSVファイルを出力します
                    f.close()
        except:
            traceback.print_exc()
