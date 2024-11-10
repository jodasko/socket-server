import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketStatus = false;

  constructor(private socket: Socket) {
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Connected from Server');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Server');
      this.socketStatus = false;
    });
  }

  emitSocket(event: string, payload?: any, callback?: Function) {
    console.log('Emitting Mensage');
    this.socket.emit(event, payload, callback);
  }

  listenSocket(event: string) {
    return this.socket.fromEvent(event);
  }
}
