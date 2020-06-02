import { UserSearchComponent } from './../user-search/user-search.component';
import { UserService } from './../user.service';
import { User } from './../user';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],animations: [
    trigger('openClose', [
          state('open', style({
             opacity: 1,
          })),
          state('closed', style({
             display: 'none',
             opacity: 0,
          })),
          transition('open => closed', [
             animate('0.2s')
          ]),
          transition('closed => open', [
             animate('0.2s')
          ]),
          transition('* => void', [
             animate('0.2s')
          ]),
          transition('void => *', [
             animate('0.2s')
          ]),
    ])
 ]
})
export class UserUpdateComponent {

  /**
   * 初期処理
   *
   * @memberof ModalComponent
   */
  constructor(
   public dialogRef: MatDialogRef<UserSearchComponent>,
   @Inject(MAT_DIALOG_DATA) public data: User) {}

 onNoClick(): void {
   this.dialogRef.close();
 }
}

