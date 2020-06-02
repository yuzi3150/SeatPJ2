import { MenuComponent } from './menu/menu.component';
import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodoListComponent } from './components/todo-list.component';
import { UserSearchComponent } from './user/user-search/user-search.component';

const routes: Routes = [
  { path: 'menu', component: MenuComponent },
  { path: 'todo', component: TodoListComponent },
  { path: 'user', component: UserComponent },
  { path: 'user/search', component: UserSearchComponent },
  { path: 'keiba', loadChildren: './keiba/keiba.module#KeibaModule' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }