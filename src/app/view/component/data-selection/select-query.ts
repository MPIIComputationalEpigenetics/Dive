import { Component, Output, ViewEncapsulation } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DeepBlueService } from 'app/service/deepblue';
import { IOperation } from 'app/domain/interfaces';

@Component({
  templateUrl: './select-query.html',
  selector: 'select-query'
})
export class SelectQuery {

  model_query_id: string = null;
  query_id: string = null;
  selected_query: IOperation = null;

  @Output() queryIdSelected = new EventEmitter();

  constructor(public deepBlueService: DeepBlueService) { };

  useQueryId() {
    this.query_id = this.model_query_id;
    this.selected_query = null;
  }

  storeQueryObject($event: any) {
    this.selected_query = $event;
  }

  useQuery() {
    this.queryIdSelected.emit(this.selected_query);
  }

  hasQueryObject(): boolean {
    return this.selected_query != null;
  }
}
