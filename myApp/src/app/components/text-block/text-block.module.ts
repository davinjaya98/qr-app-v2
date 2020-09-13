import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextBlockComponent } from './text-block.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [TextBlockComponent],
  exports: [TextBlockComponent]
})
export class TextBlockComponentModule {}
