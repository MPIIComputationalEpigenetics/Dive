import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { IdName, 
         Genome, 
         EpigeneticMark } from '../domain/deepblue'

import { DeepBlueService } from '../service/deepblue'


@Component({
    selector: 'histones-summary',
    templateUrl: 'app/demo/view/histones.screen.html'
})
export class HistonesScreen {
    errorMessage: string;
    experiments: Object[];
    epigeneticMarkSubscription: Subscription;

    constructor (private deepBlueService: DeepBlueService) {
        this.epigeneticMarkSubscription = deepBlueService.epigeneticMarkValue$.subscribe(
            selected_epigenetic_mark => {
                this.deepBlueService.getExperiments(deepBlueService.getGenome(), selected_epigenetic_mark).subscribe(
                    experiments_ids => {                                                                      
                        var ids = experiments_ids.map((e) => e.id); 
                        this.deepBlueService.getInfos(ids).subscribe(
                            full_info => this.experiments = full_info
                        );
                    },
                    error => this.errorMessage = <any>error);
            }
        );
    }           

    ngOnDestroy() {
        this.epigeneticMarkSubscription.unsubscribe();
    }  
}