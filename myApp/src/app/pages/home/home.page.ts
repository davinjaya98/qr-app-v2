import { Component } from '@angular/core';

import { ScannerUtil } from '../../util/scanner/scanner';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  iframeUrl: string = "";

  constructor() {}

  triggerScanner = function() {
    ScannerUtil.triggerScanner((url) => {
      this.iframeUrl = url;
    });
  }
}
