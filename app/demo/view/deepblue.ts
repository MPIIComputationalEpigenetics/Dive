import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { SelectItem } from 'primeng/primeng';

import { Annotation, 
         Genome, 
         EpigeneticMark } from '../domain/deepblue'

import { DeepBlueService } from '../service/deepblue'



@Component({
    selector: 'dive-status',
    template: `
            <genome-selector></genome-selector>
            <li role="menuitem">
                <a [routerLink]="['/']">x
                    <i class="material-icons">dashboard</i>
                    <span>{{ deepBlueService.getAnnotation()?.name }}</span>
                </a>                
            </li>                
            <histone-mark-selector></histone-mark-selector>
            `
})
export class DiveStatus {
    constructor (private deepBlueService: DeepBlueService) { }        
}
@Component({
    selector: 'list-annotations',
    template: `   
                <div class="ui-g form-group">
                    <div class="ui-g-12 ui-md-2">
                        <label for="input">Annotation Name</label>
                    </div>
                    <div class="ui-g-12 ui-md-4">
                        <p-dropdown 
                            id="dropdown" 
                            [options]="menuAnnotations" 
                            [(ngModel)]="selectedAnnotation" 
                            filter="filter" 
                            [autoWidth]="false"
                            (onChange)="selectAnnotation($event)"
                        >
                        </p-dropdown>
                    </div>
                </div>
        `
})
export class AnnotationListComponent {
    errorMessage: string;
    annotations: Annotation[];
    menuAnnotations: SelectItem[];
    selectedAnnotation: SelectItem;
    genomeSubscription: Subscription;

    constructor (private deepBlueService: DeepBlueService) {
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(
            genome => {
                this.deepBlueService.getAnnotations(genome)
                    .subscribe(
                        annotations => {
                            this.annotations = annotations;
                            this.menuAnnotations = annotations.map((annotation) => {
                                return {label: annotation.name, value: annotation};
                            });
                        },
                        error => this.errorMessage = <any>error);
        });      
    }

    selectAnnotation(event) {
        this.deepBlueService.setAnnotation(event.value);
    }
             
    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }  
}

//

@Component({
  selector: 'histone-mark-selector',
    templateUrl: 'app/demo/view/histones.selector.html'
})
export class HistoneExperimentsMenu {
    errorMessage: string;
    selectHistones: EpigeneticMark[];

    constructor (private deepBlueService: DeepBlueService) {}

    ngOnInit() {         
        this.deepBlueService.getHistones()
            .subscribe(
                histones => {                    
                    this.selectHistones = histones;
                },
                error => this.errorMessage = <any>error
            );
    }

    changeHistone(event, histone) {
        this.deepBlueService.setEpigeneticMark(histone);
    }  

    getStyle(histone) : string {
        if (histone.id == this.deepBlueService.getEpigeneticMark().id) {
        return "check circle";
      } else {
        return "alarm on";
      }
    }
}


// Building Menu Items with Genome names

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
