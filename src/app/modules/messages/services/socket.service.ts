import { Injectable, OnDestroy } from "@angular/core";
import { Observable, Observer, Subject } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService implements OnDestroy {

  constructor(
    private authService: AuthService
  ) { }

  ngOnDestroy() {
    if (this.subject) this.subject.complete();
  }

  // TODO : Adopt to multiple subjects
  private subject: Subject<MessageEvent>;

  public connect(url): Subject<MessageEvent> {
    if (this.subject) {
      this.subject.complete();
    }

    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
    return this.subject;
  }

  private create(url): Subject<MessageEvent> {
    const token = this.authService.getTokenInfo();
    if (!token || !this.authService.isLoggedIn) {
      console.warn("Cannot create secured socket for anonymous user.");
      return;
    }

    const protocol = token.access_token;
    let ws = new WebSocket(url, protocol);

    const that = this;
    ws.onclose = (e) => {
      console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
      setTimeout(() => {
        that.create(url);
      }, 1000);
    }

    let observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });

    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      },
      complete: () => {
        ws.close();
        this.subject = null;
      }
    };
    return Subject.create(observer, observable);
  }
}
