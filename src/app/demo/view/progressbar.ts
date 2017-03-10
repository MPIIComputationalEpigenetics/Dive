import { ProgressElement } from '../service/progresselement';
import {
    Component,
    ViewChild,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'data-load-progress-bar',
    template: `
        <p-progressBar *ngIf="progress_value > -1 && progress_value < 100" [value]="progress_value" [showValue]="true"></p-progressBar>
    `
})
export class DataLoadProgressBar {
    progress_value: number = -1;

    constructor(public progresseelement: ProgressElement) {
        this.progresseelement.progressValueValue$.subscribe((actualValue: number) => this.progress_value = actualValue);
    }
}
