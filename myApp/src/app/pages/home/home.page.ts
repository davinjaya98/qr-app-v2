import { Component } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

import { ScannerUtil } from '../../util/scanner/scanner';

//Custom Service
import { StorageService } from '../../service/storage';
//No capacitor plugin for this. need to use ionic
import { Sim } from '@ionic-native/sim/ngx';
//All custom capacitor plugin can be accessed from this class
import { Plugins } from '@capacitor/core';

//Implement the interface here
const { Geolocation } = Plugins

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  iframeUrl: string = "";

  constructor(public loadingController: LoadingController, public sim: Sim, public toastCtrl: ToastController, private storage: StorageService) { }


  ngOnInit() {
    this.loadingController.create({
      message: 'Please wait...'
    }).then((loadingElem) => {
      loadingElem.present();
      this.triggerPermissions(loadingElem).then(() => { })
    });
  }

  triggerScanner = function () {
    ScannerUtil.triggerScanner((url) => {
      this.iframeUrl = url;
    });
  }

  async triggerPermissions(loadingElem) {
    return new Promise((resolve, reject) => {
      //Getting latitude longitude
      Geolocation.getCurrentPosition().then((resp) => {
        this.storage.setObject('location', {
          "latitude": resp.coords.latitude,
          "longitude": resp.coords.longitude,
        }).finally(() => {
          loadingElem.dismiss();
        });

        // let getSimInfo = () => {
        //   this.sim.getSimInfo().then(
        //     (info) => {
        //       console.log('Sim info: ', info);
        //       this.toastCtrl.create({
        //         message: 'Sim info: ' + info.phoneNumber,
        //         duration: 2000
        //       }).then(toast => toast.present());
        //       loadingElem.dismiss();
        //     },
        //     (err) => {
        //       console.log('Unable to get sim info: ', err);
        //       loadingElem.dismiss();
        //     }
        //   );
        // }

        //Get sim permission
        // this.sim.hasReadPermission().then(permitted => {
        //   if (permitted) {
        //     getSimInfo();
        //   }
        //   else {
        //     this.requestUntilGetSimPermission().then(() => {
        //       getSimInfo();
        //     });
        //   }
        // });
      }).catch((error) => {
        console.log('Error getting location', error);
        loadingElem.dismiss();
      });
    })
  }

  // async requestUntilGetSimPermission() {
  //   return new Promise((resolve, reject) => {
  //     this.sim.requestReadPermission().then(() => {
  //       //Accepted
  //       resolve(true);
  //     }, () => {
  //       //rejected
  //       this.requestUntilGetSimPermission();
  //     })
  //   })
  // }
}
