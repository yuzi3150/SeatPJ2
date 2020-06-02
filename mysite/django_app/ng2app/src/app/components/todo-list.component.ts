import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { TodoService } from '../services/todo.service';
import { Todo } from '../models/models';

@Component({
  selector: 'todo-list',
  templateUrl: '../templates/todo-list.component.html',
  styleUrls: ['../static/todo-list.component.css']
})
export class TodoListComponent {
  /** プロパティ一覧 */
  // TODO一覧を格納する配列
  todos: Todo[] = [];

  // 新しく保存されたTODOを格納する配列
  newtodos: Todo[] = [];

  // ＠input：親コンポーネントから子コンポーネントに値を引き渡す
  @Input() todo: Todo = new Todo();

  // コンストラクタ
  constructor(
    private todoService: TodoService,
    private router: Router,
  ) {
  }

  /** プロパティの値が変更されたときに自動で実行されます*/
  ngOnChanges() {
  }

  /**
   * コンポーネントクラス生成時に呼び出されます。
   * 画面起動時に自動で実行されます
   */
  ngOnInit(): void {
    // すべてのtodoを取得する
    this.todoService.getAllTodo()
      .subscribe(todos => this.todos = todos);
  }

  /** Addボタンを押した時の挙動*/
  save(): void {
    this.todoService
      .create(this.todo)
      .subscribe(data => { this.getNewTodo() });
    this.todo = new Todo();

    // すべてのtodoを取得する
    this.todoService.getAllTodo()
      .subscribe(todos => this.todos = todos);
  }

  /** 最1新のtodoを呼び出すメソッド*/
  getNewTodo(): void {
    this.todoService
      .getTodo()
      .subscribe(res => {
        this.pushData(res)
      });
  }

  /** todo要素更新メソッド */
  update(id: number, title: string): void {
    let todo = {
      id: id,
      title: title
    }
    this.todoService.update(todo);
  }

  /** htmlに渡すnewtodosにデータをpushする*/
  pushData(data: Todo): void {
    this.newtodos.unshift(data);
  }

  /** 削除メソッド */
  delete(id) {
    return this.todoService
      .delete(id);
  }

}