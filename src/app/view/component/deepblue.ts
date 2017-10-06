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
                                    {{ data.op.data().name() }} ({{ data.count }})
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

