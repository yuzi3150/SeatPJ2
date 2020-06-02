/**
 * 席のデータクラスです。
 */
export class SeatData {
  public seat_id  : string; //席のID
  public user_name: string; // 使用者名
  public seat_code: number;
  constructor(seat_id: string){
    this.seat_id = seat_id;
  }
}

