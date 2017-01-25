import { DataDemo } from './datademo';
import {
    Component,
    ViewChild,
    OnInit,
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import {
    Dropdown,
    SelectItem
} from 'primeng/primeng';

import { IdName, Annotation, EpigeneticMark, Experiment, Genome, ProgressElement } from '../domain/deepblue';

import { DataStack } from '../service/datastack';
import { DeepBlueService } from '../service/deepblue';


@Component({
    selector: 'data-info-box',
    template: `
        <div class="card card-w-title">
            <h2>Data information</h2>
            {{ data.name }}

            <button pButton type="button" (click)="filterOverlapping()" label="Filter overlapping"></button>
            <button pButton type="button" (click)="filterNonOverlapping()" label="Filter overlapping"></button>
            <data-load-progress-bar #progressbar></data-load-progress-bar>
        </div>
    `
})
export class DataInfoBox {
    dataSelectedSubscription: Subscription;
    data: IdName = null;
    @ViewChild('progressbar') progressbar: DataLoadProgressBar;

    constructor(private deepBlueService: DeepBlueService, private dataStack: DataStack) {
        this.dataSelectedSubscription = deepBlueService.dataInfoSelectedValue$.subscribe((data: any) => {
            this.data = data || {};
        });
    }

    filterOverlapping() {
        console.log("filter overlapping");
        this.dataStack.overlap(this.data, this.progressbar);
    }

    filterNonOverlapping() {
        console.log("filter non overlapping");
        this.dataStack.non_overlap(this.data, this.progressbar);
    }
}

@Component({
    selector: 'data-load-progress-bar',
    template: `
        <p-progressBar *ngIf="progress_value > -1 && progress_value < 100" [value]="progress_value" [showValue]="true"></p-progressBar>
    `
})
export class DataLoadProgressBar extends ProgressElement {
    constructor() {
        super()
    }
}

@Component({
    selector: 'data-stack',
    template: `
    <br/><br/>
    <div class="ui-g dashboard">
        <div class="ui-g-12 ui-md-12 ui-lg-12 task-list">
            <p-panel header="Diving into:">
                <ul>
                    <li *ngFor="let data of dataStack.getData() " (click)="removeData($event, data)">
                        <span class="task-name">{{ data.what }}: <b>{{ data.op.data.name }}</b> ({{ data.count }})</span>
                        <i class="material-icons">remove</i>
                    </li>
                </ul>
            </p-panel>
        </div>
    </div>`
})
export class DataStackView {

    constructor(private deepBlueService: DeepBlueService, private dataStack: DataStack) { }

    removeData(event, data) {
        this.dataStack.remove(data);
    }
}


@Component({
    selector: 'dive-status',
    template: `
            <li role="menuitem">
                <a [routerLink]="['/']">
                    <i class="material-icons">dashboard</i>
                    <span>Selected data: {{ deepBlueService.getAnnotation()?.name }}</span>
                </a>
            </li>
            <genome-selector></genome-selector>
            <histone-mark-selector></histone-mark-selector>
            `,
})
export class DiveStatus {
    constructor(private deepBlueService: DeepBlueService) { }
}
@Component({
    selector: 'select-annotation',
    template: `
                <div class="ui-g form-group">
                    <div class="ui-g-12 ui-md-2">
                        <label for="input">Annotation Name</label>
                    </div>
                    <div class="ui-g-12 ui-md-4">
                        <p-dropdown
                            #annotationsDropdown
                            [options]="menuAnnotations"
                            [(ngModel)]="selectedAnnotation"
                            filter="filter"
                            [autoWidth]="false"
                            (onChange)="selectAnnotation($event)"
                        >
                        </p-dropdown>
                    </div>
                </div>
        `})
export class AnnotationListComponent {
    errorMessage: string;
    annotations: Annotation[];
    menuAnnotations: SelectItem[];
    selectedAnnotation: SelectItem;
    genomeSubscription: Subscription;

    @ViewChild('annotationsDropdown') annotationsDropdown: Dropdown

    constructor(private deepBlueService: DeepBlueService) {


        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
                if (genome.id == null || genome.name == "") {
                    return;
                }
                this.deepBlueService.getAnnotations(genome).subscribe(annotations => {
                        if (annotations.length == 0) {
                            return;
                        }
                        this.annotations = annotations;
                        this.menuAnnotations = annotations.map((annotation: Annotation) => {
                            let l = { label: annotation.name, value: annotation };
                            if (l.label.toLowerCase().startsWith("cpg islands")) {
                                this.annotationsDropdown.selectItem(null, l);
                            }

                            return l;
                        });
                    },
                    error => this.errorMessage = <any>error);
            }
        );
    }

    selectAnnotation(event) {
        this.deepBlueService.setAnnotation(event.value);
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}

//

@Component({
    selector: 'histone-mark-selector',
    templateUrl: 'app/demo/view/histones.selector.html'
})
export class HistoneExperimentsMenu {
    errorMessage: string;
    selectHistones: EpigeneticMark[];
    genomeSubscription: Subscription;

    constructor(private deepBlueService: DeepBlueService) {
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
            if (!(genome.id)) {
                return;
            }
            this.deepBlueService.getHistones().subscribe(histones => {
                this.selectHistones = histones;
            },
            error => this.errorMessage = <any>error);
        });
    }

    changeHistone(event, histone) {
        this.deepBlueService.setEpigeneticMark(histone);
    }

    getStyle(histone): string {
        if (histone.id == this.deepBlueService.getEpigeneticMark().id) {
            return "check circle";
        } else {
            return "alarm on";
        }
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}


// Building Menu Items with Genome names

@Component({
    selector: 'genome-selector',
    templateUrl: 'app/demo/view/genome.selector.html'
})
export class GenomeSelectorComponent implements OnInit {

    errorMessage: string;
    selectGenomes: Genome[];

    constructor(private deepBlueService: DeepBlueService) { }

    ngOnInit() {
        this.deepBlueService.getGenomes()
            .subscribe(
            genomes => {
                this.selectGenomes = genomes;
                this.deepBlueService.setGenome(genomes[0]);
            },
            error => this.errorMessage = <any>error
            );
    }

    changeGenome(event, genome) {
        this.deepBlueService.setGenome(genome);
    }

    getStyle(genome): string {
        if (genome.id == this.deepBlueService.getGenome().id) {
            return "check circle";
        } else {
            return "alarm on";
        }
    }
}
