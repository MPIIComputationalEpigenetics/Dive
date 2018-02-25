import { ProgressElement } from 'app/service/progresselement';
import {
    Component,
    ViewChild,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'data-load-progress-bar',
    template: `
        <div *ngIf="mode == 'determinate'">
            <p-progressBar *ngIf="progress_value >= 0 && progress_value < 100" [mode]="mode" [value]="progress_value" [showValue]="true"></p-progressBar>
        </div>
        <div *ngIf="mode == 'indeterminate'" class="splash-loader-container" >
            <svg class="splash-loader" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                <circle class="splash-path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
            </svg>
        </div>
    `
})
export class DataLoadProgressBar {

    progress_value: number = -1;
    mode: string = "indeterminate";

    constructor(public progresseelement: ProgressElement) {
        this.progresseelement.progressValueValue$.subscribe((actualValue: number) => {
            this.progress_value = actualValue;
        });

        this.progresseelement.progressModeValue$.subscribe((mode: string) => {
            this.mode = mode;
        })
    }
}
