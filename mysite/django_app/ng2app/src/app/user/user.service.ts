import { UserUpdateComponent } from './user-update/user-update.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];
  private Url = `http://127.0.0.1:8000/api/user/`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  // データの変更を通知するためのオブジェクト
  private closeEventSubject = new Subject<string>();

  // Subscribe するためのプロパティ( これでイベント通知をキャッチする )
  public closeEventObservable$ = this.closeEventSubject.asObservable(); constructor(
    private http: HttpClient,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
   }

  /** 全てのユーザを取得する */
  selectAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(
      this.Url
    )
  }
  
  /** 指定したキーワードでユーザを取得する */
  selectUser(input: String): Observable<User[]> {
    const url = `${this.Url}${input}/`;
    return this.http.get<User[]>(
      url
    )
  }

  /** ユーザを追加する */
  create(user: User): Observable<any> {
    return this.http.post(
      this.Url, JSON.stringify(user), { headers: this.headers }
    ).pipe(
    )
  }

  /** ユーザを更新する */
  update(user: User) {
    const url = `${this.Url}${user.id}/`;
    return this.http.put(
      url, JSON.stringify(user), { headers: this.headers }
    ).toPromise()
  }

  /** ユーザを削除する */
  delete(id: number): Promise<Boolean> {
    const url = `${this.Url}${id}/`;
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch();
  }

  /**
  * モーダルウィンドウの作成元。
  * モーダルウィンドウを二度目以降にに呼び出したときに、
  * 先に作成したモーダルウィンドウをクリアするために変数で保存しておく。 */
  viewContainerRef: ViewContainerRef;

  /**
  * RxJSのサブジェクト。
  * モーダルウィンドウの呼び出し元にObservablewo返し、
  * モーダルウィンドウが閉じられたときは、それを通知(publish)する。
  */
  subject: Subject<any>;

  /**
  * モーダルウィンドウを開くメソッド。
  * モーダルウィンドウを表示するコンポーネントから呼び出す。
  * @param viewContainerRef 呼び出し元で生成し、渡す必要がある。
  * @param param 生成するモーダルウィンドウに表示するデータ
  */
  public openModal(viewContainerRef: ViewContainerRef, param: any) {

    // モーダルウィンドウを二度目以降にに呼び出したときに、
    // 先に作成したモーダルウィンドウを破棄する。
    // しないと、モーダルウィンドウのDIV要素が永遠と増えていく。
    if (this.viewContainerRef) this.viewContainerRef.clear();

    // 呼び出し元にObservableを返す。
    return this.subject.asObservable();
  }
}
