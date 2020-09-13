import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IframeLoaderComponent } from './iframe-loader.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [IframeLoaderComponent],
  exports: [IframeLoaderComponent]
})
export class IframeLoaderComponentModule {}
