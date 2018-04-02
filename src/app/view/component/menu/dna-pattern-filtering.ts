import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { SelectedData } from 'app/service/selected-data';
import {
    SimpleChanges,
    Component,
    ViewChild,
    OnChanges,
    OnInit,
    Input
} from '@angular/core';

import { Annotation } from 'app/domain/deepblue';
import { DeepBlueService } from 'app/service/deepblue';
import { DiveMenuService } from 'app/service/menu';

@Component({
    selector: 'dna-pattern-filtering',
    template: '<p></p>'
})
export class DnaPatternMenuFilterComponent implements OnInit {

    public pattern_form: FormGroup;

    constructor(private deepBlueService: DeepBlueService, private fb: FormBuilder,
        private selectedData: SelectedData, private diveMenuService: DiveMenuService) {
    }

    validateDNAPattern(c: FormControl) {
        let regexp = new RegExp('^[a-zA-Z][a-zA-Z]+$')
        let x = regexp.test(c.value) ? null : { valid: false }
        return x;
    };

    save_dna_pattern_filter(form_content: any) {
        event.preventDefault();
        this.selectedData.activeStackSubject.getValue().filter_by_dna_motif(form_content['dna_pattern']);
    }

    ngOnInit() {
        this.deepBlueService.dataToDiveValue$.subscribe(data => {
            if (data === null) {
                return;
            }

            this.pattern_form = this.fb.group({
                dna_pattern: ["", [this.validateDNAPattern]]
            });

            this.diveMenuService.includeObject('filtering',
                {
                    label: 'DNA Pattern', type: 'string', group: this.pattern_form, control_name: 'dna_pattern',
                    submit: (event: any) => { this.save_dna_pattern_filter(this.pattern_form.value); }
                });
        })
    }
}
