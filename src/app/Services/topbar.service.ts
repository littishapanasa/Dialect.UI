import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, startWith, switchMap, timer } from 'rxjs';
import { TopBarInfo, nextUser } from '../shared/model/config';
import { HttpConnectionService } from '../shared/services/HttpConnectionService';


@Injectable({
  providedIn: 'root'
})


export class TopbarService implements OnInit {
  showAccept: boolean = false;
  public changeStatusTrigger = new BehaviorSubject<string>('');
  public setUpTrigger =  new BehaviorSubject<TopBarInfo>({ title: '', status: true ,disable:false});
  public nextUserTrigger =  new BehaviorSubject<nextUser>({user_id:0, event_id:0, event_type:''});
  // userCurrentStatus: string;
  // showAccept: boolean;
  // localUser: number;
  _pushNotifyServe: any;
  _cd: any;
  constructor(
    private http: HttpConnectionService
  ) { }

  ngOnInit(): void {

  }
  statusChange(status:string){
    this.changeStatusTrigger.next(status)
  }

  setUpTopBar(title:string, status:boolean,disable:boolean){
    this.setUpTrigger.next({title:title,status:status,disable:disable})
  }

  statusCall(status:number,eventId?:any){
    if(status){
      console.log("top",eventId);
      var id= parseInt(eventId);
      let localUser = JSON.parse(localStorage.getItem('userDetails') ?? '')?.id;
      
      this.http.post('/user_status_update/',{"status":status,"event_id": id,"user_id": localUser}).subscribe();
     
    }
  }

  changeUser(user_id:number, event_id: number, event_type: string){
    this.nextUserTrigger.next({user_id:user_id, event_id:event_id, event_type:event_type});
  }

  private reset$ = new Subject();

  // initialize(userStatus:any): void {
  //   this.userCurrentStatus=userStatus;
  //   this.reset$
  //     .pipe(
  //       startWith(void 0),
  //       switchMap(() => timer(0, 120000)),
  //     )
  //     .subscribe(() => this.refresh());
  // }
  // refresh() {


  //   this.http.get('/messages/read/').subscribe(resultAccept => {
  //     if (resultAccept) {
  //       if (this.userCurrentStatus == "Ready")

  //         var spltData = (resultAccept[0].trim()).split(";");
  //         //alert(this.localUser+"sdfhk-"+spltData[2])
  //         this.showAccept = this.localUser === parseInt(spltData[2])
  //         ? true : false;
  //         //alert(this.localUser+"sdfhk-"+this.showAccept)
  //         if (this.showAccept){
  //           this.timeOut();
  //           this._pushNotifyServe.requestPermission();
  //           this._pushNotifyServe.listen();
  //          // this.openSnackBar()
  //           }
  //       this._cd.detectChanges();

  //     }
  //     //alert(this.localUser + "test 12" + this.showAccept);
  //   })


  //}
  timeOut() {
    throw new Error('Method not implemented.');
  }
}
