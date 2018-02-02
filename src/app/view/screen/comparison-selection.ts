import { Component, OnInit, ViewChild } from '@angular/core';
import { DeepBlueService } from "app/service/deepblue";
import { IOperation } from 'app/domain/interfaces';
import { Router } from '@angular/router';
import { SelectedData } from 'app/service/selecteddata';

@Component({
    templateUrl: './comparsion-selection.html'
})
export class ComparisonSelectionScreen {

    constructor(private selectedData: SelectedData) { }

    visibleSidebar2 = false;

    selectQuery(event: IOperation) {
        this.selectedData.insertForComparison(event);
    }
}
