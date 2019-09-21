import { Component, OnDestroy, AfterViewInit, ViewChild, Inject, forwardRef, Input } from "@angular/core";
import { DeepBlueService } from "app/service/deepblue";
import { SelectItem, Dropdown, MultiSelect } from "primeng/primeng";
import { Project, BioSource } from "app/domain/deepblue";
import { IOperation, IRow } from "app/domain/interfaces";
import { ArchwizardModule, WizardComponent } from 'angular-archwizard';
import { AppComponent } from "app/app.component";
import { Router } from "@angular/router";
import { ProgressElement } from "app/service/progresselement";
import { SimilarDatasets } from "app/algorithms/similar-datasets";
import { DeepBlueMiddlewareOverlapEnrichtmentResultItem, DeepBlueMiddlewareRequest, DeepBlueMiddlewareOverlapEnrichtmentResult } from "app/domain/operations";
import { RequestManager } from "../../service/requests-manager";
import { IStatsResult } from "app/service/statistics";
import { Utils } from "app/service/utils";
import { DefaultData } from "../../service/defaultdata";
import { SelectedData } from "app/service/selected-data";

@Component({
  selector: 'overlap-enrichment-wizard',
  templateUrl: './overlap-enrichment-wizard.html'
})
export class OverlapEnrichmentWizard {

  finished: boolean = true;

  background: IOperation;
  selected_datasets = new Array<Object>();
  enrichment_data: Object[][] = new Array<Object[]>();

  enrichment_data_from_server = new Array<IRow[]>();

  columns = DeepBlueMiddlewareOverlapEnrichtmentResultItem.asColumns();

  @ViewChild('wizard') wizard: WizardComponent;

  constructor(@Inject(forwardRef(() => AppComponent)) public app: AppComponent,
    public defaultData: DefaultData,  public selectedData: SelectedData,
    private requestManager: RequestManager, public deepBlueService: DeepBlueService) {
  }

  ngOnInit(): void {
    this.defaultData.TILING_REGIONS_5K().subscribe((data) => this.background = data);
  }

  inWizard($event: any) {
    if (this.finished) {
      this.finished = false;
      this.app.onMenuButtonClick();
    }
  }

  selectBackgroud(event: IOperation) {
    this.background = event;
  }

  selectDatasets(event: Object[]) {
    console.log(event);
    this.selected_datasets = event;
  }

  finishWizard($event: any) {
    setTimeout(() => this.app.onMenuButtonClick());
    this.finished = true;
    this.enrichment_data = [];
    this.enrichment_data_from_server = [];
    this.startEnrichment();
  }

  getDatasetsLabel() {
    return "datasetslabel";
  }

  startEnrichment() {
    const current: IOperation[] = this.selectedData.getStacksTopOperation();

    this.deepBlueService.composedCalculateOverlapsEnrichment(current, this.background.id(), this.selected_datasets)
      .subscribe((request: DeepBlueMiddlewareRequest) => {
        this.requestManager.enqueueRequest(request);
        this.deepBlueService.getComposedResultIterator(request, 'overlaps_enrichment')
          .subscribe((result: DeepBlueMiddlewareOverlapEnrichtmentResult[]) => {
            this.prepare_data(result);
          });
      });
  }


  prepare_data(datum: DeepBlueMiddlewareOverlapEnrichtmentResult[]) {

    this.enrichment_data_from_server = [];

    for (let pos = 0; pos < datum.length; pos++) {
      const data = datum[pos];
      const rows = data.getResults().map((x: DeepBlueMiddlewareOverlapEnrichtmentResultItem) => {
        const row: IRow = {};
        for (let idx = 0; idx < this.columns.length; idx++) {
          const column_name = this.columns[idx].name;
          const v = x.data[column_name];
          row[column_name.toLowerCase().replace(/_/g, '')] = Utils.convert(v, this.columns[idx]['column_type'])
        }
        return row;
      });

      rows.sort((a: IRow, b: IRow) => a['meanrank'] - b['meanrank']);

      this.enrichment_data_from_server.push(rows);
    }

    this.filter_enrichment_data(null);
  }


  filter_enrichment_data($event: any) {
    const newResults = [];
    for (let idx = 0; idx < this.enrichment_data_from_server.length; idx++) {
      //const x = this.filter_enrichment_datei(this.enrichment_data_from_server[idx]);
      const x = this.enrichment_data_from_server[idx];
      newResults.push(x);
    }

    this.enrichment_data = newResults;
  }


  wizardClassLength(): string {
    if (this.finished) {
      return "ui-g-12"
    }
    return "ui-g-10";
  }

}