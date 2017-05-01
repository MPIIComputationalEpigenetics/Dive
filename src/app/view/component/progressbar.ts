import { ProgressElement } from 'app/service/progresselement';
import {
    Component,
    ViewChild,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'data-load-progress-bar',
    template: `
        <p-progressBar *ngIf="progress_value >= 0 && progress_value < 100" [value]="progress_value" [showValue]="true"></p-progressBar>
    `
})
export class DataLoadProgressBar {
    progress_value: number = -1;

    constructor(public progresseelement: ProgressElement) {
        this.progresseelement.progressValueValue$.subscribe((actualValue: number) => {
            this.progress_value = actualValue;
        });
    }
}
