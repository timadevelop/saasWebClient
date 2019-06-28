import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';

import { ServicesComponent } from './services/services.component';
import { ServicesListComponent } from './services-list/services-list.component';
import { ServicesDetailComponent } from './services-detail/services-detail.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { CoreModule } from '../../core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimilarServicesListComponent } from './similar-services-list/similar-services-list.component';
import { NewServiceFormComponent } from './new-service-form/new-service-form.component';
import { CreateServiceComponent } from './create-service/create-service.component';
import { JsonLabelValueEditorComponent } from './new-service-form/json-label-value-editor/json-label-value-editor.component';
import { PromotedServicesListComponent } from './promoted-services-list/promoted-services-list.component';
import { PromoteServiceComponent } from './promote-service/promote-service.component';
import { SharedModule } from '../shared/shared.module';
import { PromoteServiceUsingCouponComponent } from './promote-service/promote-service-using-coupon/promote-service-using-coupon.component';
import { EditServiceComponent } from './edit-service/edit-service.component';

@NgModule({
  declarations: [
    ServicesComponent,
    ServicesListComponent,
    ServicesDetailComponent,
    SimilarServicesListComponent,
    PromotedServicesListComponent,
    CreateServiceComponent,
    EditServiceComponent,
    NewServiceFormComponent,
    PromoteServiceComponent,
    PromoteServiceUsingCouponComponent,
    JsonLabelValueEditorComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    NgZorroAntdModule,
    ServicesRoutingModule,
    SharedModule
  ],
  exports: [
    ServicesListComponent
  ]
})
export class ServicesModule { }
