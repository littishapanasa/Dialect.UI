import { Component, OnInit } from '@angular/core';
import { TopbarService } from 'src/app/Services/topbar.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit{

  constructor(private _topbar: TopbarService){}

  ngOnInit(): void {
    this._topbar.setUpTopBar('REPORTS',false,false);
  }

}
