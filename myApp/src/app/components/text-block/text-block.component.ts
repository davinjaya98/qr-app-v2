import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'comp-text-block',
  templateUrl: './text-block.component.html',
  styleUrls: ['./text-block.component.scss'],
})
export class TextBlockComponent implements OnInit {
  @Input() label: string;

  constructor() { }

  ngOnInit() { }

}
