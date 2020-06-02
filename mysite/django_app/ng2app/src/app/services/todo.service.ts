import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operatorgetNewTodo/map';
// import 'rxjs/add/operator/catch';

import { Todo } from '../models/models';
import { of, Observable, throwError } from 'rxjs';



@Injectable()
export class TodoService {
  todo: Todo[] = [];
  private Url = `http://127.0.0.1:8000/api/todo/`
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }

  /** 全てのtodoを取得する */
  getAllTodo() {
    return this.http
      .get<Todo[]>(this.Url)
  }

  /** todoを追加する */
  create(todo: Todo): Observable<any> {
    return this.http
      .post(this.Url, JSON.stringify(todo), { headers: this.headers })
      .pipe(
        //エラー発生時の処理を記載
      )
  }

  /** 最新のtodoを一件取得する */
  getTodo(): Observable<any>{
    return this.http
      .get<Todo>(this.Url + "?limit=1")
  }

  // 更新時の挙動
  update(todo: Todo) {
    const url = `${this.Url}${todo.id}/`;
    return this.http
      .put(url, JSON.stringify(todo), { headers: this.headers })
      .toPromise()
      .catch(this.handleError);
  }

  // 削除時の挙動
  delete(id: number): Promise<Boolean> {
    const url = `${this.Url}${id}/`;
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }


  //   // エラーハンドリング
  //   private handleError(error: any): Promise<any> {
  //     console.error('An error occurred', error);
  //     return Promise.reject(error.message || error);
  //   }
  // }

  /**
 * Observable のエラーを返却します
 * @param 無し
 * @return {Observable<any>}
 */
  private handleError(): any {
    return (error: any): Observable<any> => {
      const ret = {
        'status': error.status
        , 'data': error.statusText + '/' + error.url
      };
      return throwError(ret);
    };
  }
   private errorHandler(err) {
    console.log('Error occured.', err);
    return Promise.reject(err.message || err);
  }

}
