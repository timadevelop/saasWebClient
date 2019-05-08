import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { SocketService } from './socket.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const CHAT_URL = environment.socketUrl + '/chat/' + 'roomos' + '/';

export interface Message {
  // author: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages: Subject<Message>;

  constructor(wsService: SocketService) {
    this.messages = <Subject<Message>>wsService.connect(CHAT_URL).pipe(
      map((response: MessageEvent): Message => {
        let data = JSON.parse(response.data);
        return {
          // author: data.author,
          message: data.message
        };
      })
    );
  }
}
