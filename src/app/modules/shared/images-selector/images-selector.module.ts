import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesSelectorComponent } from './images-selector.component';
import { NzUploadModule, NzIconModule } from 'ng-zorro-antd';
import { CarouselModule } from '../carousel/carousel.module';

@NgModule({
  imports: [
    CommonModule,
    NzUploadModule,
    NzIconModule,
    CarouselModule
  ],
  declarations: [ImagesSelectorComponent],
  exports: [ImagesSelectorComponent]
})
export class ImagesSelectorModule { }
