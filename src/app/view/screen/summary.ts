import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/primeng';
import { DeepBlueService } from "app/service/deepblue";
import { SelectedData } from "app/service/selecteddata";

@Component({
    templateUrl: './summary.html'
})
export class SummaryScreen {

    constructor(private deepBlueService: DeepBlueService, private selectedData: SelectedData) {
    }

    selectAnnotation(selectedAnnotation: any) {
        this.deepBlueService.setAnnotation(selectedAnnotation);
    }

    selectAnnotationForComparison(selectedAnnotation: any) {
        this.selectedData.insertForComparison(selectedAnnotation);
    }
}