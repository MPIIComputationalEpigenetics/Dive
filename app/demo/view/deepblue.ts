import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { Annotation, Genome } from '../domain/deepblue'

import { DeepBlueService } from '../service/deepblue'


@Component({
    selector: 'list-annotations',
    template: `
        <ul>
            <li *ngFor="let annotation of annotations">{{ annotation.name }}</li>
        </ul>
        `
})
export class AnnotationListComponent {
    errorMessage: string;
    annotations: Annotation[];
    genomeSubscription: Subscription;

    constructor (private deepBlueService: DeepBlueService) {
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(
            genome => {
                this.deepBlueService.getAnnotations(genome)
                    .subscribe(
                        annotations => this.annotations = annotations,
                        error => this.errorMessage = <any>error);
        });      
    }
             
    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }  
}


@Component({
    selector: 'genome-selector',
    templateUrl: 'app/demo/view/genome.selector.html'
})
export class GenomeSelectorComponent implements OnInit {

    errorMessage: string;
    selectGenomes: Genome[];

    constructor (private deepBlueService: DeepBlueService) {}

    ngOnInit() {         
        this.deepBlueService.getGenomes()
            .subscribe(
                genomes => {                    
                    this.selectGenomes = genomes;
                    this.deepBlueService.setGenome(genomes[0]);
                },
                error => this.errorMessage = <any>error
            );
    }

    changeGenome(event, genome) {
      this.deepBlueService.setGenome(genome);
    }

    getStyle(genome) : string {
      if (genome.id == this.deepBlueService.getGenome().id) {
        return "check circle";
      } else {
        return "alarm on";
      }
    }
}
