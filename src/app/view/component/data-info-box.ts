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

import { StackValue, DeepBlueResult, DeepBlueOperation } from 'app/domain/operations';

import { DataCache } from 'app/service/deepblue';
import { DeepBlueService } from 'app/service/deepblue';
import { MultiKeyDataCache } from 'app/service/deepblue';
import { SelectedData } from 'app/service/selecteddata';
import { DataStack } from 'app/service/datastack';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-info-box',
  template: `
    <h2>Data overlapping with {{ getStackName() }}</h2>
    <p-scrollPanel [style]="{height: '95%', width: '100%'}">
      <li *ngFor="let result of results">
        {{ result.getFilter().name() }} - {{ result.resultAsCount() }}
        <p><button pButton type="button" (click)="filterOverlapping(result)" label="Filter overlapping"></button>
        <p><button pButton type="button" (click)="filterNonOverlapping(result)" label="Filter not-overlapping"></button>
      </li>
    </p-scrollPanel>
  `
})
export class DataInfoBoxComponent implements OnDestroy {
  dataSelectedSubscription: Subscription;

  biosource: string = null;
  value: Object = null;
  results: DeepBlueResult[] = [];

  @Output() dataSelected = new EventEmitter();

  constructor(private deepBlueService: DeepBlueService, private selectedData: SelectedData) {
    this.dataSelectedSubscription = deepBlueService.dataInfoSelectedValue$.subscribe((data: any) => {
      if (!data) {
        return;
      }
      this.biosource = data['biosource'];
      this.value = data['value'];
      this.results = data['results']
        .sort((a: DeepBlueResult, b: DeepBlueResult) => a.resultAsCount() - b.resultAsCount());
    });
  }

  filterOverlapping(result: DeepBlueResult) {
    let filter = result.getFilter();
    if (filter instanceof DeepBlueOperation) {
      this.selectedData.activeStackSubject.getValue().overlap(<DeepBlueOperation>filter);
      this.dataSelected.emit(filter);
    }

  }

  filterNonOverlapping(result: DeepBlueResult) {
    let filter = result.getFilter();
    if (filter instanceof DeepBlueOperation) {
      this.selectedData.activeStackSubject.getValue().non_overlap(<DeepBlueOperation>filter);
      this.dataSelected.emit(filter);
    }
  }

  getStackName(): string {
    return this.biosource;
  }

  ngOnDestroy() {
    this.dataSelectedSubscription.unsubscribe();
  }

}
