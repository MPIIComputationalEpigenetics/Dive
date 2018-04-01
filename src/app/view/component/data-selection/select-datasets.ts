import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';

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
export class SelectDatasetsComponent implements OnInit {

  datatable_columns = [
    { name: 'name', prop: 'name', column_type: 'string' }
  ];

  visibleSidebar = false;
  selectedRow: FullExperiment = null;

  projectsSubscription: Subscription;
  datasetTreeNodes: TreeNode[] = [];
  selectedDatasets: any = [];
  datasets: [string, string[]][] = [];

  projects: Project[] = [];
  filterText = "";

  clicked_query_id: string;

  @Input() selectMode = "checkbox"
  @Output() queryIdSelected = new EventEmitter();
  @Output() datasetsSelected = new EventEmitter();

  constructor(private deepBlueService: DeepBlueService, private progress_element: ProgressElement) { }


  ngOnInit() {
    this.projectsSubscription = this.deepBlueService.projectsValue$.subscribe(projects => {
      this.projects = projects;
      if (projects === null) {
        return;
      }

      this.progress_element.startIndeterminate()

      let genome = this.deepBlueService.genomeSource.getValue();
      this.datasetTreeNodes = [];
      this.datasets = [];
      this.deepBlueService.getComposedEnrichmentDatabases(genome.name).subscribe((datasets: Dataset[]) => {
        this.datasets = datasets;
        this.buildItems();
        this.progress_element.finishIndeterminate();
      });
    })
  }

  buildItems() {
    let projectNames = this.projects.map((project) => project.name);
    this.datasetTreeNodes = <TreeNode[]>this.datasets.map((dataset: Dataset) => this.buildNode(dataset, projectNames)).filter((node) => node.children.length > 0);
  }

  updateFilter($event: any) {
    this.buildItems();
  }

  buildNode(dataset: Dataset, projectNames: string[], epigenetic_mark?: string, passFilter?: boolean): TreeNode {

    if (!epigenetic_mark) {
      epigenetic_mark = dataset[0];
    }

    let name = dataset[0];

    if (this.filterText.toLowerCase().trim().length > 0 && name.toLowerCase().indexOf(this.filterText.toLowerCase()) >= 0) {
      passFilter = true;
    }

    return {
      "data": {
        "name": name
      },
      "children": dataset[1].map((key: any) => {
        let key_array = <Array<any>>key;
        if ('string' == typeof key_array[1]) {
          if (key_array.length == 2) {
            return this.buildLeaf(key_array[0], key_array[1], dataset[0], epigenetic_mark, key_array[2], key_array[3], projectNames, passFilter);
          } else {
            return this.buildLeaf(key_array[0], key_array[1], dataset[0], key_array[2], epigenetic_mark, key_array[3], projectNames, passFilter, key_array[4]);
          }
        } else {
          return this.buildNode(key, projectNames, epigenetic_mark, passFilter);
        }
      }).filter((value) => {
        if (value == null) {
          return false;
        }

        if (value.children) {
          return value.children.length != 0;
        }

        return true;
      })
    }
  }

  buildLeaf(id: string, name: string, parent_name: string, biosource: string, epigenetic_mark: string, project: string, projectNames: string[], passFilter?: boolean, _query_id?: string): TreeNode {

    if (projectNames.indexOf(project) < 0) {
      return null;
    }

    let o: any = {
      "data": {
        "id": new Id(id),
        "name": name,
        "biosource": biosource,
        "project": project,
        "parent": parent_name,
        "epigeneticmark": epigenetic_mark,
        "leaf": true
      }
    }

    if (!passFilter && this.filterText.trim().length > 0) {
      let found = false;
      for (let key of Object.keys(o.data)) {
        let value = o.data[key];
        if (typeof value === 'string') {
          value = value.trim().toLowerCase();
          if (value.indexOf(this.filterText.toLowerCase().trim()) >= 0) {
            found = true;
            break;
          }
        }
      }

      if (!found) {
        return null;
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
    this.visibleSidebar = false;

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

      e_exps = this.deepBlueService.mergeQueries(selected_queries);
      o_exps = this.deepBlueService.selectExperiments(selected_experiments.map((node: TreeNode) => node.data.name));

      if (e_exps && o_exps) {
        Observable.forkJoin([e_exps, o_exps]).subscribe((completion: IOperation[]) => {
          e_exps = this.deepBlueService.mergeQueries(completion).subscribe((final: IOperation) => {
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
        this.deepBlueService.selectExperiment(id_name)
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

  nodeSelect(event: any) {
    if (event.node.data.leaf) {
      this.visibleSidebar = true;
      this.selectedRow = null;
      this.deepBlueService.getInfo(event.node.data.id).subscribe((info) => {
        this.selectedRow = <FullExperiment>info;
        if (event.node.data._query_id) {
          this.clicked_query_id = event.node.data._query_id.query_id.id;
        } else {
          let id_name = new IdName(event.node.data.id, event.node.data.name);
          this.deepBlueService.selectExperiment(id_name).subscribe((q) => this.clicked_query_id = q.query_id.id);
        }
      })
    }
    this.buildDatasets();
  }

  ngOnDestroy() {
    this.projectsSubscription.unsubscribe();
  }
}
