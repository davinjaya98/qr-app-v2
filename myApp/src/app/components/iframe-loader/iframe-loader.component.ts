import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'comp-iframe-loader',
  templateUrl: './iframe-loader.component.html',
  styleUrls: ['./iframe-loader.component.scss'],
})
export class IframeLoaderComponent implements OnInit {
  @Input() url: string;
  pageUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() { 
  }
  
  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const chng = changes[propName];
      // const cur  = JSON.stringify(chng.currentValue);
      // const prev = JSON.stringify(chng.previousValue);
      if(propName == "url") {
        this.pageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      }
      
      // console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
    }
  }

}
