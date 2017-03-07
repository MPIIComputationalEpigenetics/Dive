import { DataLoadProgressBar } from './deepblue';
import { DataStack } from '../service/datastack';
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
    templateUrl: './filtering.html'
})
export class FilteringComponent implements OnInit {

    public min_length_form: FormGroup;
    public max_length_form: FormGroup;

    annotationSubscription: Subscription;
    genomeSubscription: Subscription;

    @ViewChild('progressbar') progressbar: DataLoadProgressBar;

    constructor(private fb: FormBuilder, private deepBlueService: DeepBlueService, private dataStack: DataStack) {
        this.annotationSubscription = deepBlueService.annotationValue$.subscribe(annotation => {
            console.log(annotation);
        });

        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
            if (genome.id == null || genome.name == "") {
                return;
            }
        })

        this.deepBlueService.getGeneModels().subscribe((x) => console.log(x));
    }

    validateMinNumber(c: FormControl) {
        console.log(c.value)
        return c.value < 1 ? null : { valid: false }
    };

    save_min_length(form_content: Object) {
        this.dataStack.filter_regions("@LENGTH", ">=", form_content['min_length'], "number", this.progressbar)
    }
1
    save_max_length(form_content: Object) {
        this.dataStack.filter_regions("@LENGTH", "<=", form_content['max_length'], "number", this.progressbar)
    }

    ngOnInit() {
        this.min_length_form = this.fb.group({
            min_length: [0, [this.validateMinNumber]]
        });

        this.max_length_form = this.fb.group({
            max_length: [0, []]
        });

        this.genomeSubscription.unsubscribe();
        this.annotationSubscription.unsubscribe();
    }

}
