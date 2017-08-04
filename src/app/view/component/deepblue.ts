import { DeepBlueMiddlewareOverlapResult } from '../../domain/operations';
import { Component, ViewChild, OnInit, Input, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { MenuItem } from 'primeng/primeng';
import { Dropdown } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';

import { Annotation } from 'app/domain/deepblue';
import { EpigeneticMark } from 'app/domain/deepblue';
import { Experiment } from 'app/domain/deepblue';
import { FullMetadata } from 'app/domain/deepblue';
import { Genome } from 'app/domain/deepblue';
import { IdName } from 'app/domain/deepblue';

import { StackValue } from 'app/domain/operations';
import { MenuService } from 'app/service/menu';

import { DataCache } from 'app/service/deepblue';
import { DeepBlueService } from 'app/service/deepblue';
import { MultiKeyDataCache } from 'app/service/deepblue';
import { SelectedData } from 'app/service/selecteddata';
import { DataStack } from 'app/service/datastack';

@Component({
    selector: 'app-data-info-box',
    template: `
        <div class="card card-w-title" style="word-wrap: break-word">
            <h2>Data overlapping with {{ getStackName() }}</h2>

            <li *ngFor="let result of results">
                {{ result.filter_name }} - {{ result.count }}
            <p><button pButton type="button" (click)="filterOverlapping(result)" label="Filter overlapping"></button>
            <p><button pButton type="button" (click)="filterNonOverlapping(result)" label="Filter not-overlapping"></button>
            </li>
        </div>
    `
})
export class DataInfoBoxComponent implements OnDestroy {
    dataSelectedSubscription: Subscription;

    biosource: string = null;
    value: Object = null;
    results: DeepBlueMiddlewareOverlapResult[] = [];

    constructor(private deepBlueService: DeepBlueService, private selectedData: SelectedData) {
        this.dataSelectedSubscription = deepBlueService.dataInfoSelectedValue$.subscribe((data: Object) => {
            this.biosource = data['biosource'];
            this.value = data['value'];
            this.results = data['results']
                .sort((a: DeepBlueMiddlewareOverlapResult, b: DeepBlueMiddlewareOverlapResult) => a.getCount() - b.getCount());

            console.log(this.results);
        });
    }

    filterOverlapping(result: DeepBlueMiddlewareOverlapResult) {
        this.selectedData.activeStackSubject.getValue().overlap(result.filterToDeepBlueOperation());
    }

    filterNonOverlapping(result: DeepBlueMiddlewareOverlapResult) {
        this.selectedData.activeStackSubject.getValue().non_overlap(result.filterToDeepBlueOperation());
    }

    getStackName(): string {
        return this.biosource;
    }

    ngOnDestroy() {
        this.dataSelectedSubscription.unsubscribe();
    }

}


@Component({
    selector: 'dive-menu',
    template: `
            <filtering></filtering>
            <genome-selector></genome-selector>
            <histone-mark-selector></histone-mark-selector>
            <css-selector></css-selector>
            `,
})
export class DiveStatus {
    constructor(private deepBlueService: DeepBlueService) { }
}


@Component({
    selector: 'histone-mark-selector',
    template: ''
})
export class HistoneExperimentsMenu implements OnDestroy {
    errorMessage: string;
    selectHistones: EpigeneticMark[];
    genomeSubscription: Subscription;

    constructor(private deepBlueService: DeepBlueService, private menuService: MenuService) {
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
            if (!(genome.id)) {
                return;
            }
            this.deepBlueService.getHistones().subscribe(histones => {
                this.menuService.clean('histones');
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
    <p-overlayPanel #op [dismissable]="true" [showCloseIcon]="true" appendTo="body">
        <p-panel [style]="{'width':'500px'}">
            <p-header>
                <div class="ui-helper-clearfix">
                    <span class="ui-panel-title" style="font-size:16px;display:inline-block;margin-top:2px">{{ dataStack.name() }}</span>
                    <p-splitButton [style]="{'float':'right'}" label="Remove" icon="fa-close" (onClick)="remove()" [model]="items"></p-splitButton>

                    <!--
                    <input readonly [(colorPicker)]="dataStack.color"
                            [style.float]="'right'"
                            [style.background]="dataStack.color"
                            style="height: 38px; width: 100px; border: 0px; padding: 3px;"/>
                    -->
                </div>
            </p-header>
            <div class="dashboard">
                <ul class="activity-list" style="background: darkcyan">
                    <li *ngFor="let data of dataStack._data">
                        <div class="ui-g">
                            <div class="ui-g-10">
                                <p>
                                    {{ data.what }}
                                    {{ data.description }}
                                    {{ data.op.data.name }} ({{ data.count }})
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </p-panel>
    </p-overlayPanel>

    <button #bt pButton type="button" [style.background]="dataStack.color" icon="ui-icon-dehaze"
            label="{{ dataStack.name() }}"
            (click)="op.toggle($event)">
    </button>
    `

})
export class SelectedDataButton implements OnInit {

    @Input() dataStack: DataStack;
    items: MenuItem[];

    constructor(private selectedData: SelectedData) {
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Remove', icon: 'fa-close', command: () => this.remove()
            },
            {
                label: 'Save', icon: 'fa-close', command: () => this.save()
            }
        ];
    }

    save() {
        console.log('save this stack');
    }

    remove() {
        this.selectedData.removeStack(this.dataStack);
        console.log('remove this stack');
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

// Building Menu Items with Genome names
// TODO: This component must be moved to a 'Dive main component', since it is not a visual component anymore

@Component({
    selector: 'css-selector',
    template: ''
})
export class CSSExperimentsMenu implements OnInit, OnDestroy {
    errorMessage: string;
    selectHistones: EpigeneticMark[];
    genomeSubscription: Subscription;

    constructor(private deepBlueService: DeepBlueService, private menuService: MenuService) { }

    ngOnInit() {
        this.genomeSubscription = this.deepBlueService.genomeValue$.subscribe(genome => {
            if (!(genome.id)) {
                return;
            }
            this.deepBlueService.getChromatinStateSegments().subscribe((csss: string[]) => {
                this.menuService.clean('css');
                for (let css of csss) {
                    this.menuService.includeItem('css', css[1], 'fiber_manual_record',
                        (event) => { this.changeCss(css[0]) },
                        ['/chromatin_states'], /* router link */
                        null /* url */
                    );
                }
            });
        },
            error => this.errorMessage = <any>error
        );
    }

    changeCss(css) {
        this.deepBlueService.setEpigeneticMark(new EpigeneticMark(["Chromatin State Segmentation", css]));
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}
