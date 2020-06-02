import { KeibaService } from './../keiba.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, Inject, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-jockey-scraping',
  templateUrl: './jockey-scraping.component.html',
  styleUrls: ['./jockey-scraping.component.css']
})
export class JockeyScrapingComponent implements OnInit {

  public form: FormGroup;  // テンプレートで使用するフォームを宣言
  // 検索ID(From)
  inputIdFrom = new FormControl('');
  // 検索ID（To）
  inputIdTo = new FormControl('');
  // ダウンロード先URL
  dlPath = new FormControl('');

  constructor(
    private keibaService: KeibaService
  ) {
    // フォームの生成
    this.form = new FormGroup({
      // フォーム内で使用する項目の生成
      dlPath: new FormControl(''),
      inputIdFrom: new FormControl(''),
      inputIdTo: new FormControl('')
    });
  }

  ngOnInit(): void {
  }
  /** 取得ボタン押下メソッド */
  getData(): void {
    // クエリパラメータのセット
    let params = {
      inputIdFrom: this.inputIdFrom.value
      , inputIdTo: this.inputIdTo.value
      , dlPath: this.dlPath.value
    }
    // サービス呼び出し(クエリパラメータをセットして実行)
    this.keibaService.getJockeyScraping(params)
  }
}
