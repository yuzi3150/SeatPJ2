import { animate } from '@angular/animations';
import { SeatData } from './../model/seat-data';
import { ModuleWithProviders } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { KeibaService } from './../keiba.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnChanges {
  
  public seatMap = new Map<string, SeatData>();
  // 更新する座席リスト
  public update_seat_list: SeatData[]=[];

  constructor(private keibaService: KeibaService) {
    //全座席情報を生成する
    for (var i = 1; i <= 10; i++){
      for (var j = 1; j <= 60; j++){
        let tmpSeatId:string = "r" + i + "_d" + j;
        let tmpSeatData = new SeatData(tmpSeatId);
        this.seatMap.set(tmpSeatId,tmpSeatData)
      }
    }
  }

  /** 画面起動時処理 */
  ngOnInit(): void {
    // 全座席取得＆表示
    this.getAllSeat();
  }
  ngOnChanges(): void {}


  /** 名前入力フォームへの変更時イベント */
  public onblur_method(model: SeatData): void{
    // 変更された座席を更新対象リストに格納する
    this.update_seat_list.push(model)
  }

  /** 登録ボタン押下イベント */
  clickRegisterSeat(): void {
    // 座席に変更があった分だけ、更新処理を実行する(一度にそんなに更新することはないと思うので、Model1つずつ送信する)
    for (var i = 0; i < this.update_seat_list.length; i++){
      this.registerSeat(this.update_seat_list[i]);
    }
    // 完了メッセージ
    window.alert("登録が完了しました")
        
  }
  
  /** 全座席取得ボタン押下イベント */
  clickGetAllSeats(): void{
    this.getAllSeat();
  }

  /** 全座席を取得する */
  getAllSeat(): void {
    // サービス呼び出し(クエリパラメータをセットして実行)
    this.keibaService.getAllSeat().subscribe(
      (response) => {
        let res = response
        // 全座席情報が返却された状態
        let seats = <SeatData[]>res;
        for (var i = 0; i < seats.length; i++) {
          let seat: SeatData = seats[i]; 
          if (this.seatMap.has(seat.seat_id)) {
            this.seatMap.set(seat.seat_id, seat);
          }
        }
        for (var key of this.seatMap.keys()) {
          this.changeSeatColor(this.seatMap.get(key));
        }

      },
      (error) => {
        alert('NG')
        console.log(error);
      }
    )
  }
  /** シートコードによって、座席の色を変更する */
  public changeSeatColor(model:SeatData): void{
    if (model.seat_code == 0) {
      var obj = document.getElementById(model.seat_id);
      //要素にclass="seat_nashi"を追加する
      obj.classList.add("seat_nashi");
      obj.removeAttribute("type");
    }else if(model.seat_code == 1) {
      var obj = document.getElementById(model.seat_id);
      //要素にclass="seat_ari"を追加する
      obj.classList.add("seat_ari");
    }else if(model.seat_code == 2) {
      var obj = document.getElementById(model.seat_id);
      //要素にclass="ng_seat_ari"を追加する
      obj.classList.add("ng_seat_ari");
    }

  }


  /** 座席登録 */
  public registerSeat(model:SeatData) {
    let params = {
      user_name:model.user_name
    }
    // サービス呼び出し(クエリパラメータをセットして実行)
    this.keibaService.registerSeat(model.seat_id, params).subscribe(
      (response) => {
      },
      (error) => {
        alert('NG')
        console.log(error);
      }
    )
  }


}
