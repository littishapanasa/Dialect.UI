import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UrltaskComponent } from './urltask/urltask.component';
import { WrapUpComponent } from './wrap-up/wrap-up.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';



const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: DashboardComponent
      },
      {
        path: "url",
        component: UrltaskComponent
      },
      {
        path: "wrapup",
        component: WrapUpComponent
      }
    ]

  },

];
@NgModule({
  declarations: [
    DashboardComponent,
    UrltaskComponent,
    WrapUpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    MatSnackBarModule

  ]
})
export class DashboardModule { }
