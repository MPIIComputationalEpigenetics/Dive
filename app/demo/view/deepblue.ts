import { DataDemo } from './datademo';
import { Component, 
         ViewChild, 
         OnInit,
         } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Dropdown,
         SelectItem } from 'primeng/primeng';

import { Annotation, 
         Genome, 
         EpigeneticMark, 
         ProgressElement } from '../domain/deepblue'

import { DataStack, DeepBlueService, SelectedData } from '../service/deepblue';


@Component({
    selector: 'data-load-progess-bar',
    template: `
        <p-progressBar [value]="progress_value" [showValue]="true"></p-progressBar>
    `
})
export class DataLoadProgressBar extends ProgressElement {    
    constructor () {
        super()             
    }
}

@Component({
    selector: 'data-stack',
    template: `

    <ul role="menu">
        <li *ngFor="let data of dataStack.getData() " (click)="removeData($event, data)">        
            <a href="#" class="ripplelink">
                <i class="material-icons">check circle</i><span> {{ data.idName.name }}</span>
            </a>
        </li>            
    </ul>
    
    `
})
export class DataStackView {


    dataStack: DataStack;

    constructor (private deepBlueService: DeepBlueService) {
        this.dataStack = deepBlueService.getDataStack();
    }

    removeData(event, data) {
        console.log(event, data);
    }
}


@Component({
    selector: 'dive-status',
    template: `
            <data-stack></data-stack>
            <genome-selector></genome-selector>
            {{ deepBlueService.getTotalSelectedRegtions() }}
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
                            #annotationsDropdown 
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

    @ViewChild('annotationsDropdown') annotationsDropdown: Dropdown

    constructor (private deepBlueService: DeepBlueService) {
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(
            genome => {
                this.deepBlueService.getAnnotations(genome).subscribe(
                    annotations => {
                        if (annotations.length == 0) {
                            return;
                        }
                        this.annotations = annotations;
                        this.menuAnnotations = annotations.map((annotation: Annotation) => {
                            let l =  {label: annotation.name, value: annotation};
                            if (l.label.toLowerCase().startsWith("cpg islands")) {
                                this.annotationsDropdown.selectItem(null, l);
                            }
                            
                            return l;
                        });
                    },
                    error => this.errorMessage = <any>error);
            }
        );      
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
    genomeSubscription: Subscription;

    constructor (private deepBlueService: DeepBlueService) {
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(
            genome => {
                this.deepBlueService.getHistones().subscribe(
                    histones => {
                        this.selectHistones = histones;
                    },
                    error => this.errorMessage = <any>error);
            }
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

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
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
