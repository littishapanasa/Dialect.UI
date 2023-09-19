import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopbarService } from 'src/app/Services/topbar.service';
import { HttpConnectionService } from 'src/app/shared/services/HttpConnectionService';
import { event } from 'src/app/shared/model/config';
@Component({
  selector: 'app-wrap-up',
  templateUrl: './wrap-up.component.html',
  styleUrls: ['./wrap-up.component.css']
})
export class WrapUpComponent implements OnInit {

  public showwrap:boolean=false;
  public receiveValue:string='Wrap Up';
  public arr = ['wrap up'];
  public showNotReadyDiv: boolean = true;
  arrow:boolean=false;
  private acceptTimeout: any;
  event!: event;



  constructor(
    private _topbar: TopbarService,
    private http: HttpConnectionService,
    private _router:Router
  ){}

  ngOnInit() {
    this._topbar.setUpTopBar('',true,true);
   
    
   this.ClosePopUp();
   console.log("wrapup");
    this.event = JSON.parse(localStorage.getItem('event') ?? '');
  }

  selectOption(option:string){
    this.receiveValue = option;
  }

  ClosePopUp(){
    this.acceptTimeout=setTimeout(() => {
      this.showNotReadyDiv = false;
      this._topbar.statusChange('Ready')
      this._router.navigate(['/dashboard']);
    }, 90000);
  }

  onNext() {
    this._topbar.statusChange('Ready')
    this._topbar.statusCall(4,this.event.eventId)
    this._router.navigate(['/dashboard']);
    //api call
    //4
  
  }

  ngOnDestroy(){
    clearTimeout(this.acceptTimeout);
  }
}
