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


@Component({
  selector: 'navegation-menu',
  template: `
  <p-toolbar>
    <div *ngIf="!disablePrevious" class="ui-toolbar-group-left">
      <button pButton type="button" awPreviousStep label="Back" icon="ui-icon-arrow-back"></button>
    </div>

    <div *ngIf="!disableNext" class="ui-toolbar-group-right">
      <button pButton type="button" awNextStep label="Next" icon="ui-icon-arrow-forward"></button>
    </div>
  </p-toolbar>`
})
export class NavegationMenu {

  @Input() disablePrevious = false;
  @Input() disableNext = false;
}

@Component({
  selector: 'data-selection-wizard',
  templateUrl: './data-selection-wizard.html'
})
export class DataSelectionWizard {

  finished: boolean = true;
  genomeItems: SelectItem[] = [];
  selectedGenome: any = null;

  projectItems: SelectItem[] = [];
  selectedProjects: Object[] = [];
  defaultSelectProjects = 'Select the Projects';

  selectedQuery: IOperation = null;

  similarOrder = "desc";
  cutoff = 5;
  filterSimilarText = "";
  enrichmentData: DeepBlueMiddlewareOverlapEnrichtmentResultItem[];
  sortedEnrichmentData: {
    "all": DeepBlueMiddlewareOverlapEnrichtmentResultItem[];
    "biosources": (string | IStatsResult)[][];
    "epigenetic_marks": (string | IStatsResult)[][];
  };

  selectedComparison: IOperation[] = [];

  @ViewChild('wizard') wizard: WizardComponent;
  @ViewChild('genomesDropdown') genomesDropdown: Dropdown;
  @ViewChild('multiselect') multiselect: MultiSelect;


  constructor(@Inject(forwardRef(() => AppComponent)) public app: AppComponent,
    private router: Router, private progress_element: ProgressElement,
    private requestManager: RequestManager, public deepBlueService: DeepBlueService) {
  }

  ngOnInit(): void {
    this.deepBlueService.genomeValue$.subscribe(genome => {
      if (genome === null) {
        return;
      }

      this.updateProjects();

      this.deepBlueService.getAnnotations(genome).subscribe(annotations => {
        for (let annotation of annotations) {
          if (annotation.name.toLowerCase().startsWith('cpg islands')) {
            this.deepBlueService.selectAnnotation(annotation, this.progress_element, 0).subscribe((operation) => {
              this.selectQueryDataSet(operation, true);
            });
          }
        }
      });
    });

    this.deepBlueService.getGenomes().subscribe(genomes => {
      this.deepBlueService.setGenome(genomes[0]);

      for (let genome of genomes) {
        let item = { label: genome.name, value: genome };
        this.genomeItems.push(item);
        if (!this.selectedGenome) {
          this.genomesDropdown.selectItem(null, item);
        }
      }
    });
  }

  inWizard($event: any) {
    if (this.finished) {
      this.finished = false;
      setTimeout(() => this.app.onMenuButtonClick());
    }
  }

  finishWizard($event: any) {
    setTimeout(() => this.app.onMenuButtonClick());
    this.finished = true;
    this.deepBlueService.setDataToDive(this.selectedQuery);
  }

  startAnalysis($event: any) {
    this.router.navigate(['/similarfinder']);
  }

  hasQuery($event: any) {
    debugger;
  }

  updateProjects() {
    this.deepBlueService.listProjects().subscribe((projects) => {
      this.projectItems = [];
      this.selectedProjects = [];
      for (let project of projects) {
        let item = { label: project.name, value: project };
        this.projectItems.push(item);
        this.selectedProjects.push(item.value);
      }
      this.selectProjects({ value: projects });
      this.multiselect.updateLabel();
    })
  }

  selectGenome($event: any) {
    this.deepBlueService.setGenome($event.value);
  }

  selectProjects($event: any) {
    this.deepBlueService.setProjects($event.value);
  }

  selectQueryDataSet($event: any, notJump?: boolean) {
    this.selectedQuery = $event;
    SimilarDatasets.processSimilar(this.selectedQuery, this.reloadData, this, this.deepBlueService, this.requestManager, this.progress_element)

    if (!notJump) {
      this.wizard.navigation.goToNextStep();
    }

  }

  reloadData(_self: DataSelectionWizard, datum: DeepBlueMiddlewareOverlapEnrichtmentResultItem[]) {
    _self.enrichmentData = datum;
    _self.sortedEnrichmentData = SimilarDatasets.sortDatasets(_self.cutoff, _self.similarOrder, _self.enrichmentData)
  }

  changeSearch($event: any, direction: string) {
    if (direction == 'more') {
      this.cutoff -= 5;
      if (this.cutoff <= 0) {
        this.cutoff = 1;
      }
    } else {
      this.cutoff += 5;
      if (this.cutoff > 100) {
        this.cutoff = 100;
      }
    }
    this.updateSimilarList();
  }

  updateSimilarList() {
    this.sortedEnrichmentData = SimilarDatasets.sortDatasets(this.cutoff, this.similarOrder, this.enrichmentData)
  }

  getGenomeLabel() {
    if (!this.selectedGenome) {
      return "";
    }
    return this.selectedGenome.name;
  }

  getSimilarBioSources(): string[] {
    let all: string[] = [];

    if (!this.sortedEnrichmentData) {
      return all;
    }

    for (let bs of this.sortedEnrichmentData.biosources) {
      if (this.filterSimilar(<string>bs[0])) {
        all.push(<string>bs[0]);
      }
    }
    return all.sort();
  }

  filterSimilar(name: string) {
    if (this.filterSimilarText.toLowerCase().trim().length == 0) {
      return true;
    }
    name = name.toLowerCase();
    return name.indexOf(this.filterSimilarText.toLowerCase()) >= 0;
  }

  addBioSource(c: string) {
    this.deepBlueService.getBioSourceByNameObservable(c).subscribe((bs: BioSource) => {
      this.deepBlueService.addSelectedBiosource(bs);
    })
  }

  removeBioSource(c: string) {
    this.deepBlueService.getBioSourceByNameObservable(c).subscribe((bs: BioSource) => {
      this.deepBlueService.removeSelectedBiosource(bs);
    })
  }

  getSelectedBioSources(): string[] {
    return this.deepBlueService.selectedBioSources.getValue().map((x: BioSource) => x.name)
  }

  getProjectsLabel() {
    if (this.selectedProjects.length) {
      return this.selectedProjects.map((project: Project) => project.name);
    }
    return "";
  }

  getQueryLabel() {
    if (!this.selectedQuery) {
      return "";
    }
    return this.selectedQuery.text();
  }

  wizardClassLength(): string {
    if (this.finished) {
      return "ui-g-12"
    }
    return "ui-g-10";
  }

}