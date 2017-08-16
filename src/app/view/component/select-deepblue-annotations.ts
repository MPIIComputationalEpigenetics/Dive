import { Component, ViewChild, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Annotation } from "app/domain/deepblue";
import { SelectItem, Dropdown } from "primeng/primeng";
import { Subscription } from "rxjs";
import { DeepBlueService } from "app/service/deepblue";
import { SelectedData } from "app/service/selecteddata";


@Component({
    selector: 'select-deepblue-annotations-component',
    templateUrl: 'select-deepblue-annotations.html'})
export class SelectDeepBlueAnnotationsComponent implements OnDestroy {
    errorMessage: string;
    annotations: Annotation[];
    menuAnnotations: SelectItem[];
    selectedAnnotation: Annotation;
    genomeSubscription: Subscription;

    @Input() toCompare: boolean;

    @Output() annotationSelected = new EventEmitter();

    @Output() comparedAnnotationSelected = new EventEmitter();

    @ViewChild('annotationsDropdown') annotationsDropdown: Dropdown;

    constructor(private deepBlueService: DeepBlueService, private selectedData: SelectedData) {

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
    }

    selectAnnotationForComparison(event) {
        this.comparedAnnotationSelected.emit(this.selectedAnnotation);
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}