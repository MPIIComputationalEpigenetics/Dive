import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { DeepBlueService } from "app/service/deepblue";
import { IOperation } from 'app/domain/interfaces';
import { Router } from '@angular/router';

@Component({
    templateUrl: './data-selection-main.html',
    selector: 'data-selection-main',
})
export class DataSelectionMainComponent {

    constructor(private deepBlueService: DeepBlueService, private router: Router) { }

    visibleSidebar2 = false;

    @Output() queryIdSelected = new EventEmitter();

    selectQuery(event: IOperation) {
        this.queryIdSelected.emit(event);
    }
}