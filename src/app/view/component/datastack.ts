import { Component } from '@angular/core';

import { SelectedData } from 'app/service/selecteddata';
import { DeepBlueService } from 'app/service/deepblue';
import { DataStack, DataStackItems } from 'app/service/datastack';

@Component({
    selector: 'app-data-stack',
    template: `

    <div class="dashboard">


        <div *ngIf="selectedData.getActiveData().length > 0" class="ui-g-12 ui-md-12" style="word-wrap: break-word" [style]="{'height':'100%'}">
            <div class="activity-header dashboard">
                <div class="ui-g">
                    <div class="ui-g-2">
                        <button type="button" pButton
                            icon="ui-icon-blur-on"
                            [style.background]="actualStack.getColor()"
                            (click)="showSidebar = true">
                        </button>
                    </div>

                    <p-sidebar [(visible)]="showSidebar" position="top" [baseZIndex]="20000" styleClass="ui-sidebar-md" [appendTo]="'body'">
                        <h1>{{ actualStack.getInitialOperation().text() }}<p-colorPicker [(ngModel)]="actualStack.color_array" format="rgb"></p-colorPicker></h1>


                        {{ selectedData.getActiveCurrentOperation().data().name() }}


                        <pre>{{ preview }}</pre>

                    </p-sidebar>

                    <div class="ui-g-8">
                        <div style="font-weight:bold" class="description">{{ actualStack.getInitialOperation().text() }}</div>
                    </div>
                </div>
                <p class="count"> {{ selectedData.getActiveData()[0].count }} regions</p>
            </div>

            <ul class="activity-list">
                <li *ngFor="let data of selectedData.getActiveData() | slice:1">
                    <div class="ui-g">
                        <div class="ui-g-10">
                            <div class="description">{{ data.op.text() }}</div>
                            <p class="count"> {{data.count}} regions <p>
                        </div>

                        <div class="ui-g-2 button-change">
                            <button class="red-btn" type="button" icon="ui-icon-remove" pButton (click)="infoData($event, data)"></button>
                        </div>

                        <div class="ui-g-2 button-change">
                            <button class="red-btn" type="button" icon="ui-icon-bookmark-border" pButton
                                (click)="saveData($event, data)"></button>
                        </div>
                    </div>

                </li>
            </ul>
        </div>
    </div>
`
})
export class DataStackViewComponent {

    actualStack: DataStack;
    showSidebar = false;
    preview = "";

    constructor(public deepBlueService: DeepBlueService, public selectedData: SelectedData) {
        this.selectedData.activeStackValue$.subscribe((active: DataStack) => {
            if (!active) {
                return;
            }
            this.actualStack = active;

            this.actualStack.getStackValueObserver().subscribe((dataStackItems) => {
                if (dataStackItems != null) {
                    console.log(this.actualStack.getInitialOperation().mainOperation().data().name());
                    this.deepBlueService.previewExperiment(this.actualStack.getInitialOperation().mainOperation().data().name()).subscribe((prv) => {
                        this.preview = prv;
                    });
                }
            });
        });
    }

    infoData(event: any, data: any) {
        debugger;
        //this.selectedData.activeStackSubject.getValue().remove(data);
    }

    saveData(event: any, data: any) {
        this.selectedData.saveActiveStack();
    }
}


