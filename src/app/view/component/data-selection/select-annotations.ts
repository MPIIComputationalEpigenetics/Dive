import { Component, ViewChild, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Annotation } from "app/domain/deepblue";
import { Subscription } from "rxjs";
import { DeepBlueService } from "app/service/deepblue";
import { DeepBlueOperation } from 'app/domain/operations';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Dropdown } from 'primeng/components/dropdown/dropdown';


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

    @ViewChild('annotationsDropdown', { static: true }) annotationsDropdown: Dropdown;

    constructor(private deepBlueService: DeepBlueService) {

        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
            if (genome === null) {
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
                        this.annotationsDropdown.selectItem({}, l);
                    }

                    if (l.label.toLowerCase().startsWith('blueprint')) {
                        this.annotationsDropdown.selectItem({}, l);
                    }
                    return l;
                });
            },
                error => this.errorMessage = <any>error);
        }
        );
    }

    selectAnnotation(event: any) {
        this.annotationSelected.emit(this.selectedAnnotation);

        this.deepBlueService.selectAnnotation(this.selectedAnnotation).subscribe((operation: DeepBlueOperation) => {
            this.queryIdSelected.emit(operation);
        });
    }

    selectAnnotationForComparison(event: any) {
        this.comparedAnnotationSelected.emit(this.selectedAnnotation);
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}