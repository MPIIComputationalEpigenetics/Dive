import { Component, OnInit } from '@angular/core';
import { Annotation } from './deepblue.entities'

import { DeepBlueService } from './deepblue.service'

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

    ngOnInit() { this.getAnnotations(); }

    getAnnotations() {
        this.deepBlueService.getAnnotations()
            .subscribe(
                annotations => this.annotations = annotations,
                error => this.errorMessage = <any>error
            );           
    }
}
