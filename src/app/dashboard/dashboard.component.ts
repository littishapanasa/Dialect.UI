import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, startWith, switchMap, timer } from 'rxjs';
import { TopbarService } from '../Services/topbar.service';
import { HttpConnectionService } from 'src/app/shared/services/HttpConnectionService';
import { Router } from '@angular/router';
import { WebsocketService } from '../Services/websocket.service';
import { PushNotificationService } from '../Services/push-notification.service';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  public subscription: Subscription[] = [];
  receiveValue: string = 'Not Ready';

  eventId!: number;
  eventType!: string;
  localUser!: number;
  userId!: number;
  userCurrentStatus!: string;
  timer:number=12000;
 
  public dataSet = [
    {
      "user_id": 4,
      "user_name": "user1@dialect.com"
    }
  ]

  private acceptTimeout: any;

  messages: any;
  showAcceptData:any;
  constructor(
    private _topbar: TopbarService,
    private http: HttpConnectionService,
    private _router: Router,
    private _cd: ChangeDetectorRef,
    private websocketService: WebsocketService,
    private _pushNotifyServe:PushNotificationService,
    private snackBar: MatSnackBar
  ) {

    // this.websocketService.getMessage().subscribe((message) => {
    //   this.messages.push(message);


    // });
    this.showAcceptData=this._topbar.showAccept;
   

  }
 
  ngOnInit(): void {

    this.localUser = JSON.parse(localStorage.getItem('userDetails') ?? '')?.id;
    this._topbar.setUpTopBar("", true, false);
    this.subscription.push(this._topbar.changeStatusTrigger.subscribe(res => {
      // this.showAccept = res === "Ready" ? true : false;
      this.statusChange(res);
    //  alert("oninit")
      console.log("onninit");
    //  alert("oninit accept"+this._topbar.showAccept)
    }));
    // this.subscription.push(this._topbar.nextUserTrigger.subscribe(res => {
    //   if (res?.user_id) {
    //     if (this.localUser === res?.user_id) {
    //       // this.setEvent(res?.event_id, res?.event_type)
    //       this.showAccept = true;
    //       this.userId = res?.user_id;
    //       this.eventId = res?.event_id;
    //       this.eventType = res?.event_type;

    //       this.websocketService.sendMessage(this.userId.toString())
    //     }
    //   }
    // }))
    this.initialize();
    // this.timeOut();
    //this._pushNotifyServe.requestPermission();
  }
  
  private reset$ = new Subject();

  initialize(): void {
    
    this.reset$
      .pipe(
        startWith(void 0),
        switchMap(() => timer(0, this.timer)),
      )
      .subscribe(() => this.refresh());
  }
  refresh() {


    this.http.get('/messages/read/').subscribe(resultAccept => {
      if (resultAccept) {
        if (this.userCurrentStatus == "Ready")
         try{
          var spltData = (resultAccept[0].trim()).split(";");

         }
         catch{

          this.http.get('/insertSubmissiomQueue/').subscribe(resultAccept => {
            if (resultAccept) {
  
              this.eventId = resultAccept?.submission_instance?.event_id;
              this.eventType = resultAccept?.submission_instance?.event_type;
              this.userId = resultAccept?.submission_instance?.user;
              var messageCncat = (this.eventId).toString() + ";" + this.eventType + ";" + this.userId;
              this.http.post('/messages/write/', { "message": messageCncat }).subscribe(res => {})
            }
            });
      
         }
         
          this._topbar.showAccept = this.localUser === parseInt(spltData[2])
          ? true : false;
          this.showAcceptData=this._topbar.showAccept;
          this._topbar.statusCall(0)
          this._cd.detectChanges();
          if (this._topbar.showAccept){
           
            this.setEvent(spltData[0],spltData[1]);
            this.timeOut();
            // this._pushNotifyServe.requestPermission();
            // this._pushNotifyServe.listen();
           // this.openSnackBar()
            }
        

      }
      //alert(this.localUser + "test 12" + this.showAccept);
    })


  }
  openSnackBar() {
    this.snackBar.open("You have a new task!!", 'Close', {
      duration: 700,
    });
  }
  refreshTimer(): void {
    this.reset$.next(void 0);
  }

 
  
  statusChange(res: string) {
    this.http.post('/user_status_update/', { "status": res == "Ready" ? 1 : 0, "user_id": this.localUser }).subscribe(result => {
      if (result && res === "Ready") {
        this.userCurrentStatus = "Ready";
        this.http.get('/insertSubmissiomQueue/').subscribe(resultAccept => {
          if (resultAccept) {

            this.eventId = resultAccept?.submission_instance?.event_id;
            this.eventType = resultAccept?.submission_instance?.event_type;
            this.userId = resultAccept?.submission_instance?.user;
           

            // this._topbar.showAccept = this.localUser === resultAccept?.submission_instance?.user
            //   ? true : false;
              this._cd.detectChanges();
            if (this._topbar.showAccept == false) {
             
              var messageCncat = (this.eventId).toString() + ";" + this.eventType + ";" + this.userId;
              this.http.post('/messages/write/', { "message": messageCncat }).subscribe(res => {
              });
            }


          }
        });
      } else {
        this.userCurrentStatus = "Not Ready";
        this._topbar.showAccept = false;
        this.showAcceptData=this._topbar.showAccept;
      }
    })
  }

  timeOut() {
    if (this._topbar.showAccept) {

      setInterval(() => {

        this.closeShowAccept();
        // this.subscription.push(this._topbar.nextUserTrigger.subscribe(res => {
        //   if (res?.user_id) {
        //     if (this.localUser === res?.user_id) {
        //       // this.setEvent(res?.event_id, res?.event_type)
        //       this.showAccept = true;
        //       this.userId = res?.user_id;
        //       this.eventId = res?.event_id;
        //       this.eventType = res?.event_type;
        //       //this.timeOut();

        //     }
        //   }
        // }))
      }, 240000);
      // alert("timeout accept"+this._topbar.showAccept)
    
      // alert("timeout");
      // console.log("timeout");
      //this._topbar.statusCall(2,this.eventId);
    }
  }

  // this.acceptTimeout = setTimeout(() => {

  // }, 120000);

  onAcceptClick() {
    this.closeShowAccept();
  }

  ngOnDestroy() {
    this.subscription.forEach((x) => x.unsubscribe());
    // Clear the timeout when the component is destroyed
    if (this.acceptTimeout) {
      clearTimeout(this.acceptTimeout);
    }
  }

  closeShowAccept() {
    this._topbar.showAccept = false;
    this.showAcceptData=this._topbar.showAccept;
    this._topbar.statusChange('Not Ready')
    this._cd.detectChanges();
  
    // this.http.post('/accept/', { "user_id": this.localUser, "is_accepted": 2, "event_id": this.eventId }).subscribe(res => {
    //   if (res) {
    //     this._topbar.changeUser(res?.submission_instance?.user_id, res?.submission_instance?.event_id, res?.submission_instance?.event_type)
    //   }
    // });
    this.accept(2);
    if (this.acceptTimeout) {
      clearTimeout(this.acceptTimeout); //2
    }

  }

  onAccept() {
    this._topbar.statusChange('Not Ready');
    console.log("accept");
    //alert("accept");
    if (this.localUser === this.userId) {
      this.setEvent(this.eventId, this.eventType)
    }

    this.accept(1);
    this._router.navigate(['/dashboard/url']);
  }

  setEvent(event_id: number, event_type: string) {
    localStorage.setItem('event', JSON.stringify({ 'eventId': event_id, 'eventType': event_type }));
  }

  accept(isAccepted: number) {
   
    this._topbar.showAccept=false;
    this.showAcceptData=this._topbar.showAccept;
    try{
      
    this.http.post('/accept/', { "user_id": this.localUser, "is_accepted": isAccepted, "event_id": this.eventId }).subscribe(res => {
     //alert("post"+JSON.stringify(res?.submission_instance))
      if (res?.submission_instance) {
      //  alert("response"+res?.submission_instance)
      
      if(res?.submission_instance?.event_id){
       // alert("if--"+res?.submission_instance?.event_id)
        var messageCncat = (res?.submission_instance?.event_id).toString() + ";" + res?.submission_instance?.event_type + ";" + res?.submission_instance?.user;
        this.http.post('/messages/write/', { "message": messageCncat }).subscribe(res => {
        });
      
      
      }
      else
      {
     
         this.http.post('/messages/write/', { "message": " " }).subscribe(res => {
         });
      }
        //this._topbar.changeUser(res?.submission_instance?.user_id, res?.submission_instance?.event_id, res?.submission_instance?.event_type)


      }
      else
      {
       
        this.http.post('/messages/write/', { "message": " " }).subscribe(res => {
        });
      }
     
    });
  }
  catch{
  //  alert("catch");
    this.http.post('/messages/write/', { "message": " " }).subscribe(res => {
    });
  }
    this.userCurrentStatus="Not Ready";
    //this.timer=1200000;
    //this.timer=300000;
    //this.initialize();

  }
}
