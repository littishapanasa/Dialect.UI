import { Result, submissionList } from './../../shared/model/config';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TopbarService } from 'src/app/Services/topbar.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { HttpConnectionService } from 'src/app/shared/services/HttpConnectionService';
import { format } from 'date-fns';

@Component({
  selector: 'app-genaralreport',
  templateUrl: './genaralreport.component.html',
  styleUrls: ['./genaralreport.component.css']
})
export class GenaralreportComponent implements OnInit {
  dataSource: MatTableDataSource<Result>;
  displayedColumns: string[] = [
    'sub id',
    'event type',
    'data_created_at',
    'wrapup_on',
    'completed_on',
    'start_on',
    'accept_time_frame',
    'user',
    'submission_status',


  ];
  public receiveValue: string = "All";
  dropdownOpen: boolean = false;
  minToDate: string = '';
  maxFromDate: string = '';
  dateForm!: FormGroup;

  pageSize = 10;
  currentPage = 0;
  totalSize = 0;
  submissionList: Result[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private _topbar: TopbarService,
    private http: HttpConnectionService
  ) {
    this.dataSource = new MatTableDataSource<Result>([]);
  }

  ngOnInit(): void {
    this._topbar.setUpTopBar('General Report', false,false);
    this.initializeForm();
    this.http.getSubmissionList().subscribe(res => {
      if (res) {
        this.submissionList = res; // Replace with your data
        this.dataSource.data = this.submissionList;
        this.totalSize = 10;

      }
    })
  }

  initializeForm() {
    this.dateForm = new FormGroup({
      To: new FormControl("", Validators.required),
      From: new FormControl("", Validators.required)
    })
  }

  updateMinDate() {
    const fromDateValue = this.dateForm.get('From')?.value;
    if (fromDateValue) {
      this.minToDate = fromDateValue;
    }
    if (this.dateForm.valid) {
      this.filterList()
    }
  }

  updateMaxdate() {
    const toDateValue = this.dateForm.get('To')?.value;
    if (toDateValue) {
      this.maxFromDate = toDateValue;
    }
    if (this.dateForm.valid) {
      this.filterList()
    }
  }

  selectOption(option: string) {
    this.receiveValue = option;
    this.filterList();
    this._topbar.statusChange(this.receiveValue);
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }



  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  handlePage(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  filterList() {
    if (this.receiveValue !== "All" && this.dateForm.valid) {
      const dateFiltered = this.dateFilter();
      this.statusFilter(dateFiltered)
    }else if(this.dateForm.valid && this.receiveValue =="All"){
      this.dataSource.data = this.dateFilter()
    }else if(!this.dateForm.valid && this.receiveValue){
      this.statusFilter(this.submissionList);
    }
    this.paginator.firstPage();
  }


  statusFilter(data:any){
    if(this.receiveValue=="Accepted"){
      this.dataSource.data = data.filter((res: { accept_time_frame: any; })=>res?.accept_time_frame);
    }else if(this.receiveValue=="Completed"){
      this.dataSource.data = data.filter((res: { completed_on: any; })=>res?.completed_on);
    }else if(this.receiveValue=="Missed"){
      this.dataSource.data = data.filter((res: { is_accepted: number; })=>res?.is_accepted ==2);
    }else if(this.receiveValue=="In Progress"){
      this.dataSource.data = data.filter((res: { start_on: any; })=>res?.start_on);
    }else{
      this.dataSource.data = this.submissionList;
    }
  }

  dateFilter(){
    const dateFiltered = this.submissionList.filter((res) => {
      if ((format(new Date(res?.data_created_at), 'dd/MM/yyyy') >= format(new Date(this.minToDate), 'dd/MM/yyyy') && format(new Date(res?.data_created_at), 'dd/MM/yyyy') <= format(new Date(this.maxFromDate), 'dd/MM/yyyy'))) {
        return res
      }
      return false
    }
    )
    return dateFiltered
  }
}