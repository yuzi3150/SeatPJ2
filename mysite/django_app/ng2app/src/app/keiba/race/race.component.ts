import { RaceData } from './../model/race-data';
import { FormGroup, FormControl } from '@angular/forms';
import { KeibaService } from './../keiba.service';
import { Component, OnInit, OnChanges } from '@angular/core';
import { KeibasRoutingModule } from '../keiba-routing.module';
import { GridOptions } from 'ag-grid-community';
import { HorseData } from '../model/horse-data';

@Component({
  selector: 'app-race',
  templateUrl: './race.component.html',
  styleUrls: ['./race.component.css']
})
export class RaceComponent implements OnInit, OnChanges {

  public itemLink: string; //レースURL
  public form: FormGroup; // テンプレートで使用するフォームを宣言
  public raceTitle: string = '';// レースタイトル
  public weather: string = '';//天気
  public shiba: string = '';//芝
  public da: string = '';//ダート

  // agGridで表示する馬リスト
  public horselist: HorseData[] = [];

  constructor(private keibaService: KeibaService) {
    // フォームの生成
    this.form = new FormGroup({
    });
  }

  ngOnInit(): void {
    // 行データを初期化する
    this.rowData = null;
    let params = {
      inputItemLink: this.keibaService.itemLink
    }

    // サービス呼び出し(クエリパラメータをセットして実行)
    this.keibaService.retrieveRace(params).subscribe(
      (response) => {
        let res = response

        for (var key in res) {
          console.log(key + ': ' + res[key])
          var list = res[key];
          let tmpHorseData = <HorseData>list;
          this.horselist.push(tmpHorseData);

        }
        this.rowData = this.setRowData(this.horselist)
      },
      (error) => {
        console.log(error);
      })
  }

  ngOnChanges(): void {
    alert('前画面から送られたURLは' + this.keibaService.itemLink + 'です');
  }

  /** レース列名 */
  columnDefs = [
    { headerName: '着順', field: 'rank', sortable: false, filter: false },
    { headerName: '枠番', field: 'numWaku', sortable: false, filter: false },
    { headerName: '馬番', field: 'num', sortable: false, filter: false },
    { headerName: '馬名', field: 'horseName', sortable: false, filter: false },
    { headerName: '性齢', field: 'detailLeft', sortable: false, filter: false },
    { headerName: '斤量', field: 'jockeyWeight', sortable: false, filter: false },
    { headerName: '騎手', field: 'jockey', sortable: false, filter: false },
    { headerName: 'タイム', field: 'raceTime', sortable: false, filter: false },
    { headerName: '人気', field: 'oddsPeople', sortable: false, filter: false },
    { headerName: '単勝オッズ', field: 'oddsNinki', sortable: false, filter: false },
    { headerName: '後3F', field: 'time', sortable: false, filter: false },
    { headerName: 'コーナー通過順', field: 'passageRate', sortable: false, filter: false },
    { headerName: '厩舎', field: 'trainer', sortable: false, filter: false },
    { headerName: '馬体重', field: 'horseWeight', sortable: false, filter: false },
  ]
  // 表示するデータ
  rowData: any;

  // ag-gridのオプション
  gridOptions: GridOptions = {
    columnDefs: this.columnDefs,
    rowData: this.rowData,
    defaultColDef: {
      editable: true,
      sortable: true,
      filter: true
    },
  };
  /**行にデータをセットする  */
  setRowData(horselist: HorseData[]): any {
    let tmpRowData: any = [];

    for (let i = 0; i < horselist.length; i++) {
      let row: any = {
        rank: horselist[i].rank
        , numWaku: horselist[i].numWaku
        , num: horselist[i].num
        , detailLeft: horselist[i].detailLeft
        , horseName: horselist[i].horseName
        , jockeyWeight: horselist[i].jockeyWeight
        , jockey: horselist[i].jockey
        , raceTime: horselist[i].raceTime
        , oddsPeople: horselist[i].oddsPeople
        , oddsNinki: horselist[i].oddsNinki
        , time: horselist[i].time
        , passageRate: horselist[i].passageRate
        , trainer: horselist[i].trainer
        , horseWeight: horselist[i].horseWeight
      };
      tmpRowData.push(row);
    }
    return tmpRowData;
  }
}
