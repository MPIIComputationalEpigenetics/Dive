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
  cutoff = 1;
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
    private router: Router, public progress_element: ProgressElement,
    private selectedData: SelectedData, private requestManager: RequestManager,
    public deepBlueService: DeepBlueService) {
  }

  ngOnInit(): void {
    this.deepBlueService.genomeValue$.subscribe(genome => {
      if (genome === null) {
        return;
      }

      this.updateProjects();

      if (this.selectedData.getActiveCurrentOperation()) {
        this.selectQueryDataSet(this.selectedData.getActiveCurrentOperation());
      } else {
        this.deepBlueService.getAnnotations(genome).subscribe(annotations => {
          for (let annotation of annotations) {
            if (annotation.name.toLowerCase().startsWith('cpg islands')) {
              this.deepBlueService.selectAnnotation(annotation, this.progress_element, 0).subscribe((operation) => {
                this.selectQueryDataSet(operation, true);
              });
            }
          }
        });
      }
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

  inSimilarData($event: any) {
    this.inWizard($event);
    SimilarDatasets.processSimilar(this.selectedQuery, this.reloadData, this, this.deepBlueService, this.requestManager, this.progress_element)
  }


  exitSimilarData($event: any) {
    this.requestManager.cancelAllRequest();
  }

  finishWizard($event: any) {
    setTimeout(() => this.app.onMenuButtonClick());
    this.finished = true;
    this.deepBlueService.setDataToDive(this.selectedQuery);
  }

  startAnalysis($event: any) {
    for (let c of this.selectedComparison) {
      this.selectedData.insertForComparison(c);
    }
    this.router.navigate(['/similarfinder']);
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

    if (!notJump) {
      this.wizard.navigation.goToNextStep();
    }
  }

  reloadData(_self: DataSelectionWizard, datum: DeepBlueMiddlewareOverlapEnrichtmentResultItem[]) {
    _self.enrichmentData = datum;
    SimilarDatasets.sortDatasets(_self.deepBlueService, _self.cutoff, _self.similarOrder, _self.enrichmentData).subscribe((sortedData) => {
      _self.sortedEnrichmentData = sortedData
    })
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
    SimilarDatasets.sortDatasets(this.deepBlueService, this.cutoff, this.similarOrder, this.enrichmentData).subscribe((sortedData) => {
      this.sortedEnrichmentData = sortedData
    })
  }

  getGenomeLabel() {
    if (!this.selectedGenome) {
      return "";
    }
    return this.selectedGenome.name;
  }

  getSimilarBioSources(): string[] {
    let all: string[] = [];

    let selected = this.deepBlueService.selectedBioSources.getValue().map((bs) => bs.name);

    if (!this.sortedEnrichmentData) {
      return all;
    }

    for (let bs of this.sortedEnrichmentData.biosources) {
      let biosource = (<string>bs[0]);
      if (this.filterSimilar(biosource) && selected.indexOf(biosource) < 0) {
        all.push(biosource);
      }
    }
    return all.sort();
  }

  filterSimilar(name: string) {
    if (this.filterSimilarText.length == 0) {
      return true;
    }
    return name.indexOf(this.filterSimilarText) >= 0;
  }


  addBioSource(c: string) {
    this.deepBlueService.getBioSourceByNameObservable(c).subscribe((bs: BioSource) => {
      this.deepBlueService.addSelectedBiosource(bs);
    })
  }

  addAllBioSources() {
    for (let bs of this.getSimilarBioSources()) {
      this.addBioSource(bs);
    }
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

  addComparison(c: IOperation) {
    if (this.selectedComparison.findIndex((op) => op.id().equals(c.id())) < 0) {
      this.selectedComparison.push(c)
    }
    //this.selectedData.insertForComparison(event);
  }

  removeComparison(c: IOperation) {
    let pos = this.selectedComparison.findIndex((op) => op.id().equals(c.id()));
    this.selectedComparison.splice(pos, 1);
  }

}