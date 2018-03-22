import { Component, OnDestroy, AfterViewInit, ViewChild, Inject, forwardRef, Input } from "@angular/core";
import { DeepBlueService } from "app/service/deepblue";
import { SelectItem, Dropdown, MultiSelect } from "primeng/primeng";
import { Project, BioSource } from "app/domain/deepblue";
import { IOperation } from "app/domain/interfaces";
import { WizardComponent } from "ng2-archwizard";
import { AppComponent } from "app/app.component";
import { Router } from "@angular/router";
import { ProgressElement } from "app/service/progresselement";
import { SimilarDatasets } from "app/algorithms/similar-datasets";
import { DeepBlueMiddlewareOverlapEnrichtmentResultItem } from "app/domain/operations";
import { RequestManager } from "../../service/requests-manager";
import { IStatsResult } from "app/service/statistics";
import { SelectedData } from "app/service/selecteddata";

@Component({
  selector: 'overlap-enrichment-wizard',
  templateUrl: './overlap-enrichment-wizard.html'
})
export class OverlapEnrichmentWizard {

  finished: boolean = true;
  selected_data: IOperation;
  background: IOperation;

  @ViewChild('wizard') wizard: WizardComponent;

  constructor(@Inject(forwardRef(() => AppComponent)) public app: AppComponent,
    public progress_element: ProgressElement, private selectedData: SelectedData,
    private requestManager: RequestManager, public deepBlueService: DeepBlueService) {
  }

  ngOnInit(): void {
  }

  inWizard($event: any) {
    if (this.finished) {
      this.finished = false;
      setTimeout(() => this.app.onMenuButtonClick());
    }
  }

  selectBackgroud(event: IOperation) {
    this.background = event;
  }

  selectQuery(event: IOperation) {
    this.selected_data = event;
  }

  finishWizard($event: any) {
    setTimeout(() => this.app.onMenuButtonClick());
    this.finished = true;
  }

  getDatasetsLabel() {
    return "datasetslabel";
  }

  startEnrichment() {
    console.log("aaaaa");
  }

  wizardClassLength(): string {
    if (this.finished) {
      return "ui-g-12"
    }
    return "ui-g-10";
  }

}