import { catchError } from 'rxjs/operators';
import { RaceData } from './model/race-data';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { promise } from 'protractor';
import { RequestOptions } from 'https';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

/**
 * 競馬機能のサービス
 */
@Injectable({
  providedIn: 'root',
})
export class KeibaService {
  private Url = `http://127.0.0.1:8000/api/`;
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' ,'Authorization': 'my-auth-token'});

  public itemLink: string;

  constructor(
    private http: HttpClient
  ) {
  }

  /** WebScrapingするためにサーバサイドにGet送信する */
  getWebScraping(params): any {
    const url = this.Url + 'webscraping/execute/';
    return this.http.get(url,{params}).subscribe(
      (res) => {
        const response: any = res;
        return response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /** JockeyScrapingするためにサーバサイドにGet送信する */
  getJockeyScraping(params): any {
    const url = this.Url + 'jockeyscraping/execute/';
    return this.http.get(url,{params}).subscribe(
      (res) => {
        const response: any = res;
        return response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /** レース一覧を取得するためににサーバサイドにGet送信する */
  retrieveRaceList(params): Observable<any> {
    const url = this.Url + 'racelist/retrieve/';
    return this.http.get<any>(url,{params});
  }

  /** URLで指定したレースを取得するためににサーバサイドにGet送信する */
  retrieveRace(params): Observable<any> {
    const url = this.Url + 'race/retrieve/';
    return this.http.get<any>(url,{params});
  }

  /** 全座席を取得する */
  getAllSeat():  Observable<any> {
    const url = this.Url + 'seat/';
    return this.http.get<any>(url)  
  }
  
  /** 座席を登録する(1座席) */
  registerSeat(id, params): Observable<any> {
    httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
    let body = JSON.stringify(params);
    const url = this.Url + `seat/${id}/`;
    return this.http.patch<any>(url, body,httpOptions).pipe(
      catchError(null)
    );

  }
}
