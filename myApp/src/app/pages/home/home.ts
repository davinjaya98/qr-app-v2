import { Component } from '@angular/core';
// import { NavController, MenuController, ToastController, Events, Platform } from 'ionic-angular';
// import { HTTP } from '@ionic-native/http';
// import { Storage } from '@ionic/storage';
// import { Geolocation } from '@ionic-native/geolocation';
// import { Sim } from '@ionic-native/sim';
// import { Uid } from '@ionic-native/uid';
// import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
// import { DomSanitizer } from '@angular/platform-browser';

// import { ScannerPage } from '../scanner/scanner';

// import { BaseComponent } from '../../shared/base';
// import { LoadingService } from '../../shared/loading';

declare var Hello: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  // providers: [LoadingService]
})
// export class HomePage extends BaseComponent {
export class HomePage {
  constructor() {}
  // errorStr: any = "";
  // scanResult: any = "";
  // qrResult: any = {};

  // latitude: any = "";
  // longitude: any = "";
  // phoneNumber: any = "";
  // phoneNumberChecked: any = false;
  // imei: any = "";
  // imeiChecked: any = false;

  // connectedHost: any = "";
  // location: any = "";
  // locationChecked: any = false;
  // personInCharge: any = "";

  // constructor(
  //   private navCtrl: NavController,
  //   private menuCtrl: MenuController,
  //   private http: HTTP,
  //   private storage: Storage,
  //   public toastCtrl: ToastController,
  //   private sanitizer: DomSanitizer,
  //   private geolocation: Geolocation,
  //   private sim: Sim,
  //   private uid: Uid,
  //   private androidPermissions: AndroidPermissions,
  //   private loadingService: LoadingService,
  //   private events: Events,
  //   private platform: Platform) {
  //   super(toastCtrl);

  //   events.subscribe("check:necessaryInfo", () => {
  //     console.log(this.imeiChecked);
  //     console.log(this.phoneNumberChecked);
  //     console.log(this.locationChecked);
  //     if (this.imeiChecked && this.phoneNumberChecked && this.locationChecked) {
  //       this.loadingService.dismiss();
  //     }
  //   });
  //   platform.ready().then(() => {
  //     this.loadingService.show();
  //     this.getNecessaryInfo();
  //   })
  // }

  // //Trigger on first time page load only e.g first time open app
  // ngOnInit() { }

  // //Trigger everytime page load
  // ionViewDidLoad() {
  // }

  // private getNecessaryInfo() {

  //   this.geolocation.getCurrentPosition({
  //     timeout: 10000
  //   }).then((resp) => {
  //     this.latitude = resp.coords.latitude;
  //     this.longitude = resp.coords.longitude;
  //   }).catch((error) => {
  //     console.log('Error getting location', error);
  //   }).then(() => {
  //     this.locationChecked = true;
  //     this.events.publish("check:necessaryInfo");
  //   });

  //   this.sim.requestReadPermission().then(
  //     () => console.log('Permission granted'),
  //     () => console.log('Permission denied')
  //   );

  //   this.sim.getSimInfo().then(
  //     (info) => {
  //       this.phoneNumber = info.phoneNumber;
  //     },
  //     (err) => console.log('Unable to get sim info: ', err)
  //   ).then(() => {
  //     this.phoneNumberChecked = true;
  //     this.events.publish("check:necessaryInfo");
  //   });

  //   this.getImei();
  // }

  // async getImei() {
  //   const { hasPermission } = await this.androidPermissions.checkPermission(
  //     this.androidPermissions.PERMISSION.READ_PHONE_STATE
  //   );

  //   console.log(1)
  //   if (!hasPermission) {
  //     console.log(2)
  //     const result = await this.androidPermissions.requestPermission(
  //       this.androidPermissions.PERMISSION.READ_PHONE_STATE
  //     ).then(
  //       result => {
  //         console.log(3)
  //         if (result && !result.hasPermission) {
  //           console.log(4)
  //           throw new Error('Permissions required');
  //         }

  //         console.log(5)
  //         this.imei = this.uid.IMEI;
  //         this.imeiChecked = true;
  //         this.events.publish("check:necessaryInfo");
  //         // ok, a user gave us permission, we can get him identifiers after restart app
  //         return;
  //       },
  //       err => {
  //         console.log(err)
  //       }
  //     ).catch((err) => {
  //       console.log(err)
  //     });
  //   }
  //   else {
  //     console.log(6)
  //     this.imei = this.uid.IMEI;
  //     this.imeiChecked = true;
  //     this.events.publish("check:necessaryInfo");
  //   }
  // }

  // trigger() {
  //   Hello.hello(
  //     //First parameter
  //     "Sample Parameter",
  //     //Second parameter
  //     (data) => {
  //       console.log(data);
  //     });
  // }

  // updateResult = (result) => {
  //   return new Promise((resolve, reject) => {
  //     Hello.decrypt(
  //       result,
  //       (decryptedData) => {
  //         this.scanResult = decryptedData;
  //         //Got the decrypted data back
  //         //decryptedData = "70lyt3sBjFg3KlMScP2SJe3kRyZWHF1Pa48yb_b3Vw4";

  //         let jsonData = {
  //           "data": JSON.stringify({
  //             "location": this.location,
  //             "personInCharge": this.personInCharge,
  //             "imei": this.imei,
  //             "phoneNumber": this.phoneNumber,
  //             "gpsCord": this.latitude + ", " + this.longitude,
  //             "latitude": this.latitude,
  //             "longitude": this.longitude,
  //             "qrValue": decryptedData
  //           })
  //         }

  //         //Post the data to backend for the second decryption
  //         //URL, Request Body, Request Header
  //         this.http.post(this.connectedHost + this.decryptEndpoint, jsonData,
  //           {
  //             headers: 'Content-Type : application/x-www-form-urlencoded'
  //           }).then(data => {
  //             //Set the data to an object for frontend massaging
  //             this.qrResult.pageUrl = data.data;
  //             //this.qrResult.pageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.data);
  //             this.qrResult.success = true;
  //           }).catch(error => {
  //             this.openToast(JSON.stringify(error));
  //           });


  //         /*this.qrResult.pageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.connectedHost + this.decryptEndpoint);
  //         this.qrResult.success = true;*/
  //       },
  //       (err) => {
  //         this.openToast(JSON.stringify(this.qrDecryptError));
  //       }
  //     )
  //     resolve();
  //   });
  // }

  // openScanner() {
  //   this.storage.get('connectedHost').then((connectedHost) => {
  //     this.storage.get('location').then((location) => {
  //       this.storage.get('personInCharge').then((personInCharge) => {
  //         if (connectedHost && connectedHost != "" && location && location != "" && personInCharge && personInCharge != "") {
  //           this.connectedHost = connectedHost;
  //           this.location = location;
  //           this.personInCharge = personInCharge;

  //           this.navCtrl.push(ScannerPage, {
  //             callback: this.updateResult
  //           });
  //         }
  //         else {
  //           this.openToast(this.settingError);
  //         }
  //       });
  //     });
  //   });
  // }

  // openSettings() {
  //   this.menuCtrl.toggle('right');
  // }
}
