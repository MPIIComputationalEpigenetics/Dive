import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IOperation } from 'app/domain/interfaces';
import { DeepBlueService } from 'app/service/deepblue';
import { Router } from '@angular/router';

@Component({
  templateUrl: './initial.html'
})
export class InitialScreenComponent {

  constructor(private deepBlueService: DeepBlueService, private router: Router) { }

  display: boolean = false;

  showDialog() {
    this.display = true;
  }

  selectQuery(event: IOperation) {
    this.deepBlueService.setDataToDive(event);
    this.router.navigate(['/similarfinder']);
  }
}