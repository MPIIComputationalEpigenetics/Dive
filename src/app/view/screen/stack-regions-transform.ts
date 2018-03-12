import { Component } from '@angular/core';
import { DeepBlueService } from 'app/service/deepblue';
import { SelectedData } from 'app/service/selecteddata';
import { ProgressElement } from 'app/service/progresselement';

import { OverlapsBarChartComponent } from 'app/view/component/charts/overlappingbar';

import { DeepBlueOperation } from 'app/domain/operations';
import { DeepBlueResult } from 'app/domain/operations';
import { RequestManager } from 'app/service/requests-manager';
import { IOperation } from '../../domain/interfaces';

@Component({
  templateUrl: './stack-regions-transform.html'
})
export class StackRegionsTransformScreen {
  constructor(private deepBlueService: DeepBlueService, private selectedData: SelectedData) { }

  addFilterAndSend(c: any) {
    if (c.length == 0) {
      return;
    }

    if (c.type == "extend") {
      this.selectedData.activeStackSubject.getValue().extend(c.length, c.direction);
    }

  }

  insertFlank($event: any) {
    this.addFilterAndSend($event);
  }

  insertExtend($event: any) {
    this.addFilterAndSend($event);
  }
}
