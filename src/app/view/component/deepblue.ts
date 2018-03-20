import { Component, ViewChild, OnInit, Input, OnDestroy, Output } from '@angular/core';

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

import { DataCache } from 'app/service/deepblue';
import { DeepBlueService } from 'app/service/deepblue';
import { MultiKeyDataCache } from 'app/service/deepblue';
import { SelectedData } from 'app/service/selecteddata';
import { DataStack } from 'app/service/datastack';
import { EventEmitter } from '@angular/core';


@Component({
    selector: 'selected-data-button',
    template: `

    <p-sidebar [(visible)]="showSidebar" position="top" [baseZIndex]="20000" styleClass="ui-sidebar-lg" [appendTo]="'body'">
        <div class="ui-helper-clearfix">
            <span class="ui-panel-title" style="font-size:16px;display:inline-block;margin-top:2px">{{ dataStack.name() }}</span>
            <p-splitButton [style]="{'float':'right'}" label="Use as main data" (onClick)="moveToMain()" [model]="items"></p-splitButton>
            <p-colorPicker [(ngModel)]="dataStack.color_array" format="rgb"></p-colorPicker>
        </div>

        <div class="ui-g">
            <div class="ui-g-8">
                <p-scrollPanel [style]="{height: '95%', width: '100%', padding: '2px'}">
                    <query-flow [queryId]="dataStack?.getCurrentOperation()?.id()?.id"></query-flow>
                </p-scrollPanel>
            </div>
        </div>
    </p-sidebar>

    <button #bt pButton type="button" [style.background]="dataStack.getColor()" icon="ui-icon-dehaze"
        label="{{ dataStack.name() }}" (click)="showSidebar = !showSidebar">
    </button>
    `

})
export class SelectedDataButton implements OnInit {

    @Input() dataStack: DataStack;
    items: MenuItem[];
    showSidebar = false;

    constructor(private selectedData: SelectedData) {
    }

    ngOnInit() {
        this.items = [
            {
                label: 'Use as main data', command: () => this.moveToMain()
            },
            {
                label: 'Remove', command: () => this.remove()
            },
            {
                label: 'Rename', command: () => this.rename()
            }
        ];
    }

    remove() {
        this.selectedData.removeStack(this.dataStack);
    }

    rename() {
        console.info('save this stack');
    }

    moveToMain() {
        this.selectedData.setActiveStack(this.dataStack);
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

