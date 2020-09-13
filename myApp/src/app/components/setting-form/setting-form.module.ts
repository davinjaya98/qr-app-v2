import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingFormComponent } from './setting-form.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [SettingFormComponent],
  exports: [SettingFormComponent]
})
export class SettingFormComponentModule {}
