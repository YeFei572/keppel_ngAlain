import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { AdminUserListComponent } from './admin-user/admin-user-list/admin-user-list.component';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
    AdminUserListComponent
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class UserModule { }
