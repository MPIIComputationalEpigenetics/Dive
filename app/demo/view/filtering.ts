import {
    SimpleChanges,
    Component,
    ViewChild,
    OnChanges,
    OnInit,
    Input
} from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import {
    Annotation,
} from '../domain/deepblue';

import { DeepBlueService } from '../service/deepblue';


@Component({
    selector: 'filtering',
    templateUrl: 'app/demo/view/filtering.html'
})
export class FilteringComponent implements OnInit {

    public min_length_form: FormGroup;

    annotationSubscription: Subscription;

    constructor(private fb: FormBuilder, private deepBlueService: DeepBlueService) {
        this.annotationSubscription = deepBlueService.annotationValue$.subscribe(annotation => {
            console.log(annotation);
        })
    }

    validateNumber(c: FormControl) {
        console.log(c.value)
        return c.value < 1 ? null : { valid: false }
    };

    save_min_length(form_content: Object) {
        debugger;

        //todo: this.DeepBlueService.stack.filter_min_length(form_content.min_length)
    }

    ngOnInit() {
        this.min_length_form = this.fb.group({
            min_length: [1, [this.validateNumber]]
        });
    }

}
