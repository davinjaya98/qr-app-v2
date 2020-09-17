import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

//Page
import { HomePage } from './home.page';

//Page Route
import { HomePageRoutingModule } from './home-routing.module';

//Custom Components
import { TextBlockComponentModule } from '../../components/text-block/text-block.module';
import { IframeLoaderComponentModule } from '../../components/iframe-loader/iframe-loader.module';

//Providers
import { Sim } from '@ionic-native/sim/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TextBlockComponentModule,
    IframeLoaderComponentModule,
  ],
  declarations: [HomePage],
  providers: [Sim]
})
export class HomePageModule { }
