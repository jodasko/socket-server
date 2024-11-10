import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private wsService: WebsocketService) {}

  sendMessage(message: string) {
    const payload = {
      from: 'Carlos',
      content: message,
    };

    this.wsService.emitSocket('message', payload);
  }

  getMessages() {
    return this.wsService.listenSocket('message-new');
  }
}
