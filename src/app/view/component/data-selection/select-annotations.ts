import { Component, ViewChild, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Annotation } from "app/domain/deepblue";
import { SelectItem, Dropdown } from "primeng/primeng";
import { Subscription } from "rxjs";
import { DeepBlueService } from "app/service/deepblue";
import { ProgressElement } from 'app/service/progresselement';
import { DeepBlueOperation } from 'app/domain/operations';


@Component({
    selector: 'select-annotations-component',
    templateUrl: 'select-annotations.html'
})
export class SelectAnnotationsComponent implements OnDestroy {
    errorMessage: string;
    annotations: Annotation[];
    menuAnnotations: SelectItem[];
    selectedAnnotation: Annotation;
    genomeSubscription: Subscription;

    @Input() toCompare: boolean;

    @Output() annotationSelected = new EventEmitter();

    @Output() comparedAnnotationSelected = new EventEmitter();

    @Output() queryIdSelected = new EventEmitter();

    @ViewChild('annotationsDropdown') annotationsDropdown: Dropdown;

    constructor(private deepBlueService: DeepBlueService, private progress_element: ProgressElement) {

        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
            if (genome.id == null || genome.name == '') {
                return;
            }
            this.deepBlueService.getAnnotations(genome).subscribe(annotations => {
                if (annotations.length === 0) {
                    return;
                }
                this.annotations = annotations;
                this.menuAnnotations = annotations.map((annotation: Annotation) => {
                    let l = { label: annotation.name, value: annotation };
                    if (l.label.toLowerCase().startsWith('cpg islands')) {
                        this.annotationsDropdown.selectItem(null, l);
                    }

                    if (l.label.toLowerCase().startsWith('blueprint')) {
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
        this.annotationSelected.emit(this.selectedAnnotation);

        this.deepBlueService.selectAnnotation(this.selectedAnnotation, this.progress_element, 0).subscribe((operation: DeepBlueOperation) => {
            this.queryIdSelected.emit(operation);
        });
    }

    selectAnnotationForComparison(event) {
        this.comparedAnnotationSelected.emit(this.selectedAnnotation);
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}