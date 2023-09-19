import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { LogoutComponent } from './user-management/logout/logout.component';

const routes: Routes = [


  {
    path: '',
    loadChildren: () =>
      import('./user-management/user-management.module').then((m) => m.UserManagementModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        data: { title: 'Dashboard' }
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reporting/reporting.module').then((m) => m.ReportingModule),
        data: { title: 'Reports' }
      },
      {
        path:'logout',
        component:LogoutComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
