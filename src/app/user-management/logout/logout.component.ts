import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopbarService } from 'src/app/Services/topbar.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {


  constructor(
    private _router: Router,
    private _topbar: TopbarService
  ){}

  ngOnInit(): void {
    this._topbar.setUpTopBar("",false,false);
  }

  onAccept(){
  this._topbar.statusChange('Not Ready')
  this._router.navigate(['/']);
  }

  close(){
    this._router.navigate(['/dashboard']);
  }
}
