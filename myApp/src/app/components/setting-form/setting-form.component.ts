import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'comp-setting-form',
  templateUrl: './setting-form.component.html',
  styleUrls: ['./setting-form.component.scss'],
})
export class SettingFormComponent implements OnInit {
  @Input() label: string;

  constructor() { }

  ngOnInit() { }

}
