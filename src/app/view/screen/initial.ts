import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IOperation } from 'app/domain/interfaces';

@Component({
  templateUrl: './initial.html'
})
export class InitialScreenComponent {

  @Output() queryIdSelected = new EventEmitter();
  display: boolean = false;

  showDialog() {
    this.display = true;
  }

  selectQuery(event: IOperation) {
    this.queryIdSelected.emit(event);
  }
}