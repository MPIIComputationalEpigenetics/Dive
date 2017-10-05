import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/primeng';
import { DeepBlueService } from "app/service/deepblue";
import { SelectedData } from "app/service/selecteddata";
import { IOperation } from 'app/domain/interfaces';

@Component({
    templateUrl: './data-selection.html'
})
export class DataSelectionScreen {

    selected_data: IOperation;

    constructor(private deepBlueService: DeepBlueService, private selectedData: SelectedData) {
    }

    selectQuery(event: IOperation) {
        this.selected_data = event;
        console.log(this.selected_data);
        this.selectAnnotation(this.selected_data);
    }

    selectAnnotation(selectedAnnotation: any) {
        this.deepBlueService.setDataToDive(selectedAnnotation);
    }

    selectAnnotationForComparison(selectedAnnotation: any) {
        this.selectedData.insertForComparison(selectedAnnotation);
    }
}