import { Component, OnInit } from '@angular/core';
import { Annotation, Genome } from '../domain/deepblue'

import { DeepBlueService } from '../service/deepblue'

import { SelectItem } from 'primeng/primeng';


@Component({
    selector: 'list-annotations',
    providers: [DeepBlueService],
    template: `
        <ul>
            <li *ngFor="let annotation of annotations">{{ annotation.name }}</li>
        </ul>
        `
})
export class AnnotationListComponent implements OnInit {
    errorMessage: string;
    annotations: Annotation[];

    constructor (private deepBlueService: DeepBlueService) {}

    ngOnInit() {
        this.deepBlueService.getAnnotations()
            .subscribe(
                annotations => this.annotations = annotations,
                error => this.errorMessage = <any>error
            );
    }           
}


@Component({
    selector: 'genome-selector',
    providers: [DeepBlueService],
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
                    this.deepBlueService.selectedGenome = this.selectGenomes[0];
                },
                error => this.errorMessage = <any>error
            );
    }

    changeGenome(event, genome) {
      this.deepBlueService.selectedGenome = genome;
    }

    getStyle(genome) {
      if (genome.id == this.deepBlueService.selectedGenome.id) {
        return "check circle";
      } else {
        return "alarm on";
      }
    }
}
