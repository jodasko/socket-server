import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// Sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment.development';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, ChatComponent],
  imports: [BrowserModule, SocketIoModule.forRoot(config), FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
