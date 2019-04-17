import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BusinessListComponent } from './business-list/business-list.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { BusinessCenterComponent } from './business-center/business-center.component';
import { BusinessCenterHomeComponent } from './business-center-home/business-center-home.component';
import { CanDeactivateGuard } from '../guards/can-deactivate.guard';

const routes: Routes = [
  {
    path: "businesses", component: BusinessCenterComponent,
    children: [
      {
        path: '',
        component: BusinessCenterHomeComponent,
        children: [
          {
            path: ':id',
            component: BusinessDetailComponent,
            canDeactivate: [CanDeactivateGuard],
            data: { animation: 'item' },
          },
          {
            path: '',
            component: BusinessListComponent,
            data: { animation: 'items' },
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessesRoutingModule { }
