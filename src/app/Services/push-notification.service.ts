import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  //message:any = null;
  currentMessage = new BehaviorSubject<{ title: string, body: string }>({ title: '', body: '' });

  test : any = null;
  constructor(
    private http:HttpClient
    ) { }

 
    requestPermission() {
      const messaging = getMessaging();
  
      getToken(messaging,
       { vapidKey: environment.firebase.vapidKey}).then(
         (currentToken) => {
           if (currentToken) {
             const data = {
              to: currentToken,
              priority: "high",
              notification: {
                title: "Dialect",
                body: "You have a new task!!",
                text: "Text"
              }
            };
            const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'key=AAAAk73ni6k:APA91bHt3nnkSXquqkO5MGN_cmz8ckOf5FLWbQ0R964UvwmUE63swc93sHXg-0MBaG9qDWT1CbJcco5T0LQ-pgtBesiMdSt3lpWxDzPyTa8Iw8dyAMuq24froy_LOy_za2byczQ_BBrO' // Replace with your actual FCM server key
            });
          
            this.http.post('https://fcm.googleapis.com/fcm/send', data,{ headers: headers }).subscribe(
              (response) => {
                console.log('Notification sent successfully:', response);
              },
              (error) => {
                console.error('Error sending notification:', error);
              }
            );
          
           } else {
             console.log('No registration token available. Request permission to generate one.');
           }     }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
      });
    }
    listen() {
      const messaging = getMessaging();
      onMessage(messaging, (payload) => {
        this.currentMessage.next({title:'Dialect',body:'You have a new task!!'})
      });
   
  }
}