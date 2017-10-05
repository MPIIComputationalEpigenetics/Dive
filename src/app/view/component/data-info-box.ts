import { DeepBlueMiddlewareOverlapResult } from '../../domain/operations';
import { Component, ViewChild, OnInit, Input, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { MenuItem } from 'primeng/primeng';
import { Dropdown } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';

import { Annotation } from 'app/domain/deepblue';
import { EpigeneticMark } from 'app/domain/deepblue';
import { Experiment } from 'app/domain/deepblue';
import { FullMetadata } from 'app/domain/deepblue';
import { Genome } from 'app/domain/deepblue';
import { IdName } from 'app/domain/deepblue';

import { StackValue } from 'app/domain/operations';
import { MenuService } from 'app/service/menu';

import { DataCache } from 'app/service/deepblue';
import { DeepBlueService } from 'app/service/deepblue';
import { MultiKeyDataCache } from 'app/service/deepblue';
import { SelectedData } from 'app/service/selecteddata';
import { DataStack } from 'app/service/datastack';

@Component({
  selector: 'app-data-info-box',
  template: `
      <div class="card card-w-title" style="word-wrap: break-word">
          <h2>Data overlapping with {{ getStackName() }}</h2>

          <li *ngFor="let result of results">
              {{ result.getFilterName() }} - {{ result.getCount() }}
          <p><button pButton type="button" (click)="filterOverlapping(result)" label="Filter overlapping"></button>
          <p><button pButton type="button" (click)="filterNonOverlapping(result)" label="Filter not-overlapping"></button>
          </li>
      </div>
  `
})
export class DataInfoBoxComponent implements OnDestroy {
  dataSelectedSubscription: Subscription;

  biosource: string = null;
  value: Object = null;
  results: DeepBlueMiddlewareOverlapResult[] = [];

  constructor(private deepBlueService: DeepBlueService, private selectedData: SelectedData) {
    this.dataSelectedSubscription = deepBlueService.dataInfoSelectedValue$.subscribe((data: any) => {
      this.biosource = data['biosource'];
      this.value = data['value'];
      this.results = data['results']
        .sort((a: DeepBlueMiddlewareOverlapResult, b: DeepBlueMiddlewareOverlapResult) => a.getCount() - b.getCount());

      console.log(this.results);
    });
  }

  filterOverlapping(result: DeepBlueMiddlewareOverlapResult) {
    let op = result.toDeepBlueOperation();
    this.selectedData.activeStackSubject.getValue().overlap(op);
  }

  filterNonOverlapping(result: DeepBlueMiddlewareOverlapResult) {
    let op = result.toDeepBlueOperation();
    this.selectedData.activeStackSubject.getValue().non_overlap(op);
  }

  getStackName(): string {
    return this.biosource;
  }

  ngOnDestroy() {
    this.dataSelectedSubscription.unsubscribe();
  }

}
