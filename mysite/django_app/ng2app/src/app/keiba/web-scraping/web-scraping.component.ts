import { KeibaService } from './../keiba.service';
import { RaceData } from './../model/race-data';
import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-web-scraping',
  templateUrl: './web-scraping.component.html',
  styleUrls: ['./web-scraping.component.css'],
})
export class WebScrapingComponent implements OnInit {
  public form: FormGroup;  // テンプレートで使用するフォームを宣言
  // 日付（From）
  inputDateFrom = new FormControl(new Date());
  // 日付（To）
  inputDateTo = new FormControl(new Date());
  // ダウンロード先URL
  dlPath = new FormControl('');

  constructor(
    private keibaService: KeibaService
    , @Inject(LOCALE_ID) private locale: string) {
    // フォームの生成
    this.form = new FormGroup({
      // フォーム内で使用する項目の生成
      dlPath: new FormControl(''),
      inputDateTo: new FormControl(new Date()),
      inputDateFrom: new FormControl(new Date())
    });
  }

  ngOnInit(): void {
  }

  /** 取得ボタン押下メソッド */
  getData(): void {
    // クエリパラメータのセット
    let params = {
      inputDateFrom: formatDate(this.inputDateFrom.value, 'yyyyMMdd', this.locale)
      , inputDateTo: formatDate(this.inputDateTo.value, 'yyyyMMdd', this.locale)
      , dlPath: this.dlPath.value
    }
    // サービス呼び出し(クエリパラメータをセットして実行)
    this.keibaService.getWebScraping(params)
  }

}
