import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

// import { DCatalystDecryptor } from 'capacitor-plugin-dcatalyst-decryptor';
import { Plugins } from '@capacitor/core';

const { DCatalystDecryptor } = Plugins

// declare var Hello: any;

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
            // console.log('Barcode data', barcodeData);

            //Need to trigger the decrypt function first
            // instantiate new self 
            let scannerUtil = new ScannerUtil();
            scannerUtil.customDecryptLogic(barcodeData.text).then(function (decryptedData) {
                //Trigger the callback function
                console.log("Data ready to be send to dcatalyst side");
                callback(decryptedData);
            })

        }).catch(err => {
            console.log('Error', err);
        });
    }

    customDecryptLogic = function (dataToDecrypt) {
        return new Promise((resolve, reject) => {
            console.log("Triggering plugin");
            DCatalystDecryptor.decrypt({"data": dataToDecrypt}).then((echoReturn) => {
                console.log("Plugin finish trigger", echoReturn);
                resolve(echoReturn);
            });
            // try {
            //     Hello.decrypt(
            //         dataToDecrypt,
            //         (decryptedData) => {
            //             this.scanResult = decryptedData;
            //             //Got the decrypted data back
            //             //decryptedData = "70lyt3sBjFg3KlMScP2SJe3kRyZWHF1Pa48yb_b3Vw4";
    
            //             // let jsonData = {
            //             //     "data": JSON.stringify({
            //             //         "location": this.location,
            //             //         "personInCharge": this.personInCharge,
            //             //         "imei": this.imei,
            //             //         "phoneNumber": this.phoneNumber,
            //             //         "gpsCord": this.latitude + ", " + this.longitude,
            //             //         "latitude": this.latitude,
            //             //         "longitude": this.longitude,
            //             //         "qrValue": decryptedData
            //             //     })
            //             // }
    
            //             // //Post the data to backend for the second decryption
            //             // //URL, Request Body, Request Header
            //             // this.http.post(this.connectedHost + this.decryptEndpoint, jsonData,
            //             //     {
            //             //         headers: 'Content-Type : application/x-www-form-urlencoded'
            //             //     }).then(data => {
            //             //         //Set the data to an object for frontend massaging
            //             //         this.qrResult.pageUrl = data.data;
            //             //         //this.qrResult.pageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.data);
            //             //         this.qrResult.success = true;
            //             //     }).catch(error => {
            //             //         this.openToast(JSON.stringify(error));
            //             //     });
    
    
            //             /*this.qrResult.pageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.connectedHost + this.decryptEndpoint);
            //             this.qrResult.success = true;*/
            //         },
            //         (err) => {
            //             this.openToast(JSON.stringify(this.qrDecryptError));
            //         }
            //     )
            //     resolve();
            // }catch(e) {
            //     reject(e);
            // }
        });
    }
}
