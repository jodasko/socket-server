import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';
import { ChatService } from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  text = '';
  subscription!: Subscription;
  messageList: any[] = [];
  element!: HTMLElement | null;

  constructor(
    private wsService: WebsocketService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.element = document.getElementById('chat-message');
    this.subscription = this.chatService.getMessages().subscribe((msg: any) => {
      console.log('Chat: ', msg);
      this.messageList.push(msg);

      // scroll down to last message
      setTimeout(() => {
        if (this.element) {
          this.element.scrollTop = this.element.scrollHeight;
        }
      }, 50);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  send() {
    if (this.text.trim().length === 0) {
      return;
    }
    console.log(this.text);
    this.chatService.sendMessage(this.text);
    this.text = '';
  }
}
