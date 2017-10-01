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
import { IMenu } from 'app/domain/interfaces';

@Component({
    selector: 'app-data-info-box',
    template: `
        <div class="card card-w-title" style="word-wrap: break-word">
            <h2>Data overlapping with {{ getStackName() }}</h2>

            <li *ngFor="let result of results">
                {{ result.getFilterName() }} - {{ result.getCount() }}
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
        this.dataSelectedSubscription = deepBlueService.dataInfoSelectedValue$.subscribe((data: any) => {
            this.biosource = data['biosource'];
            this.value = data['value'];
            this.results = data['results']
                .sort((a: DeepBlueMiddlewareOverlapResult, b: DeepBlueMiddlewareOverlapResult) => a.getCount() - b.getCount());

            console.log(this.results);
        });
    }

    filterOverlapping(result: DeepBlueMiddlewareOverlapResult) {
        this.selectedData.activeStackSubject.getValue().overlap(result.toDeepBlueOperation());
    }

    filterNonOverlapping(result: DeepBlueMiddlewareOverlapResult) {
        this.selectedData.activeStackSubject.getValue().non_overlap(result.toDeepBlueOperation());
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
            `,
})
export class DiveStatus {
    menus: IMenu[] = [];
    constructor(private deepBlueService: DeepBlueService, private menuService: MenuService) {
        this.menus = [
            new GenomeSelectorMenu(this.deepBlueService, this.menuService),
            new HistoneExperimentsMenu(this.deepBlueService, this.menuService),
            new CSSExperimentsMenu(this.deepBlueService, this.menuService)
        ];

    }
}


// Building Menu Items with Genome names
// TODO: These menu component must be moved to a 'Dive main component', since it is not a visual component anymore
class GenomeSelectorMenu implements IMenu {

    errorMessage: string;

    constructor(private deepBlueService: DeepBlueService, private menuService: MenuService) { }

    loadMenu(): any {
        return this.deepBlueService.getGenomes().subscribe(genomes => {
            this.deepBlueService.setGenome(genomes[0]);

            for (let genome of genomes) {
                this.menuService.includeItem('genomes', genome.name, 'fiber_manual_record',
                    (event: any) => { this.selectItem(genome) },
                    ['/'], /* router link */
                    null /* url */
                );
            }
            return true;
        },
            error => this.errorMessage = <any>error
        );
    }

    selectItem(genome: Genome) {
        this.deepBlueService.setGenome(genome);
    }
}

export class HistoneExperimentsMenu implements IMenu {
    errorMessage: string;
    selectHistones: EpigeneticMark[];
    genomeSubscription: Subscription;

    constructor(private deepBlueService: DeepBlueService, private menuService: MenuService) { }

    loadMenu(): any {
        this.genomeSubscription = this.deepBlueService.genomeValue$.subscribe(genome => {
            if (genome === null) {
                return;
            }
            this.deepBlueService.getHistones().subscribe(histones => {
                this.menuService.clean('histones');
                for (let histone of histones) {

                    this.menuService.includeItem('histones', histone.name, 'fiber_manual_record',
                        (event: any) => this.selectItem(histone),
                        ['/histonemark'], /* router link */
                        null /* url */
                    );
                }
            },
                error => this.errorMessage = <any>error);
        });
    }

    selectItem(histone: EpigeneticMark) {
        this.deepBlueService.setEpigeneticMark(histone);
    }
}

export class CSSExperimentsMenu implements IMenu {
    errorMessage: string;
    selectHistones: EpigeneticMark[];
    genomeSubscription: Subscription;

    constructor(private deepBlueService: DeepBlueService, private menuService: MenuService) { }

    loadMenu() {
        this.genomeSubscription = this.deepBlueService.genomeValue$.subscribe(genome => {
            if (genome === null) {
                return;
            }
            this.deepBlueService.getChromatinStateSegments().subscribe((csss: string[]) => {
                this.menuService.clean('css');
                for (let css of csss) {
                    this.menuService.includeItem('css', css[1], 'fiber_manual_record',
                        (event: any) => { this.selectItem(css[0]) },
                        ['/chromatin_states'], /* router link */
                        null /* url */
                    );
                }
            });
        },
            error => this.errorMessage = <any>error
        );
    }

    selectItem(css: string) {
        this.deepBlueService.setEpigeneticMark(new EpigeneticMark(["Chromatin State Segmentation", css]));
    }
}

///

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
                                    {{ data.op.dataName() }} ({{ data.count }})
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
    constructor(public selectedData: SelectedData) { }
}

