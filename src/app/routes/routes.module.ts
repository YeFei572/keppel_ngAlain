import { NgModule } from "@angular/core";

import { SharedModule } from "@shared/shared.module";
import { RouteRoutingModule } from "./routes-routing.module";
// dashboard pages
import { DashboardV1Component } from "./dashboard/v1/v1.component";
import { DashboardAnalysisComponent } from "./dashboard/analysis/analysis.component";
import { DashboardMonitorComponent } from "./dashboard/monitor/monitor.component";
import { DashboardWorkplaceComponent } from "./dashboard/workplace/workplace.component";
// passport pages
import { UserLoginComponent } from "./passport/login/login.component";
import { UserRegisterComponent } from "./passport/register/register.component";
import { UserRegisterResultComponent } from "./passport/register-result/register-result.component";
// single pages
import { UserLockComponent } from "./passport/lock/lock.component";
import { CallbackComponent } from "./callback/callback.component";
import { Exception403Component } from "./exception/403.component";
import { Exception404Component } from "./exception/404.component";
import { Exception500Component } from "./exception/500.component";
import { MenuListComponent } from "./admin/menu/menu-list/menu-list.component";
import { MenuAddComponent } from './admin/menu/menu-add/menu-add.component';
import { EventService } from "@shared/service/EventService";
import { MenuThirdListComponent } from './admin/menu/menu-third-list/menu-third-list.component';

const COMPONENTS = [
  DashboardV1Component,
  DashboardAnalysisComponent,
  DashboardMonitorComponent,
  DashboardWorkplaceComponent,
  MenuListComponent,
  MenuAddComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  UserLockComponent,
  CallbackComponent,
  Exception403Component,
  Exception404Component,
  Exception500Component,
  MenuThirdListComponent,
  MenuAddComponent
];
const COMPONENTS_NOROUNT = [];
@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
  providers: [EventService],
  entryComponents: COMPONENTS_NOROUNT
})
export class RoutesModule {}

