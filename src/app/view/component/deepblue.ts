import { Component, ViewChild, OnInit, Input, OnDestroy, Output, AfterViewInit } from '@angular/core';

import { FullExperiment } from 'app/domain/deepblue';

import { DeepBlueOperation } from 'app/domain/operations';

import { DeepBlueService } from 'app/service/deepblue';
import { DataStack } from 'app/data-structures/data-stack/data-stack';
import { SelectedData } from 'app/service/selected-data';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
    selector: 'selected-data-button',
    template: `
    <p-sidebar [(visible)]="showSidebar" [appendTo]="'body'" [fullScreen]="true">
        <div class="ui-helper-clearfix">
            <span class="ui-panel-title" style="font-size:16px;display:inline-block;margin-top:2px">{{ _dataStack.name() }}</span>
            <p-splitButton [style]="{'float':'right'}" label="Use as main data" (onClick)="moveToMain()" [model]="items"></p-splitButton>
            <p-colorPicker [(ngModel)]="_dataStack.color_array" format="rgb"></p-colorPicker>
        </div>

        <div class="ui-g">
            <div class="ui-g-8">
                <p-scrollPanel [style]="{height: '95%', width: '100%', padding: '2px'}">
                    <query-flow [queryId]="_dataStack?.getCurrentOperation()?.id()?.id"></query-flow>
                </p-scrollPanel>
            </div>
            <div class="ui-g-4">
                <h2>Information</h2>

                {{ _dataStack.name() }}
                <p-colorPicker [(ngModel)]="_dataStack.color_array" format="rgb"></p-colorPicker>
                <pre>
                {{ totalRegions }} regions
                {{ fullMetadata?.biosource() }}
                {{ fullMetadata?.epigenetic_mark() }}
                </pre>

            </div>
        </div>
    </p-sidebar>

    <p-overlayPanel #op [dismissable]="true" [showCloseIcon]="true" appendTo="body">
        <pre>
        {{ totalRegions }} regions
        {{ fullMetadata?.biosource() }}
        {{ fullMetadata?.epigenetic_mark() }}
        </pre>

        Click for more information
    </p-overlayPanel>

    <button #bt pButton type="button" [style.background]="_dataStack.getColor()" icon="ui-icon-dehaze"
        (mouseenter)="op.toggle($event)" (mouseleave)="op.toggle($event)" (click)="showSidebar = !showSidebar"
        label="{{ _dataStack.name() }}" >
    </button>
    `

})
export class SelectedDataButton implements OnInit {

    _dataStack: DataStack;
    items: MenuItem[];
    showSidebar = false;
    fullMetadata: FullExperiment = null;
    totalRegions = -1;

    constructor(private deepBlueService: DeepBlueService, private selectedData: SelectedData) {
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
        this.selectedData.removeStack(this._dataStack);
    }

    rename() {
        console.info('save this stack');
    }

    moveToMain() {
        this.selectedData.setActiveStack(this._dataStack);
    }

    @Input() set dataStack(ds: DataStack) {
        this._dataStack = ds;
        this.loadMetadata();
    }

    loadMetadata() {
        this._dataStack.getStackValueObserver().subscribe(() => {
            let op = this._dataStack.getInitialOperation();
            if (!op) {
                return;
            }
            let mainOp = op.mainOperation();
            if ((<DeepBlueOperation>mainOp).command == "select_experiment") {
                let name = mainOp.data().name();
                this.deepBlueService.nameToId(name, "experiments").subscribe((idName) => {
                    console.log(idName);
                    this.deepBlueService.getInfo(idName[0].id).subscribe((metadata) => {
                        this.fullMetadata = metadata as FullExperiment;
                    })
                })
            }
            this.deepBlueService.countRegionsRequest(this._dataStack.getCurrentOperation()).subscribe((total) => {
                this.totalRegions = total.resultAsCount();
            });
        });
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

