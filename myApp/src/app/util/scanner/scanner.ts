import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

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

            //Trigger the callback function
            callback(barcodeData.text);
    
        }).catch(err => {
            console.log('Error', err);
        });
    }
}
