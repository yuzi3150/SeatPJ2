import { RaceListComponent } from './../race-list/race-list.component';

/** モデルクラス */
export class RaceData {
  //天気
  public weather: string;
  //芝
  public shiba: string;
  //ダート
  public da: string;
  /** レースリスト */
  public racelist: RaceData[];
  /** レース開催日 */
  public raceDate: string;
  /** レース番号（1R,2R,3R,...） */
  public raceNo: Number;
  /** レース名（３歳未勝利,阪神大賞典(G2),...） */
  public itemTitle: string;
  /** 出走時刻（15:00,15:35,...） */
  public itemTime: String;
  /** レースの距離（2000,3000,...） */
  public itemLong: String;
  /** 頭数（14頭,16頭,...） */
  public itemNumber: number;
  /** 開催地（2回中山8日目,1回阪神8日目,...） */
  public raceTitle: string;
  /** レースURL */
  public itemLink: string;
  /** 着順 */
  public rank: number;
  /** 枠番 */
  public frame: number;
  /** 馬番 */
  public horseNo: number;
  /** 馬名 */
  public horse: string;
  /** 性齢 */
  public age: string;
  /** 斤量 */
  public loafWeight: number;
  /**騎手 */
  public jockey: string;
  /** タイム*/
  public time: string;
  /** 着差*/
  public chakusa: string;
  /** ﾀｲﾑ指数*/
  public timesisu: string;
  /** 通過*/
  public pass: string;
  /** 上り*/
  public uphill: number;
  /** 単勝*/
  public win: number;
  /** 人気*/
  public popular: number;
  /** 馬体重*/
  public weight: string;
  /** 馬主*/
  public owner: string;
  /** 賞金*/
  public reward: string;
}
