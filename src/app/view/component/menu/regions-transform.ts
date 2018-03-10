import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { SelectedData } from 'app/service/selecteddata';

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
  selector: 'regions-transform-menu',
  template: '<p></p>'
})
export class RegionsTransformMenu implements OnInit {


  // Transforms:
  transform_extend_directions = [
    { name: 'Backward', code: 'BACKWARD' },
    { name: 'Forward', code: 'FORWARD' },
    { name: 'Both', code: 'BOTH' },
  ]

  public flank_form_group: FormGroup;
  public extend_form_group: FormGroup;

  constructor(private deepBlueService: DeepBlueService, private fb: FormBuilder,
    private selectedData: SelectedData, private diveMenuService: DiveMenuService) {
  }

  validateMinNumber(c: FormControl) {
    return c.value < 1 ? null : { valid: false }
  };

  extend(form_content: any) {
    event.preventDefault();
    //this.selectedData.activeStackSubject.getValue().extend(form_content['direction'], form_content['length']);
  }

  ngOnInit() {
    this.extend_form_group = this.fb.group({
      direction: 'BOTH',
      length: [1000, []]
    });


    this.deepBlueService.dataToDiveValue$.subscribe(data => {
      if (data === null) {
        return;
      }

      this.diveMenuService.includeObject('transformation',
        {
          label: 'Extend',
          type: 'extend',
          group: this.extend_form_group,
          submit: (event: any) => { this.extend(this.extend_form_group.value); }
        });
    })
  }

}
