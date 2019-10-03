import { DeepBlueMiddlewareRequest } from '../../domain/operations';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { GeneModel } from 'app/domain/deepblue';

import { DeepBlueService } from 'app/service/deepblue';
import { SelectedData } from 'app/service/selected-data';
import { ProgressElement } from 'app/service/progresselement';

import { OverlapsBarChartComponent } from 'app/view/component/charts/overlappingbar';

import { DeepBlueResult } from 'app/domain/operations';
import { RequestManager } from 'app/service/requests-manager';
import { IOperation } from '../../domain/interfaces';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Dropdown } from 'primeng/components/dropdown/dropdown';

@Component({
  templateUrl: './genes.html'
})
export class GenesScreen implements AfterViewInit, OnDestroy {
  showIncludeBar: boolean;
  errorMessage: string;
  geneModels: GeneModel[];
  menuGeneModel: SelectItem[];
  selectedGeneModel: SelectItem[];

  genomeSubscription: Subscription;

  geneOperations: IOperation[];

  bars: Object[];

  @ViewChild('overlapbarchart', { static: true }) overlapbarchart: OverlapsBarChartComponent;
  @ViewChild('geneModelDropdown', { static: true }) geneModelDropdown: Dropdown;

  selectedGeneModelSource = new BehaviorSubject<GeneModel>(null);
  selectedGeneModelValue$: Observable<GeneModel> = this.selectedGeneModelSource.asObservable();

  currentlyProcessing: GeneModel = null;
  current_request = 0;
  data: any;
  hasData = false;

  showDataDetail = false;
  selectedFilter = {};

  constructor(public deepBlueService: DeepBlueService, public requestManager: RequestManager,
    public progress_element: ProgressElement, private selectedData: SelectedData) {

    this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
      if (genome === null) {
        return;
      }
      this.deepBlueService.getGeneModelsBySelectedGenome().subscribe((geneModels: GeneModel[]) => {
        if (geneModels.length === 0) {
          return;
        }
        this.geneModels = geneModels;
        this.menuGeneModel = geneModels.map((geneModel: GeneModel) => {
          const l = { label: geneModel.name, value: geneModel };
          // Always select the last gene model
          this.geneModelDropdown.selectItem({}, l);
          return l;
        });
      },
        error => this.errorMessage = <any>error);
    });
  }

  ngAfterViewInit() {
    this.selectedGeneModelValue$.debounceTime(250).subscribe(() => this.processOverlaps());
    this.selectedData.activeTopStackValue$.subscribe(() => this.processOverlaps());
  }

  selectGeneModel(event: any) {
    this.selectedGeneModelSource.next(event.value);
  }

  processOverlaps() {
    this.progress_element.reset(3, this.current_request);

    const gene_model = this.selectedGeneModelSource.getValue();

    if (gene_model == null) {
      this.reloadPlot([]);
      return;
    }

    if (gene_model !== this.selectedGeneModelSource.getValue()) {
      this.reloadPlot([]);
      return;
    }

    this.current_request++;

    // Each experiment is started, selected, overlaped, count, get request data (4 times each)
    this.progress_element.reset(0, this.current_request);
    this.currentlyProcessing = gene_model;
    const start = new Date().getTime();

    const current = this.selectedData.getStacksTopOperation();

    this.deepBlueService.composedCountGenesOverlaps(current, gene_model, this.filters).subscribe((request: DeepBlueMiddlewareRequest) => {
      this.requestManager.cancelAllRequest();
      this.requestManager.enqueueRequest(request);
      this.deepBlueService.getComposedResultIterator(request, 'genes_overlaps')
        .subscribe((result: DeepBlueResult[][]) => {
          // Now calculate and output the difference
          this.currentlyProcessing = null;
          this.reloadPlot(result);
        });
    });

    if (gene_model === this.currentlyProcessing) {
      return;
    }
    this.current_request++;
    this.currentlyProcessing = gene_model;
  }

  reloadPlot(datum: DeepBlueResult[][]) {

    if (datum.length <= 0) {
      return;
    }

    const result_by_dataset_stack: {
      [key: string]: {
        [key: string]: any
      }
    } = {};

    const series: Array<Object> = [];

    const categories = [datum[0][0].getFilter().name()];
    for (let filter of this.filters) {
      let category = JSON.stringify(filter);
      categories.push(category);
    }

    for (let category of categories) {
      result_by_dataset_stack[category] = {}
    }

    for (let stack_pos = 0; stack_pos < datum[0].length; stack_pos++) {
      const stack_values_result: Array<number> = [];
      for (let filter_pos = 0; filter_pos < datum.length; filter_pos++) {
        stack_values_result.push(datum[filter_pos][stack_pos].resultAsCount());

        let filter = {}
        if (filter_pos > 0) {
          filter = this.filters[filter_pos - 1]
        }
        result_by_dataset_stack[categories[filter_pos]][stack_pos] = filter;
      }
      series.push({
        type: 'column',
        name: this.selectedData.getStackname(stack_pos),
        data: stack_values_result,
        color: this.selectedData.getStackColor(stack_pos, '0.3')
      });
    }

    console.log(categories);
    this.overlapbarchart.setNewData(categories, series, result_by_dataset_stack);
  }

  ngOnDestroy() {
    this.genomeSubscription.unsubscribe();
  }

  includeBar() {
    this.showIncludeBar = true;
  }

  filters = new Array<any>();

  addFilterAndSend(c: any) {
    if (c.length == 0) {
      return;
    }
    this.filters.push(c)
    this.showIncludeBar = false;
    this.processOverlaps();
  }

  insertFlank($event: any) {
    this.addFilterAndSend($event);
  }

  insertExtend($event: any) {
    this.addFilterAndSend($event);
  }

  removeFilter(c: any) {
    let index = this.filters.indexOf(c);
    this.filters.splice(index, 1);
    this.processOverlaps();
  }

  toString(c: any) {
    if (c.type == "flank") {
      return "Flank - start: " + c.start + " , length: " + c.length;
    }
    else if (c.type == "extend") {
      return "Extend - length: " + c.length + " , direction: " + c.direction;
    }
  }

  setDataInfo($event: any) {
    this.selectedFilter = $event;
    this.showDataDetail = true;
  }

  filterOverlapping(term: any) {
    const gene_model = this.selectedGeneModelSource.getValue();
    this.showDataDetail = false;


    this.deepBlueService.selectGenes([], [], gene_model).subscribe((op) => {

      let genesObservable: Observable<IOperation> = null;
      if ('type' in term) {
        if (term.type == 'flank') {
          genesObservable = this.deepBlueService.flank(op, term.start, term.length, -1)
        } else if (term.type == 'extend') {
          genesObservable = this.deepBlueService.extend(op, term.length, term.direction, -1);
        }
      } else {
        genesObservable = Observable.of(op);
      }

      genesObservable.subscribe((genesOp) => {
        this.selectedData.activeStackSubject.getValue().overlap(genesOp);
      })
    });


    // Select genes (all)
    // Overlap with filter

  }

}
