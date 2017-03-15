import { SelectedData } from '../service/selecteddata';
import { MenuService } from '../service/menu';
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
    template: ""
})
export class FilteringComponent implements OnInit {

    public min_length_form: FormGroup;
    public max_length_form: FormGroup;

    constructor(private fb: FormBuilder, private selectedData: SelectedData, private menuService: MenuService) {
    }

    validateMinNumber(c: FormControl) {
        console.log(c.value)
        return c.value < 1 ? null : { valid: false }
    };

    save_min_length(form_content: Object) {
        event.preventDefault();
        this.selectedData.getActiveStack().filter_regions("@LENGTH", ">=", form_content['min_length'], "number")
    }

    save_max_length(form_content: Object) {
        event.preventDefault();
        this.selectedData.getActiveStack().filter_regions("@LENGTH", "<=", form_content['max_length'], "number")
    }

    ngOnInit() {
        this.min_length_form = this.fb.group({
            min_length: [0, [this.validateMinNumber]]
        });

        this.max_length_form = this.fb.group({
            max_length: [0, []]
        });

        this.menuService.includeObject('filtering',
            { label: 'Mininum region length', type: 'number', group: this.min_length_form, control_name: 'min_length',
            submit: (event) => { this.save_min_length(this.min_length_form.value)}
            })

        this.menuService.includeObject('filtering',
            { label: 'Maximum region length', type: 'number', group: this.max_length_form, control_name: 'max_length',
                submit: (event) => { this.save_max_length(this.max_length_form.value)}
            })
    }
}
