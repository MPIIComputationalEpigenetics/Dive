import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/primeng';
import { DeepBlueService } from "app/service/deepblue";
import { SelectedData } from "app/service/selecteddata";
import { IOperation } from 'app/domain/interfaces';
import { ProgressElement } from 'app/service/progresselement';

@Component({
    templateUrl: './data-selection.html'
})
export class DataSelectionScreen {

    selected_data: IOperation;

    constructor(private deepBlueService: DeepBlueService, public progress_element: ProgressElement,
        private selectedData: SelectedData) {
    }

    selectQuery(event: IOperation) {
        this.selected_data = event;
        this.deepBlueService.setDataToDive(this.selected_data);
        this.deepBlueService.composedCalculateFastsEnrichment(this.selected_data).subscribe((request_id) =>

            this.deepBlueService.getComposedResultIterator(request_id, this.progress_element, 'overlaps_enrichment', this.reloadData, this)
                .subscribe((result: Object[]) => {
                    const end = new Date().getTime();
                    // Now calculate and output the difference
                    console.log(result);
                })
        )
    }

    reloadData(_self: DataSelectionScreen, datum: any) {
        console.log("RELOADING DATA: ", datum.length, datum);
    }

    selectAnnotationForComparison(selectedAnnotation: any) {
        this.selectedData.insertForComparison(selectedAnnotation);
    }
}