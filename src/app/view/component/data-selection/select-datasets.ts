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
  FullMetadata,
  FullExperiment,
} from 'app/domain/deepblue';

import { DeepBlueService } from 'app/service/deepblue';
import { Subscription } from 'rxjs';
import { TreeNode } from 'primeng/primeng';
import { ProgressElement } from 'app/service/progresselement';
import { DeepBlueOperation, DeepBlueDataParameter } from 'app/domain/operations';
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

  visibleSidebar = false;
  selectedRow: FullExperiment;

  genomeSubscription: Subscription;
  datasets: TreeNode[] = [];
  selectedDatasets: any = [];

  clicked_query_id: string;

  @Input() selectMode = "checkbox"
  @Output() queryIdSelected = new EventEmitter();
  @Output() datasetsSelected = new EventEmitter();

  constructor(private deepBlueService: DeepBlueService, private progress_element: ProgressElement) {
    this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
      if (genome === null) {
        return;
      }
      this.deepBlueService.getComposedEnrichmentDatabases(genome.name).subscribe((datasets: Dataset[]) => {
        this.datasets = <TreeNode[]>datasets.map((dataset: Dataset) => this.buildNode(dataset));
      });

    })
  }

  nodeSelect(event: any) {
    if (event.node.data.leaf) {
      this.deepBlueService.getInfo(event.node.data.id).subscribe((info) => {
        this.selectedRow = <FullExperiment>info;
        this.visibleSidebar = true;

        if (event.node.data._query_id) {
          this.clicked_query_id = event.node.data._query_id.query_id.id;
        }
      })
    }
  }

  buildNode(dataset: Dataset, epigenetic_mark?: string): TreeNode {

    if (!epigenetic_mark) {
      epigenetic_mark = dataset[0];
    }

    return {
      "data": {
        "name": dataset[0]
      },
      "children": dataset[1].map((key: any) => {
        let key_array = <Array<any>>key;
        if ('string' == typeof key_array[1]) {
          if (key_array.length == 2) {
            return this.buildLeaf(key_array[0], key_array[1], dataset[0], epigenetic_mark, key_array[2]);
          } else {
            return this.buildLeaf(key_array[0], key_array[1], dataset[0], key_array[2], epigenetic_mark, key_array[3]);
          }
        } else {
          return this.buildNode(key, epigenetic_mark);
        }

      })
    }
  }

  buildLeaf(id: string, name: string, parent_name: string, biosource: string, epigenetic_mark: string, _query_id?: string): TreeNode {
    let o: any = {
      "data": {
        "id": new Id(id),
        "name": name,
        "biosource": biosource,
        "parent": parent_name,
        "epigeneticmark": epigenetic_mark,
        "leaf": true
      }
    }
    if (_query_id) {
      let id_name = new IdName(new Id(id), name);
      let data_parameter = new DeepBlueDataParameter(id_name);
      o.data._query_id = new DeepBlueOperation(data_parameter, new Id(_query_id), "filter", -1);;
    }

    return o;
  }

  selectDatasets(event: any) {

    if (Array.isArray(this.selectedDatasets)) {
      /*
      -- We do not allow multiple experiments data selection.
      -- It has the risk of the user select many experiments and too many regions.
      -- I keep the code in case I want to revise this choise in the future.

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
        // o_exps.subscribe((o) => this.queryIdSelected.emit(o));
      }
      */
    } else {
      let selected_node = <TreeNode>this.selectedDatasets;
      if (!selected_node.data.leaf) {
        console.warn("selected data isnt leaf");
      }
      if ("_query_id" in selected_node.data) {
        this.queryIdSelected.emit(selected_node.data._query_id);
      } else {
        let id_name = new IdName(selected_node.data.id, selected_node.data.name);
        this.deepBlueService.selectExperiment(id_name, this.progress_element, 0)
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
          actual.data.push([selected.data._query_id.query_id.id, selected.data.name]);
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
