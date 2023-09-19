import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports/reports.component';
import { RouterModule, Routes } from '@angular/router';
import { ReportdetailComponent } from './reportdetail/reportdetail.component';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenaralreportComponent } from './genaralreport/genaralreport.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
 
const routes: Routes = [
  {
    path: "",
    component: ReportsComponent
  },
  {
    path: "reportdetails",
    component: ReportdetailComponent
  },
  {
    path: "general",
    component: GenaralreportComponent
  }

];



@NgModule({
  declarations: [
    ReportsComponent,
    ReportdetailComponent,
    GenaralreportComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule
  ]
})

export class ReportingModule { }

 