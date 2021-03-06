import { Injectable, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigService, ApiClientConfig } from 'src/app/core/services/config.service';
import { switchMap } from 'rxjs/operators';
import { TokenInfo } from '../models';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthenticationService {
  public auth2: any;
  public tokenInfo$: BehaviorSubject<TokenInfo> = new BehaviorSubject<TokenInfo>(null);
  public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoaded$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _loading = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private configService: ConfigService,
    private zone: NgZone,
    private router: Router,
    private nzMsg: NzMessageService,
    private http: HttpClient) { }

  /**
   * get loading
   */
  public get loading() {
    return this._loading;
  }

  convertToken(token: string): Observable<TokenInfo> {
    if (!token) {
      return of(null);
    }
    let req = {
      grant_type: 'convert_token',
      backend: 'google-oauth2',
      token: token,
      client_id: null,
      client_secret: null
    };
    return this.configService.currentConfig().pipe(
      switchMap((c: ApiClientConfig) => {
        req.client_id = c.API_CLIENT_ID;
        req.client_secret = c.API_CLIENT_SECRET;
        return this.http.post<TokenInfo>(`${environment.apiUrl}/auth/convert-token/`, req);
      }));
  }

  async signIn() {
    this._loading = true;
    try {
      if (!this.auth2.currentUser || !this.auth2.currentUser.get().isSignedIn()) {
        await this.auth2.signIn();
      }
      const token = this.auth2.currentUser.get().getAuthResponse(true).access_token;
      const tokenInfo: TokenInfo = await this.convertToken(token).toPromise();
      this.zone.run(() => {
        this.tokenInfo$.next(tokenInfo);
        this.isLoggedIn$.next(true);
        this.router.navigate(['/']);
        this._loading = false;
      });
    } catch (e) {
      this._loading = false;
      this.nzMsg.error("Error logging in using google");
    }
  }

  // signOut(): void { // TODO: API Cares About that?
  //   this.auth2.signOut().then(() => {
  //     this.zone.run(() => {
  //       this.isLoggedIn$.next(false);
  //       this.tokenInfo$.next(null);
  //     });
  //   },
  //     (err) => {
  //       console.error(err);
  //     });
  // }

  loadAuth2(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.configService.currentConfig().subscribe(c => {
      const client_id = c.GOOGLE_CLIENT_ID;
      gapi.load('auth2', () => {
        gapi.auth2.init({
          client_id: client_id,
          fetch_basic_profile: true
        }).then((auth) => {
          this.zone.run(() => {
            this.auth2 = auth;
            this.isLoaded$.next(true);
          });
        },
        );
      });
    });
  }
}
