import { SelectedData } from '../service/selecteddata';
import { Component } from '@angular/core';

import { DeepBlueService } from '../service/deepblue';

@Component({
    selector: 'data-stack',
    template: `
    <br/><br/>
    <div class="dashboard">
    <div *ngIf="selectedData.getActiveStack().getData().length > 0" class="ui-g-12 ui-md-12" style="word-wrap: break-word">
        <p-panel [style]="{'height':'100%'}">

            <div class="activity-header dashboard">
                <div class="ui-g">
                    <div class="ui-g-10">
                        <div style="font-weight:bold" class="description">{{ selectedData.getActiveStack().getData()[0].op.data.name }}</div>
                        <p class="count"> {{ selectedData.getActiveStack().getData()[0].count }} regions</p>
                    </div>
                    <div class="ui-g-2 button-change">
                        <button type="button" icon="ui-icon-blur-on" pButton (click)="removeData($event, selectedData.getActiveStack().getData()[0])"></button>
                    </div>
                </div>
            </div>

            <ul class="activity-list">
                <li *ngFor="let data of selectedData.getActiveStack().getData() | slice:1" (click)="removeData($event, data)">

                    <div class="ui-g">
                        <div class="ui-g-10">
                            <div class="description">{{ data.description }}</div>
                            <p class="count"> {{data.count}} regions <p>
                        </div>

                        <div class="ui-g-2 button-change">
                            <button class="red-btn" type="button" icon="ui-icon-remove" pButton (click)="removeData($event, data)"></button>
                        </div>

                        <div class="ui-g-2 button-change">
                            <button class="red-btn" type="button" icon="ui-icon-bookmart" pButton (click)="selectData($event, data)"></button>
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

    selectData(event, data) {
        console.log('selectData', data);
    }
}

