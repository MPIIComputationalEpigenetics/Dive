import { FormBuilder } from '@angular/forms';

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

import { Annotation, FullMetadata } from 'app/domain/deepblue';
import { DeepBlueService } from 'app/service/deepblue';
import { DiveMenuService } from 'app/service/menu';
import { STRING_TYPE } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'columns-filtering',
  template: '<p></p>'
})
export class ColumnsMenuFilterComponent implements OnInit {

  static STRING_OPTIONS = [
    { label: '==', value: '==' },
    { label: '!=', value: '!=' }
  ];

  static NUMBER_OPTIONS = [
    { label: '==', value: '==' },
    { label: '!=', value: '!=' },
    { label: '>', value: '>' },
    { label: '>=', value: '>=' },
    { label: '<', value: '<' },
    { label: '<=', value: '<=' }
  ]

  constructor(private deepBlueService: DeepBlueService, private fb: FormBuilder,
    private selectedData: SelectedData, private diveMenuService: DiveMenuService) {
  }

  apply_filter(column: string, type: string, form_content: any) {
    event.preventDefault();
    this.selectedData.activeStackSubject.getValue().filter_regions(column, form_content['operation'], form_content['value'], type);
  }

  ngOnInit() {

    this.selectedData.getActiveTopStackValue().subscribe(data => {

      if (data === null) {
        return;
      }

      this.selectedData.getActiveCurrentOperationMetadata().subscribe((metadata) => {
        if (metadata == null) {
          return;
        }

        let columns = metadata.columns();

        this.diveMenuService.clean('columns');

        for (let column of columns) {
          let formGroup = this.fb.group({
            value: '',
            operation: '=='
          });

          let filter_options = column.column_type == "string" ? ColumnsMenuFilterComponent.STRING_OPTIONS : ColumnsMenuFilterComponent.NUMBER_OPTIONS;
          let filter_column_type = column.column_type == "string" ? "string" : "number";

          this.diveMenuService.includeObject('columns',
            {
              value_control_name: 'value',
              operation_control_name: 'operation',
              label: column.name,
              type: 'filter_by',
              group: formGroup,
              options: filter_options,

              submit: (event: any) => { this.apply_filter(column.name, filter_column_type, formGroup.value) }
            });
        }
      });
    });

  }

}
