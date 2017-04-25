import { Component } from '@angular/core';

import { SelectedData } from 'app/service/selecteddata';
import { DeepBlueService } from 'app/service/deepblue';

@Component({
    selector: 'app-data-stack',
    template: `
    <div class="dashboard">
    <div *ngIf="selectedData.getActiveData().length > 0" class="ui-g-12 ui-md-12" style="word-wrap: break-word" [style]="{'height':'100%'}">
            <div class="activity-header dashboard">
                <div class="ui-g">
                    <div class="ui-g-10">
                        <div style="font-weight:bold" class="description">{{ selectedData.getActiveData()[0].op.data.name }}</div>
                        <p class="count"> {{ selectedData.getActiveData()[0].count }} regions</p>
                    </div>
                    <div class="ui-g-2 button-change">
                        <button type="button" icon="ui-icon-blur-on" pButton
                            (click)="removeData($event, selectedData.getActiveData()[0])"></button>
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

    constructor(private deepBlueService: DeepBlueService, private selectedData: SelectedData) { }

    removeData(event, data) {
        this.selectedData.getActiveStack().remove(data);
    }

    saveData(event, data) {
        this.selectedData.saveActiveStack();
    }
}


