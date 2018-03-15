import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'regions-transform',
  templateUrl: 'regions-transform.html'
})
export class RegionsTransformComponent {

  length = 2500;
  start = -2500;

  @Input() buttonLabel = "Transform Regions";

  @Output() flankEvent = new EventEmitter();
  @Output() extendEvent = new EventEmitter();

  directions = [
    { name: 'Backward', code: 'BACKWARD' },
    { name: 'Forward', code: 'FORWARD' },
    { name: 'Both', code: 'BOTH' },
  ]

  selectedDirection = this.directions[2];

  insertFlank() {
    this.flankEvent.emit({ type: 'flank', start: this.start, length: this.length });
  }

  insertExtend() {
    this.extendEvent.emit({ type: 'extend', length: this.length, direction: this.selectedDirection.code });
  }

}
