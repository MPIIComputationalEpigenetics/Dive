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
        this.deepBlueService.setDataToDive(this.selected_data);
        this.deepBlueService.composedCalculateFastsEnrichment(this.selected_data).subscribe((ss) => console.log(ss));
    }

    selectAnnotationForComparison(selectedAnnotation: any) {
        this.selectedData.insertForComparison(selectedAnnotation);
    }
}