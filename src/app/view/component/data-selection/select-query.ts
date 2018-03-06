import { Component, Output, ViewEncapsulation } from '@angular/core';
import { InputTextareaModule, TreeNode } from 'primeng/primeng';
import { Message } from 'primeng/primeng';
import { EventEmitter } from '@angular/core';
import { DeepBlueService } from 'app/service/deepblue';
import { ProgressElement } from 'app/service/progresselement';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Id } from 'app/domain/deepblue';
import { IDataParameter, IOperation } from 'app/domain/interfaces';

@Component({
  templateUrl: './select-query.html',
  selector: 'select-query'
})
export class SelectQuery {
  model_query_id: string = null;
  query_id: string = null;
  selected_query: IOperation;
  messages: Message[];

  @Output() queryIdSelected = new EventEmitter();

  constructor(public deepBlueService: DeepBlueService, private progress_element: ProgressElement) { };

  onEnter() {
    this.query_id = this.model_query_id;
  }

  loadQuery($event: any) {
    this.selected_query = $event;
  }

  useQuery() {
    this.queryIdSelected.emit(this.selected_query);
  }
}
