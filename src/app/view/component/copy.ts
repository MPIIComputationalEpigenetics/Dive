// From https://github.com/pehu71/copy-component/blob/master/src/simple/copy.component.ts


import { Component, Input } from '@angular/core';

@Component({
  selector: 'cmp-copy',
  template: `<button class="{{cssClass}}" (click)="copy()">Copy to Clipboard</button>`
})
export class CopyComponent {

  @Input() text: string;
  @Input() cssClass: string;

  constructor() { }

  copy() {
    let selBox = document.createElement('textarea');

    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.text;

    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();

    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

}