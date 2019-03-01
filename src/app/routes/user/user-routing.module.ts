import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminUserListComponent } from './admin-user/admin-user-list/admin-user-list.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      { path: 'admin-list', component: AdminUserListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
