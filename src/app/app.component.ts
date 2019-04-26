import { Component } from '@angular/core';
import { slideInAnimation } from './animations';
import { RouterOutlet } from '@angular/router';
import { NzIconService } from 'ng-zorro-antd';


const ngZorroIconLiteral =
  '<svg viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg"><path d="M7.2 2.323H5.923c-1.046 0-1.278.464-1.278 1.16V5.11h2.44l-.35 2.438h-2.09v6.387H2.09V7.548H0V5.11h2.09V3.252C2.09 1.162 3.368 0 5.342 0c.93 0 1.742.116 1.858.116v2.207z" fill="#4267B2" fill-rule="evenodd"></path></svg>';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  title = 'saasWebClient';

  constructor(private _iconService: NzIconService) {
    this._iconService.addIconLiteral('ng-vlicon:facebook', ngZorroIconLiteral);
  }


  getAnimationData(
    outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation'];
  }
}
