import { MenuService } from '../service/menu';
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

import {
    Annotation,
    EpigeneticMark,
    Experiment,
    FullMetadata,
    Genome,
    IdName,
} from '../domain/deepblue';

import { DataStack, DataStackItem } from '../service/datastack';
import { DataCache, DeepBlueService, MultiKeyDataCache } from '../service/deepblue';


@Component({
    selector: 'data-info-box',
    template: `
        <div class="card card-w-title" style="word-wrap: break-word">
            <h2>Data information</h2>
            {{ data.name }}
            {{ data     }}

            <button pButton type="button" (click)="filterOverlapping()" label="Filter overlapping"></button>
            <button pButton type="button" (click)="filterNonOverlapping()" label="Filter not-overlapping"></button>
        </div>
    `
})
export class DataInfoBox {
    dataSelectedSubscription: Subscription;
    data: IdName = null;

    constructor(private deepBlueService: DeepBlueService, private dataStack: DataStack) {
        this.dataSelectedSubscription = deepBlueService.dataInfoSelectedValue$.subscribe((data: any) => {
            this.data = data || {};
        });
    }

    filterOverlapping() {
        console.log("filter overlapping");
        this.dataStack.overlap(this.data);
    }

    filterNonOverlapping() {
        console.log("filter non overlapping");
        this.dataStack.non_overlap(this.data);
    }
}

@Component({
    selector: 'data-stack',
    template: `
    <br/><br/>
    <div class="dashboard">
    <div *ngIf="dataStack.getData().length > 0" class="ui-g-12 ui-md-12" style="word-wrap: break-word">
        <p-panel [style]="{'height':'100%'}">

            <div class="activity-header dashboard">
                <div class="ui-g">
                    <div class="ui-g-10">
                        <div style="font-weight:bold" class="description">{{ dataStack.getData()[0].op.data.name }}</div>
                        <p class="count"> {{ dataStack.getData()[0].count }} regions</p>
                    </div>
                    <div class="ui-g-2 button-change">
                        <button type="button" icon="ui-icon-blur-on" pButton (click)="removeData($event, dataStack.getData()[0])"></button>
                    </div>
                </div>
            </div>

            <ul class="activity-list">
                <li *ngFor="let data of dataStack.getData() | slice:1" (click)="removeData($event, data)">

                    <div class="ui-g">
                        <div class="ui-g-10">
                            <div class="description">{{ data.description }}</div>
                            <p class="count"> {{data.count}} regions <p>
                        </div>

                        <div class="ui-g-2 button-change">
                            <button class="red-btn" type="button" icon="ui-icon-remove" pButton (click)="removeData($event, data)"></button>
                        </div>
                    </div>

                </li>
            </ul>
        </p-panel>
    </div>
</div>
`

})
export class DataStackView {

    constructor(private deepBlueService: DeepBlueService, private dataStack: DataStack) { }

    removeData(event, data) {
        this.dataStack.remove(data);
    }
}


@Component({
    selector: 'dive-menu',
    template: `
            <filtering></filtering>
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

                    if (l.label.toLowerCase().startsWith("blueprint")) {
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

@Component({
    selector: 'histone-mark-selector',
    templateUrl: './histones.selector.html'
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
// TODO: This component must be moved to a 'Dive main component', since it is not a visual component anymore
@Component({
    selector: 'genome-selector',
    template: ''
})
export class GenomeSelectorComponent implements OnInit {

    errorMessage: string;

    constructor(private deepBlueService: DeepBlueService, private menuService: MenuService) { }

    ngOnInit() {
        this.deepBlueService.getGenomes()
            .subscribe(genomes => {
                this.deepBlueService.setGenome(genomes[0]);

                for (let genome of genomes) {
                    this.menuService.includeItem('genomes', genome.name, 'fiber_manual_record',
                        (event) => {this.changeGenome(genome)},
                        null, /* router link */
                        null /* url */
                    );
                }
            },
            error => this.errorMessage = <any>error
            );
    }

    changeGenome(genome) {
        this.deepBlueService.setGenome(genome);
    }
}
