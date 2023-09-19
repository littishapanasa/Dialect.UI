// src/app/websocket.service.ts

import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
//   private socket: any;
//   private readonly serverUrl = 'ws://localhost:8765'; // Your server URL

//   constructor() {
//     this.socket = io(this.serverUrl);
//   }

//   sendMessage(message: string): void {
//     console.log("message::"+message)
//     this.socket.emit('message', message);
//   }

//   getMessage(): Observable<string> {
//     return new Observable<string>((observer) => {
//       this.socket.on('message', (data: string) => {
//         console.log('Message received:', data); // Add this line
//         observer.next(data);
//       });
//     });
//   }
}
