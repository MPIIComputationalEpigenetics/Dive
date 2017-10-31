import { Component, Output, EventEmitter, Input } from '@angular/core';

import {
  Annotation,
  BioSource,
  EpigeneticMark,
  Experiment,
  IdName,
  Technique,
  Project,
  Id,
} from 'app/domain/deepblue';

import { DeepBlueService } from 'app/service/deepblue';
import { Subscription } from 'rxjs';
import { TreeNode } from 'primeng/primeng';
import { ProgressElement } from 'app/service/progresselement';
import { DeepBlueOperation, FilterParameter, DataParameter } from 'app/domain/operations';
import { Observable } from 'rxjs/Observable';
import { IOperation } from 'app/domain/interfaces';


type Dataset = [string, string[]];

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
  selectedDatasets: any = [];

  @Input() selectMode = "checkbox"
  @Output() queryIdSelected = new EventEmitter();
  @Output() datasetsSelected = new EventEmitter();

  JSON: any;

  constructor(private deepBlueService: DeepBlueService, private progress_element: ProgressElement) {
    this.JSON = JSON;
    this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
      if (genome === null) {
        return;
      }
      this.deepBlueService.getComposedEnrichmentDatabases(genome.name).subscribe((datasets: Dataset[]) => {
        this.datasets = <TreeNode[]>datasets.map((dataset: Dataset) => this.buildNode(dataset));
      });

    })
  }

  buildNode(dataset: Dataset): TreeNode {
    return {
      "data": {
        "name": dataset[0]
      },
      "children": dataset[1].map((key: string) => {
        if ('string' === typeof key) {
          return this.buildLeaf(key, dataset[0]);
        } else {
          let key_array = <Array<any>>key;
          if ('string' == typeof key_array[1]) {
            return this.buildLeaf(key_array[0], dataset[0], key_array[1]);
          } else {
            return this.buildNode(key);
          }
        }
      })
    }
  }

  buildLeaf(name: string, parent_name: string, _query_id?: string): TreeNode {
    let o: any = {
      "data": {
        "name": name,
        "parent": parent_name,
        "leaf": true
      }
    }
    if (_query_id) {
      o.data._query_id = new DeepBlueOperation(new DataParameter(name), new Id(_query_id), "filter", -1);;
    }

    return o;
  }

  selectDatasets(event: any) {

    if (Array.isArray(this.selectedDatasets)) {
      let selected = this.selectedDatasets.filter((node: TreeNode) => node.data.leaf);

      let selected_experiments = selected.filter((node: TreeNode) => !("query_id" in node));
      let selected_queries = selected.filter((node: TreeNode) => "_query_id" in node.data);

      let o_exps = null;
      let e_exps = null;

      e_exps = this.deepBlueService.mergeQueries(selected_queries, this.progress_element, 0);
      o_exps = this.deepBlueService.selectExperiments(selected_experiments.map((node: TreeNode) => node.data.name), this.progress_element, 0);

      if (e_exps && o_exps) {
        Observable.forkJoin([e_exps, o_exps]).subscribe((completion: IOperation[]) => {
          e_exps = this.deepBlueService.mergeQueries(completion, this.progress_element, 0).subscribe((final: IOperation) => {
            this.queryIdSelected.emit(final);
          })
        });
      } else if (e_exps) {
        e_exps.subscribe((e) => this.queryIdSelected.emit(e));
      } else if (o_exps) {
        o_exps.subscribe((o) => this.queryIdSelected.emit(o));
      }
    } else {
      let selected_node = <TreeNode>this.selectedDatasets;
      if (!selected_node.data.leaf) {
        console.log("selected data isnt leaf");
      }
      if ("_query_id" in selected_node.data) {
        this.queryIdSelected.emit(selected_node.data._query_id);
      } else {
        this.deepBlueService.selectExperiments(selected_node.data.name, this.progress_element, 0)
          .subscribe((q) => this.queryIdSelected.emit(q));
      }
    }

    this.buildDatasets();

  }

  buildDatasets() {
    let actual = null;
    let datasets: any = {}
    for (let selected of this.selectedDatasets) {
      if (selected.data.name == "Chomatin States Segmentation") {
        continue;
      }
      if (selected.data.leaf) {
        if (selected.data._query_id) {
          actual.data.push([selected.data.name, selected.data._query_id]);
        } else {
          actual.data.push(selected.data.name);
        }
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
