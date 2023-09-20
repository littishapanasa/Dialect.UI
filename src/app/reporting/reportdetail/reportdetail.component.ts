import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { TopbarService } from 'src/app/Services/topbar.service';
import { SvlResult } from 'src/app/shared/model/config';
import { HttpConnectionService } from 'src/app/shared/services/HttpConnectionService';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-reportdetail',
  templateUrl: './reportdetail.component.html',
  styleUrls: ['./reportdetail.component.css']
  , providers: [DatePipe]
})
export class ReportdetailComponent {
  mode: ProgressSpinnerMode = 'determinate';
  dateForm!:FormGroup;
  minToDate: string = '';
  maxFromDate: string = '';
  svlData:SvlResult={
    accepted_percent: 0,
    total_submissions_received: 0,
    expired_submissions: 0,
    inprogress_submissions: 0,
    completed_submissions: 0
  };

  constructor(private _topbar: TopbarService,
              private http:HttpConnectionService,
              private datePipe:DatePipe
              ){
                // this.svlData = {};
              }

  ngOnInit(): void {
    this._topbar.setUpTopBar('Report Title',false,false);
    this.initializeForm();
  }

  initializeForm(){
    this.dateForm=new FormGroup({
      To:new FormControl("",Validators.required),
      From:new FormControl("",Validators.required)
    })
    
  }

  updateMinDate() {
    const fromDateValue = this.dateForm.get('From')?.value;
    if (fromDateValue) {
      // Set the minimum date for "To" as the selected "From" date
      this.minToDate = fromDateValue;
    }
    this.getReportData();

  }

  updateMaxdate(){
    const toDateValue = this.dateForm.get('To')?.value;
    if (toDateValue) {
      this.maxFromDate = toDateValue;
    }
    this.getReportData();
  }
  
  getReportData(){
    if (this.dateForm.valid){

      // "start_date": "2023-09-01 00:00:00",
      var dateFrom=this.dateForm.get('From')?.value
      var dateTo=this.dateForm.get('To')?.value
      var formatted_from=this.datePipe.transform(dateFrom,'yyyy-MM-dd h:mm:ss')?.toString()
      var formatted_to=this.datePipe.transform(dateTo,'yyyy-MM-dd h:mm:ss')?.toString()
      // this.http.post('/submission/statistics/',{"start_date": this.dateForm.get('From')?.value,"end_date": this.dateForm.get('To')?.value}).subscribe(res=>{
        var data={"start_date": formatted_from,"end_date": formatted_to};
        this.http.post('/submission/statistics/',data).subscribe(res=>{
        if (res){
          this.svlData=res;  
        }
      }
      )
    }
    
  }

}