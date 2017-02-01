import { DataStack, DataStackItem } from '../service/datastack';
import { MessagesDemo } from './messagesdemo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable'

import { MultiSelect } from 'primeng/primeng';


import { BioSource, EpigeneticMark, FullExperiment, Genome, IdName } from '../domain/deepblue';

import { DataLoadProgressBar } from '../view/deepblue';

import { DeepBlueService } from '../service/deepblue';

import {
    DeepBlueOperation,
    DeepBlueResult
} from '../domain/operations';


class Regions {

}

@Component({
    selector: 'regions-screen',
    templateUrl: 'app/demo/view/regions.screen.html'
})
export class RegionsScreen {

    //regions: Regions;
    topStackSubscription: Subscription;

    constructor(private deepBlueService: DeepBlueService, private dataStack: DataStack) {
        this.topStackSubscription = this.dataStack.topStackValue$.subscribe((dataStackItem : DataStackItem) => this.processRegions())
        this.processRegions();
    }

    processRegions() {
        let actualData: DeepBlueOperation = this.dataStack.getCurrentOperation();

        // TODO: check for null

        this.deepBlueService.getInfo(actualData.data.id).subscribe((info: Object) => {
            debugger;
        });

        debugger;
    }

    ngOnDestroy() {
        this.topStackSubscription.unsubscribe();
    }
}