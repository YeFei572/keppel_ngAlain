import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SimpleGuard} from '@delon/auth';
import {environment} from '@env/environment';
// layout
import {LayoutDefaultComponent} from '../layout/default/default.component';
import {LayoutFullScreenComponent} from '../layout/fullscreen/fullscreen.component';
import {LayoutPassportComponent} from '../layout/passport/passport.component';
// dashboard pages
import {DashboardV1Component} from './dashboard/v1/v1.component';
import {DashboardAnalysisComponent} from './dashboard/analysis/analysis.component';
import {DashboardMonitorComponent} from './dashboard/monitor/monitor.component';
// import {DashboardWorkplaceComponent} from './dashboard/workplace/workplace.component';
import { MenuListComponent } from "./admin/menu/menu-list/menu-list.component";
// passport pages
import {UserLoginComponent} from './passport/login/login.component';
import {UserRegisterComponent} from './passport/register/register.component';
import {UserRegisterResultComponent} from './passport/register-result/register-result.component';
// single pages
import {CallbackComponent} from './callback/callback.component';
import {UserLockComponent} from './passport/lock/lock.component';
import {Exception403Component} from './exception/403.component';
import {Exception404Component} from './exception/404.component';
import {Exception500Component} from './exception/500.component';
import { MenuAddComponent } from "./admin/menu/menu-add/menu-add.component";
import { MenuThirdListComponent } from "./admin/menu/menu-third-list/menu-third-list.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [SimpleGuard],
    children: [
      {path: '', redirectTo: 'dashboard/v1', pathMatch: 'full'},
      {path: 'dashboard', redirectTo: 'dashboard/v1', pathMatch: 'full'},
      {path: 'dashboard/v1', component: DashboardV1Component},
      {path: 'dashboard/analysis', component: DashboardAnalysisComponent},
      {path: 'dashboard/monitor', component: DashboardMonitorComponent},
      // {path: 'dashboard/workplace', component: DashboardWorkplaceComponent},
      {path: 'menuList', component: MenuListComponent},
      {path: 'menuThird', component: MenuThirdListComponent},
      {path: 'menuAdd', component: MenuAddComponent},
      {
        path: 'widgets',
        loadChildren: './widgets/widgets.module#WidgetsModule',
      },
      {path: 'style', loadChildren: './style/style.module#StyleModule'},
      {path: 'delon', loadChildren: './delon/delon.module#DelonModule'},
      {path: 'extras', loadChildren: './extras/extras.module#ExtrasModule'},
      {path: 'pro', loadChildren: './pro/pro.module#ProModule'},
      {path: 'user', loadChildren: './user/user.module#UserModule'}
    ],
  },
  // 全屏布局
  {
    path: 'data-v',
    component: LayoutFullScreenComponent,
    children: [
      {path: '', loadChildren: './data-v/data-v.module#DataVModule'},
    ],
  },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      {
        path: 'login',
        component: UserLoginComponent,
        data: {title: '登录', titleI18n: 'app.login.login'},
      },
      {
        path: 'register',
        component: UserRegisterComponent,
        data: {title: '注册', titleI18n: 'app.register.register'},
      },
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
        data: {title: '注册结果', titleI18n: 'app.register.register'},
      },
      {
        path: 'lock',
        component: UserLockComponent,
        data: {title: '锁屏', titleI18n: 'app.lock'},
      },
    ],
  },
  // 单页不包裹Layout
  {path: 'callback/:type', component: CallbackComponent},
  {path: '403', component: Exception403Component},
  {path: '404', component: Exception404Component},
  {path: '500', component: Exception500Component},
  {path: '**', redirectTo: 'dashboard'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: environment.useHash})],
  exports: [RouterModule],
})
export class RouteRoutingModule {
}
