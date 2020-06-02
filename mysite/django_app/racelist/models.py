from django.db import models


class RaceList(models.Model):
    full_name = models.CharField(max_length=70)
    # 開催地（2回中山8日目,1回阪神8日目,...）
    raceTitle= models.CharField(max_length=70)
    # 芝の状態
    shiba= models.CharField(max_length=70)
    # ダートの状態
    da= models.CharField(max_length=70)
    # レース名（３歳未勝利,阪神大賞典(G2),...）
    itemTitle= models.CharField(max_length=70)
    # 出走時刻（15:00,15:35,...）
    itemTime= models.CharField(max_length=70)
    # レースの距離（2000,3000,...）
    itemLong= models.CharField(max_length=70)
    # 頭数（14頭,16頭,...）
    itemNumber= models.CharField(max_length=70)
    # レースURL
    itemLink= models.CharField(max_length=70)

    def __str__(self):
        return self.full_name
