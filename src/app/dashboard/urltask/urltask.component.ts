import { Component, Renderer2, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TopbarService } from 'src/app/Services/topbar.service';
import { event } from 'src/app/shared/model/config';
import { HttpConnectionService } from 'src/app/shared/services/HttpConnectionService';

@Component({
  selector: 'app-urltask',
  templateUrl: './urltask.component.html',
  styleUrls: ['./urltask.component.css']
})
export class UrltaskComponent implements OnInit {
  @ViewChild('inputField') inputField!: ElementRef<HTMLInputElement>;
  buttonColor = ''; // Initialize with an empty string
  inputcolor = '';
  event!: event;
  public subscription: Subscription[] = [];
  enableComplete:boolean=false;


  constructor(
    private _router: Router,
    private http: HttpConnectionService,
    private _topbar: TopbarService,
  ) { }

  ngOnInit(): void {
    this.event = JSON.parse(localStorage.getItem('event') ?? '');
  }

 

  goToLink(url: string) {
    window.open(url, "_blank");
    this._topbar.statusCall(3,this.event.eventId); //3
    this.buttonColor = '#4FAE47'; // Set the button color based on input value
    this.inputcolor = '#D9D9D9';
    this.enableComplete=true;
  }

  onComplete() {
    this.subscription.push(this._topbar.changeStatusTrigger.subscribe(res => {
      if(res === "Not Ready"){
        this._topbar.statusCall(8,this.event.eventId)
      }
    }))
    
    this._router.navigate(['/dashboard/wrapup']);//8

  }
  ngOnDestroy() {
    this.subscription.forEach((x) => x.unsubscribe());
  }


}
