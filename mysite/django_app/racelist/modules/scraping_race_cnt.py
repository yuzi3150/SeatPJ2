# 競馬データを取得するメインクラス
# INPUT：各種レースのURL(http://db.netkeiba.com/race/XXXXXXXXXXXX/)
# レース環境（天候や距離など）に関するデータを取得する
# 取得した結果をCSV出力する。
import csv
import traceback

from mysite.django_app.webscraping.modules.common import createFolder


class ScrapingRaceCnt:

        def retrieveRaceCnt(self,soup,fileName,dlPath,dlYear):
            # 取得するHTMLのURLと出力先のフォルダパスを生成する

            try:
                # 指定したurlでデータが見つからないとき
                a = soup.findAll(id="contents")

                if len(soup.findAll("td", nowrap="nowrap")) == 0: #指定されたURLにデータがないとき
                    print('なし')
                else: # 指定したurlでデータが掲載しているとき
                    # レース番号を取得
                    race_no = soup.find(class_="racedata fc").find("dt").text
                    race_no = race_no.replace('0\n0', '')
                    race_no = race_no.replace('\n', '')
                    # レース名を取得
                    race_nm = soup.find(class_="racedata fc").find("h1").text
                    # レースの距離、天候、馬場の状態、発走時刻を取得
                    race_env_mix = soup.find(class_="racedata fc").find("span").text
                    race_env_mix = race_env_mix.replace('\n', '')
                    race_env_mix = race_env_mix.replace('\xa0', '')
                    race_env_mix = race_env_mix.replace(' ', '')
                    race_env_mix = race_env_mix.replace('m', '')
                    race_env_mix = race_env_mix.replace('天候:', '')
                    race_env_mix = race_env_mix.replace('発走:', '')
                    # 距離、天候、馬場の素材、状態、発走時刻を分解
                    race_env = race_env_mix.split('/')
                    race_dst = race_env[0]
                    race_weather = race_env[1]
                    race_material_cdt = race_env[2]
                    race_material = race_material_cdt.split(':')[0]
                    race_cdt = race_material_cdt.split(':')[1]
                    race_start_time = race_env[3]

                    # リストに情報を格納する
                    csvlist = []
                    csvlist.append(fileName)
                    csvlist.append(race_no)
                    csvlist.append(race_nm)
                    csvlist.append(race_cdt)
                    csvlist.append(race_material)
                    csvlist.append(race_dst)
                    csvlist.append(race_weather)
                    csvlist.append(race_start_time)

                    # ディレクトリを作成する
                    createFolder(dlPath + '\\keiba_race_cnt\\' + dlYear)

                    # CSVファイルを出力する
                    csv_file_nm = dlPath +'\\keiba_race_cnt\\' + dlYear + '\\'+ fileName + '.csv'

                    with open(csv_file_nm, 'w') as f:
                        writer = csv.writer(f, lineterminator='\n')
                        writer.writerow(csvlist)
                        f.close()

            except:
                traceback.print_exc()


