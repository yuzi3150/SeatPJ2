import { UserUpdateComponent } from './../user-update/user-update.component';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { catchError, subscribeOn } from 'rxjs/operators';
import { User } from './../user';
import { Component, OnInit, OnChanges, OnDestroy, ViewContainerRef, Input } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit, OnChanges {
  // ユーザモデル
  model: User = new User();
  // 入力フォームの文字
  input_txt: String = null;
  // ユーザ配列
  users: User[] = [];
  // グリッドに表示する行データ
  rowData: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private viewContainerRef: ViewContainerRef,
    public dialog: MatDialog
  ) {
    this.gridOptions = <GridOptions>{
      onGridReady: () => {
        this.gridOptions.api.sizeColumnsToFit();
      },
      rowHeight: 48, // recommended row height for material design data grids,
      frameworkComponents: {
      }
    };

  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    window.alert("プロパティの変更を検知")

  }

  /** ボタンを押された時の挙動 */
  selectButton():void {
    // フォームへの入力有無で、呼び出し先を変更する
    if (this.input_txt == null) {
      // 未入力（全検索）
      this.searchAll();
    } else {
      // 入力あり(あいまい検索)
      this.select(this.input_txt);
      
    }

  }

  /** 全件検索 */
  searchAll() {
    //すべてのユーザを取得する
    this.userService.selectAllUsers()
      .subscribe(users => {
        this.users = users;
        // ag-gridの行に取得したレコードをセットする
        this.setRowData(this.users);
      });
  }

  select(input:String) {
    //入力した文字列で検索する
    this.userService.selectUser(this.model.name)
      .subscribe(users => {
        this.users = users;
        // ag-gridの行に取得したレコードをセットする
        this.setRowData(this.users);
      } 
    )
  }
  /** ユーザ登録 */
  register(): void {
    this.userService.create(this.model).subscribe(
      data => {
        this.searchAll();
      }
    )
  }

  /** ユーザ更新 */
  update(user: User): void {
    this.userService.update(user)
  }

  /** ユーザ削除 */
  deleteById(id: number): void {
    this.userService.delete(id)
  }

  /** ユーザ一覧表示のag-grid用 */
  columnDefs = [
    { headerName: 'ID', field: 'id', sortable: true, filter: true },
    { headerName: '氏名', field: 'name', sortable: true, filter: true, cellEditor: "inputRenderer", editable: true, },
    {
      headerName: '更新', field: 'upd_button'
      , cellRenderer: (params) => {
        const element = document.createElement('button');
        let user: User = params.value
        element.innerHTML = user.name;
        element.addEventListener('click', () => {
          if (window.confirm(user.name + 'を更新してよろしいですか')) {
            this.update(user);
          }
        });
        return element;
      }
    },
    {
      headerName: '削除', field: 'dlt_button'
      , cellRenderer: (params) => {
        const element = document.createElement('button');
        let user: User = params.value
        element.innerHTML = user.name;
        element.addEventListener('click', () => {
          if (window.confirm(user.name + 'を削除してよろしいですか')) {
            this.deleteById(user.id);
          }
        });
        return element;
      }
    },
  ];

  /**行にデータをセットする  */
  setRowData(users: User[]): void {
    let tmpRowData: any = [];

    for (let i = 0; i < users.length; i++) {
      let row: any = {
        id: users[i].id
        , name: users[i].name
        , upd_button: users[i]
        , dlt_button: users[i]
      };
      tmpRowData.push(row);
    }
    this.rowData = tmpRowData;
  }

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


  /**
  * モーダル画面を表示する。
  */
  openModal(): void {
    // モーダルウィンドウに表示する内容
    let param = { title: 'タイトル', contents: '<u>コンテンツ。HTMLタグ使用可能</u>', class: 'modal' };

    // openModal()を呼んで、Observableを受け取る。
    let observable = this.userService.openModal(this.viewContainerRef, param);

    // モーダルウィンドウの結果に対する処理は、subscribe内に記載する。
    observable.subscribe(
      {
        next: v => console.log(v),
        error: (err) => console.log(err),
        complete: () => console.log("done")
      });

  }

  animal: string;
  name: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}


