import { DeepBlueMiddlewareRequest } from '../../domain/operations';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MultiSelect } from 'primeng/primeng';

import { Dropdown, SelectItem } from 'primeng/primeng';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { BioSource, EpigeneticMark, FullExperiment, Genome, GeneModel } from 'app/domain/deepblue';

import { DataStackItem } from 'app/service/datastack';
import { DeepBlueService } from 'app/service/deepblue';
import { SelectedData } from 'app/service/selecteddata';
import { ProgressElement } from 'app/service/progresselement';

import { OverlapsBarChartComponent } from 'app/view/component/charts/overlappingbar';

import { DeepBlueOperation } from 'app/domain/operations';
import { DeepBlueResult } from 'app/domain/operations';
import { RequestManager } from 'app/service/requests-manager';
import { IOperation } from '../../domain/interfaces';

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

  @ViewChild('overlapbarchart') overlapbarchart: OverlapsBarChartComponent;
  @ViewChild('geneModelDropdown') geneModelDropdown: Dropdown;

  selectedGeneModelSource = new BehaviorSubject<GeneModel>(null);
  selectedGeneModelValue$: Observable<GeneModel> = this.selectedGeneModelSource.asObservable();

  currentlyProcessing: GeneModel = null;
  current_request = 0;
  data: any;
  hasData = false;

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
          this.geneModelDropdown.selectItem(null, l);
          return l;
        });
      },
        error => this.errorMessage = <any>error);
    });
  }

  ngAfterViewInit() {
    this.selectedGeneModelValue$.debounceTime(250).subscribe(() => this.processOverlaps());
    this.selectedData.activeTopStackValue$.subscribe((dataStackItem: DataStackItem) => this.processOverlaps());
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
      this.deepBlueService.getComposedResultIterator(request, this.progress_element, 'genes_overlaps')
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

    const series: Array<Object> = [];

    // By Filter
    datum.forEach((result: DeepBlueResult[], index: number) => {

      // By Stack
      result.forEach((result: DeepBlueResult, index: number) => {

      });
    });

    for (let stack_pos = 0; stack_pos < datum[0].length; stack_pos++) {
      const stack_values_result: Array<number> = [];
      for (let filter_pos = 0; filter_pos < datum.length; filter_pos++) {
        stack_values_result.push(datum[filter_pos][stack_pos].resultAsCount());
      }
      series.push({
        type: 'column',
        name: this.selectedData.getStackname(stack_pos),
        data: stack_values_result,
        color: this.selectedData.getStackColor(stack_pos, '0.3')
      });
    }

    const categories = [datum[0][0].getFilter().name()];
    for (let filter of this.filters) {
      categories.push(JSON.stringify(filter));
    }

    console.log(categories);
    this.overlapbarchart.setNewData(categories, series, null);
  }

  ngOnDestroy() {
    this.genomeSubscription.unsubscribe();
  }

  includeBar() {
    this.showIncludeBar = true;
  }


  directions = [
    { name: 'Backward', code: 'BACKWARD' },
    { name: 'Forward', code: 'FORWARD' },
    { name: 'Both', code: 'BOTH' },
  ]

  selectedDirection = this.directions[2];

  length = 2500;
  start = -2500;

  filters = new Array<any>();


  insertFlank() {
    this.addFilterAndSend({ type: 'flank', start: this.start, length: this.length });
  }

  insertExtend() {
    this.addFilterAndSend({ type: 'extend', length: this.length, direction: this.selectedDirection.code });
  }

  addFilterAndSend(c: any) {
    if (this.length == 0) {
      return;
    }
    this.filters.push(c)
    this.length = 0;
    this.showIncludeBar = false;
    this.processOverlaps();
  }

  removeFilter(c: any) {

  }

  toString(c: any) {
    if (c.type == "flank") {
      return "Flank - start: " + c.start + " , length: " + c.length;
    }
    else if (c.type == "extend") {
      return "Extend - length: " + c.length + " , direction: " + c.direction;
    }
  }

}
