import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { ToastController } from '@ionic/angular';

//Custom Service
import { StorageService } from '../../service/storage';

//All custom capacitor plugin can be accessed from this class
import { Plugins } from '@capacitor/core';

//Implement the interface here
const { DCatalystDecryptor } = Plugins

export class ScannerUtil {
    //Declare barcode scanner class first
    barcodeCtrl: BarcodeScanner;

    constructor() { }

    static triggerScanner = function (callback) {
        //Need to instantiate since constructor never triggered for utility classes
        this.barcodeCtrl = new BarcodeScanner();

        //The options
        const options: BarcodeScannerOptions = {
            preferFrontCamera: false,
            showFlipCameraButton: false,
            showTorchButton: false,
            torchOn: false,
            prompt: 'Place a QR Code inside the scan area',
            resultDisplayDuration: 0,
            formats: 'QR_CODE',
            orientation: 'portrait',
        };

        this.barcodeCtrl.scan(options).then(barcodeData => {
            //Need to trigger the decrypt function first
            // instantiate new self 
            let scannerUtil = new ScannerUtil();
            scannerUtil.customDecryptLogic(barcodeData.text).then(function (decryptedData) {
                //Trigger the callback function
                callback(decryptedData);
            })

        }).catch(err => {
            console.log('Error', err);
        });
    }

    customDecryptLogic = function (dataToDecrypt) {
        return new Promise((resolve, reject) => {
            //Use dcatalyst plugin to do the first round decryption
            try {
                DCatalystDecryptor.decrypt({ "data": dataToDecrypt }).then((firstRoundDecrypted) => {
                    console.log("Plugin finish trigger", firstRoundDecrypted);
                    // Storage.get({ key: 'location' }).then(({ value }) => {
                    //     if (value) {
                    //         let location = JSON.parse(value);
                    //         Storage.get({ key: 'setting' }).then(({ value }) => {
                    //             if (value) {
                    //                 let setting = JSON.parse(value);
                    //                 let jsonData = {
                    //                     "data": JSON.stringify({
                    //                         "location": setting.location,
                    //                         "personInCharge": setting.personInCharge,
                    //                         // "imei": this.imei,
                    //                         // "phoneNumber": this.phoneNumber,
                    //                         "gpsCord": location.latitude + ", " + location.longitude,
                    //                         "latitude": location.latitude,
                    //                         "longitude": location.longitude,
                    //                         "imei": "Some imei number",
                    //                         "phoneNumber": "0163906293",
                    //                         "qrValue": firstRoundDecrypted.result
                    //                     })
                    //                 }

                    //                 //Post the data to backend for the second decryption
                    //                 //URL, Request Body, Request Header
                    //                 //Instantiate the HTTP object first
                    //                 let httpUtil = new HTTP();

                    //                 httpUtil.post(setting.connectedHost + setting.decryptEndpoint, jsonData,
                    //                     // httpUtil.post("http://d.dcatalyst.biz:4007" + "/qr", jsonData,
                    //                     {
                    //                         headers: 'Content-Type : application/x-www-form-urlencoded'
                    //                     }).then(data => {
                    //                         resolve(data.data);
                    //                     }).catch(error => {
                    //                         let scannerUtil = new ScannerUtil();
                    //                         scannerUtil.triggerToast(JSON.stringify(error));
                    //                     });
                    //             }
                    //             else {
                    //                 let scannerUtil = new ScannerUtil();
                    //                 scannerUtil.triggerToast("Please setup the base setting on setting page first!");
                    //             }
                    //         });
                    //     }
                    //     else {
                    //         let scannerUtil = new ScannerUtil();
                    //         scannerUtil.triggerToast("Please setup the base setting on setting page first!");
                    //     }
                    // })
                    let scannerUtil = new ScannerUtil();
                    scannerUtil.getAllStorageData().then((setting: any) => {
                        let jsonData = {
                            "data": JSON.stringify({
                                "location": setting.location,
                                "personInCharge": setting.personInCharge,
                                // "imei": this.imei,
                                // "phoneNumber": this.phoneNumber,
                                "gpsCord": setting.latitude + ", " + setting.longitude,
                                "latitude": setting.latitude,
                                "longitude": setting.longitude,
                                // "imei": "Some imei number",
                                // "phoneNumber": "0163906293",
                                "qrValue": firstRoundDecrypted.result
                            })
                        }
    
                        //Post the data to backend for the second decryption
                        //URL, Request Body, Request Header
                        //Instantiate the HTTP object first
                        let httpUtil = new HTTP();
    
                        httpUtil.post(setting.connectedHost + setting.decryptEndpoint, jsonData,
                            // httpUtil.post("http://d.dcatalyst.biz:4007" + "/qr", jsonData,
                            {
                                headers: 'Content-Type : application/x-www-form-urlencoded'
                            }).then(data => {
                                resolve(data.data);
                            }).catch(error => {
                                let scannerUtil = new ScannerUtil();
                                scannerUtil.triggerToast(JSON.stringify(error));
                            });
                    })
                });
            } catch (e) {
                reject(e);
            }
        });
    }

    async triggerToast(message) {
        let toastCtrl = new ToastController();
        const toast = await toastCtrl.create({
            message: message,
            duration: 2000
        });

        toast.present();
    }

    async getAllStorageData() {
        let storage = new StorageService();
        const getLocation = new Promise((resolve, reject) => {
            storage.getObject('location').then((location) => {
                if (location) {
                    // let location = JSON.parse(value);

                    resolve(location);
                }
                else {
                    let scannerUtil = new ScannerUtil();
                    scannerUtil.triggerToast("Please accept the location setting on page load first!");
                }
            });
        });
        const getSetting = new Promise((resolve, reject) => {
            storage.getObject('setting').then((setting) => {
                if (setting) {
                    // let setting = JSON.parse(value);

                    resolve(setting);
                }
                else {
                    let scannerUtil = new ScannerUtil();
                    scannerUtil.triggerToast("Please setup the base setting on setting page first!");
                }
            });
        });

        return Promise.all([getLocation, getSetting]).then((values) => {
            //Merge value into single object from array
            let mergedSetting = {}
            values.forEach((value: Object) => {
                mergedSetting = {
                    ...mergedSetting,
                    ...value
                }
            })
            return mergedSetting;
        });
    }
}
