import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { HTTP } from '@ionic-native/http/ngx';

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
                    let jsonData = {
                        "data": JSON.stringify({
                            // "location": this.location,
                            // "personInCharge": this.personInCharge,
                            // "imei": this.imei,
                            // "phoneNumber": this.phoneNumber,
                            // "gpsCord": this.latitude + ", " + this.longitude,
                            // "latitude": this.latitude,
                            // "longitude": this.longitude,
                            // "qrValue": firstRoundDecrypted
                            "location": "Kuala Lumpur",
                            "personInCharge": "Davin Jaya",
                            "imei": "Some imei number",
                            "phoneNumber": "0163906293",
                            "gpsCord": "latitude" + ", " + "longitude",
                            "latitude": "latitude",
                            "longitude": "longitude",
                            "qrValue": firstRoundDecrypted
                        })
                    }
    
                    //Post the data to backend for the second decryption
                    //URL, Request Body, Request Header
                    //Instantiate the HTTP object first
                    let httpUtil = new HTTP();

                    // this.http.post(this.connectedHost + this.decryptEndpoint, jsonData,
                    httpUtil.post("https://d.dcatalyst.biz/" + "q", jsonData,
                        {
                            headers: 'Content-Type : application/x-www-form-urlencoded'
                        }).then(data => {
                            // this.qrResult.pageUrl = data.data;
                            // Resolve with the final decrypted data
                            resolve(data.data);
                        }).catch(error => {
                            this.openToast(JSON.stringify(error));
                        });
                });
            }catch(e) {
                reject(e);
            }
        });
    }
}
