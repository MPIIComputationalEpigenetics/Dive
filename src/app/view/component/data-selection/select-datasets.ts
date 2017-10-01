import { Component, Output, EventEmitter } from '@angular/core';

import {
  Annotation,
  BioSource,
  EpigeneticMark,
  Experiment,
  IdName,
  Technique,
  Project,
} from 'app/domain/deepblue';

import { DeepBlueService } from 'app/service/deepblue';
import { Subscription } from 'rxjs';
import { TreeNode } from 'primeng/primeng';
import { ProgressElement } from 'app/service/progresselement';
import { DeepBlueOperation } from 'app/domain/operations';

@Component({
  selector: 'select-datasets-component',
  templateUrl: './select-datasets.html'
})

export class SelectDatasetsComponent {

  datatable_columns = [
    { name: 'name', prop: 'name', column_type: 'string' }
  ];

  genomeSubscription: Subscription;
  datasets: TreeNode[] = [];
  selectedDatasets: TreeNode[] = [];

  @Output() queryIdSelected = new EventEmitter();
  @Output() datasetsSelected = new EventEmitter();

  JSON: any;

  constructor(private deepBlueService: DeepBlueService, private progress_element: ProgressElement) {
    this.JSON = JSON;
    this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
      if (genome === null) {
        return;
      }
      type Dataset = [string, string[]];
      this.deepBlueService.getComposedEnrichmentDatabases(genome.name).subscribe((datasets: Dataset[]) => {

        this.datasets = <TreeNode[]>datasets.map((dataset: Dataset) => {
          return {
            "data": {
              "name": dataset[0]
            },
            "children": dataset[1].map((name: string) => {
              return {
                "data": {
                  "name": name,
                  "parent": dataset[0],
                  "leaf": true
                }
              }
            })
          }
        });
      });

    })
  }

  selectDatasets(event: any) {
    let selected = this.selectedDatasets.filter((node: TreeNode) => node.data.leaf).map((node: TreeNode) => node.data.name);
    this.deepBlueService.selectExperiments(selected, this.progress_element, 0).subscribe((op: DeepBlueOperation) => {
      this.queryIdSelected.emit(op);
    });
    this.buildDatasets();
  }

  buildDatasets() {
    let actual = null;
    let datasets : any = {}
    for (let selected of this.selectedDatasets) {
      if (selected.data.leaf) {
        actual.data.push(selected.data.name);
      } else {
        if (actual) {
          datasets[actual.name] = actual.data;
        }
        actual = { name: selected.data.name, data: [] }
      }
    }
    if (actual) {
      datasets[actual.name] = actual.data;
    }

    this.datasetsSelected.emit(datasets);
  }

  ngOnDestroy() {
    this.genomeSubscription.unsubscribe();
  }


}
