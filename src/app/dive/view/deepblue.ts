import { DataStack } from '../service/datastack';
import { Component, ViewChild, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { Dropdown, SelectItem } from 'primeng/primeng';

import { Annotation, EpigeneticMark, Experiment, FullMetadata, Genome, IdName } from '../domain/deepblue';

import { StackValue } from '../domain/operations';

import { MenuService } from '../service/menu';

import { DataCache, DeepBlueService, MultiKeyDataCache } from '../service/deepblue';
import { SelectedData } from '../service/selecteddata';

@Component({
    selector: 'data-info-box',
    template: `
        <div class="card card-w-title" style="word-wrap: break-word">
            <h2>Data information</h2>

            {{ data.value.data.name }} overlapping with {{ getStackName() }}


            <p><button pButton type="button" (click)="filterOverlapping()" label="Filter overlapping"></button>
            <p><button pButton type="button" (click)="filterNonOverlapping()" label="Filter not-overlapping"></button>
        </div>
    `
})
export class DataInfoBox {
    dataSelectedSubscription: Subscription;
    data: StackValue = null;

    constructor(private deepBlueService: DeepBlueService, private selectedData: SelectedData) {
        this.dataSelectedSubscription = deepBlueService.dataInfoSelectedValue$.subscribe((data: StackValue) => {
            this.data = data;
        });
    }

    filterOverlapping() {
        this.selectedData.getActiveStack().overlap(this.data.getDeepBlueResult().request.operation);
    }

    filterNonOverlapping() {
        this.selectedData.getActiveStack().non_overlap(this.data.getDeepBlueResult().request.operation);
    }

    getStackName(): string {
        return this.data.stack.toString();
    }
}

@Component({
    selector: 'data-stack',
    template: `
    <div class="dashboard">
    <div *ngIf="selectedData.getActiveData().length > 0" class="ui-g-12 ui-md-12" style="word-wrap: break-word">
        <p-panel [style]="{'height':'100%'}">

            <div class="activity-header dashboard">
                <div class="ui-g">
                    <div class="ui-g-10">
                        <div style="font-weight:bold" class="description">{{ selectedData.getActiveData()[0].op.data.name }}</div>
                        <p class="count"> {{ selectedData.getActiveData()[0].count }} regions</p>
                    </div>
                    <div class="ui-g-2 button-change">
                        <button type="button" icon="ui-icon-blur-on" pButton (click)="removeData($event, selectedData.getActiveData()[0])"></button>
                    </div>
                </div>
            </div>

            <ul class="activity-list">
                <li *ngFor="let data of selectedData.getActiveData() | slice:1">
                    <div class="ui-g">
                        <div class="ui-g-10">
                            <div class="description">{{ data.description }}</div>
                            <p class="count"> {{data.count}} regions <p>
                        </div>

                        <div class="ui-g-2 button-change">
                            <button class="red-btn" type="button" icon="ui-icon-remove" pButton (click)="removeData($event, data)"></button>
                        </div>

                        <div class="ui-g-2 button-change">
                            <button class="red-btn" type="button" icon="ui-icon-bookmark-border" pButton (click)="saveData($event, data)"></button>
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

    constructor(private deepBlueService: DeepBlueService, private selectedData: SelectedData) { }

    removeData(event, data) {
        this.selectedData.getActiveStack().remove(data);
    }

    saveData(event, data) {
        debugger;
        this.selectedData.saveActiveStack();
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
                    <div class="ui-g-4 ui-md-2">
                        <label for="input">Annotation Name</label>
                    </div>
                    <div class="ui-g-4 ui-md-2">
                        <p-dropdown
                            #annotationsDropdown
                            [options]="menuAnnotations"
                            [(ngModel)]="selectedAnnotation"
                            filter="filter"
                            [autoWidth]="false"
                        >
                        </p-dropdown>
                    </div>
                    <div class="ui-g-4 ui-md-2">
                        <button pButton type="button" icon="ui-icon-check-circle"
                            label="Select Annotation"
                            (click)="selectAnnotation($event)">
                        </button>
                    </div>
                </div>
        `})
export class AnnotationListComponent {
    errorMessage: string;
    annotations: Annotation[];
    menuAnnotations: SelectItem[];
    selectedAnnotation: Annotation;
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
        debugger;
        this.deepBlueService.setAnnotation(this.selectedAnnotation);
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}

@Component({
    selector: 'histone-mark-selector',
    template: ''
})
export class HistoneExperimentsMenu {
    errorMessage: string;
    selectHistones: EpigeneticMark[];
    genomeSubscription: Subscription;

    constructor(private deepBlueService: DeepBlueService, private menuService: MenuService) {
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
            if (!(genome.id)) {
                return;
            }
            this.deepBlueService.getHistones().subscribe(histones => {
                for (let histone of histones) {
                    this.menuService.includeItem('histones', histone.name, 'fiber_manual_record',
                        (event) => { this.changeHistone(histone) },
                        ['/histonemark'], /* router link */
                        null /* url */
                    );
                }
            },
                error => this.errorMessage = <any>error);
        });
    }

    changeHistone(histone) {
        this.deepBlueService.setEpigeneticMark(histone);
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}

@Component({
    selector: 'selected-data-button',
    template: `
    <button pButton type="button" icon="ui-icon-dehaze"
            label="{{ title() }}"
            (click)="infoStack($event)">
    </button>
    <p-overlayPanel #op>
        {{ stackData }}
    </p-overlayPanel>
    `

})
export class SelectedDataButton {

    @Input() dataStack: DataStack;

    constructor() { }
//(click)="op.toggle($event)">
    infoStack(event) {
        debugger;
        console.log(this.dataStack);
    }

    title() {
        let top = this.dataStack._data[0];
        if (top == undefined) {
            return "(loading..)";
        }
        return top.op.data.name;
    }

}


@Component({
    selector: 'selected-data',
    template: `
                <p-toolbar>
                    <div class="ui-toolbar-group-left">
                        <selected-data-button
                            *ngFor="let ds of selectedData._stacks | slice:1"
                            [dataStack]="ds">
                        </selected-data-button>
                    </div>
                </p-toolbar>

    `
})
export class SelectedDataView {
    constructor(private selectedData: SelectedData) { }
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
        this.deepBlueService.getGenomes().subscribe(genomes => {
            this.deepBlueService.setGenome(genomes[0]);

            for (let genome of genomes) {
                this.menuService.includeItem('genomes', genome.name, 'fiber_manual_record',
                    (event) => { this.changeGenome(genome) },
                    ['/'], /* router link */
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
