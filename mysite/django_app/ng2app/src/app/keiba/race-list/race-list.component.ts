import { map } from 'rxjs/operators';
import { RaceData } from './../model/race-data';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { KeibaService } from '../keiba.service';
import { FormGroup, FormControl, RadioControlValueAccessor } from '@angular/forms';
import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { race, of } from 'rxjs';

@Component({
  selector: 'app-race-list',
  templateUrl: './race-list.component.html',
  styleUrls: ['./race-list.component.css'],
})
export class RaceListComponent implements OnInit {
  public form: FormGroup;  // テンプレートで使用するフォームを宣言
  // レース日付
  inputRaceDate = new FormControl(new Date());

  /** レースプロパティ */
  public raceTitle1: string = ''; //レースタイトル1
  public shiba1: string = ''; //芝1
  public da1: string = ''; //ダート1
  public raceTitle2: string = ''; //レースタイトル2
  public shiba2: string = ''; //芝2
  public da2: string = ''; //ダート2
  public raceTitle3: string = ''; //レースタイトル3
  public shiba3: string = ''; //芝3
  public da3: string = ''; //ダート3

  //次コンポーネント（レースの検索先）に渡すURL
  public itemLink;

  // agGridで表示するレースリスト
  public racelist: RaceData[] = [];



  constructor(
    private keibaService: KeibaService,
    private router: Router,
    @Inject(LOCALE_ID) private locale: string) {
    // フォームの生成
    this.form = new FormGroup({
      // フォーム内で使用する項目の生成
      inputRaceDate: new FormControl(new Date()),
    });
  }

  ngOnInit(): void {

  }

  /** レースを取得する */
  getRaceList(): void {
    // 行データを初期化する
    this.rowData = null;
    this.rowData2 = null;
    this.rowData3 = null;
    let params = {
      inputRaceDate: formatDate(this.inputRaceDate.value, 'yyyyMMdd', this.locale)
    }
    // サービス呼び出し(クエリパラメータをセットして実行)
    this.keibaService.retrieveRaceList(params).subscribe(
      (response) => {
        let res = response

        for (var key in res) {
          console.log(key + ': ' + res[key])
          var list = res[key];
          let tmpRaceData = <RaceData>list;
          tmpRaceData.itemLink = tmpRaceData.itemLink.replace('..', 'https://race.netkeiba.com/');
          this.racelist.push(tmpRaceData);
        }
        // レースマップを作成する
        let raceMap = new Map<string, RaceData[]>();
        raceMap = this.separateRaceListBySite(this.racelist);
        // レースを設定する
        let racetitles = raceMap.keys();
        let raceNum = 0;
        for (var racetitle of racetitles) {
          raceNum += 1
          if (raceNum == 1) {// レース1を設定
            this.da1 = raceMap.get(racetitle)[0].da
            this.shiba1 = raceMap.get(racetitle)[0].shiba
            this.rowData = this.setRowData(raceMap.get(racetitle))
          } else if (raceNum == 2) {// レース2を設定
            this.da2 = raceMap.get(racetitle)[0].da
            this.shiba2 = raceMap.get(racetitle)[0].shiba
            this.rowData2 = this.setRowData(raceMap.get(racetitle))
          } else if (raceNum == 3) {// レース3を設定
            this.da3 = raceMap.get(racetitle)[0].da
            this.shiba3 = raceMap.get(racetitle)[0].shiba
            this.rowData3 = this.setRowData(raceMap.get(racetitle))
          }
        }

      },
      (error) => {
        console.log(error);
      }
    );
  }

  /** レース開催地ごとにリストを分割する */
  separateRaceListBySite(allRaceList: RaceData[]): Map<string, RaceData[]> {
    // 開催地がいくつあるかチェックする
    const raceMap = new Map<string, RaceData[]>()
    for (var racedata of allRaceList) {
      // レースタイトルがすでにある場合、レースデータをプッシュする
      if (raceMap.has(racedata.raceTitle)) {
        raceMap.get(racedata.raceTitle).push(racedata);
      }
      // レースタイトルがない場合、新しくMap要素を作り、レースリストを作成する
      if (!raceMap.has(racedata.raceTitle)) {
        let tmpRacelist: RaceData[] = [];
        raceMap.set(racedata.raceTitle, tmpRacelist)
      }
    }
    return raceMap;
  }

  /** レース列名 */
  columnDefs = [
    {
      headerName: 'Button', field: 'button', cellRenderer: (params) => {
        const element = document.createElement('button');
        element.innerHTML = 'ボタン';
        element.insertAdjacentHTML('beforeend', '<a id="race" routerLink="race" routerLinkActive="active">')
        element.addEventListener('click', () => {
          if (window.confirm('画面を開きますか')) {
            this.keibaService.itemLink = params.value;
            document.getElementById('race').click();
          }
        });
        return element;
      },
    },
    { headerName: 'レース名', field: 'itemTitle', sortable: false, filter: false },
    { headerName: '出走時刻', field: 'time', sortable: false, filter: false },
    { headerName: '距離', field: 'itemLong', sortable: false, filter: false },
    { headerName: '頭数', field: 'itemNumber', sortable: false, filter: false },
  ]

  // 表示するデータ
  rowData: any;
  rowData2: any;
  rowData3: any;

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
  gridOptions2: GridOptions = {
    columnDefs: this.columnDefs,
    rowData: this.rowData2,
    defaultColDef: {
      editable: true,
      sortable: true,
      filter: true
    },
  };
  gridOptions3: GridOptions = {
    columnDefs: this.columnDefs,
    rowData: this.rowData3,
    defaultColDef: {
      editable: true,
      sortable: true,
      filter: true
    },
  };

  /**行にデータをセットする  */
  setRowData(races: RaceData[]): any {
    let tmpRowData: any = [];

    for (let i = 0; i < races.length; i++) {
      let row: any = {
        button: races[i].itemLink
        , itemTitle: races[i].itemTitle
        , itemTime: races[i].itemTime
        , itemLong: races[i].itemLong
        , itemNumber: races[i].itemNumber
      };
      tmpRowData.push(row);
    }
    return tmpRowData;
  }

  /** Todo:aggridの動作確認用で配列を自作してるだけなので、消すこと！ */
  public testRaces: RaceData[] = [];

}
