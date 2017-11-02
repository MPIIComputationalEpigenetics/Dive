import { Component, Output } from '@angular/core';
import { InputTextareaModule } from 'primeng/primeng';
import { Message } from 'primeng/primeng';
import { EventEmitter } from '@angular/core';
import { DeepBlueOperation, DataParameter } from 'app/domain/operations';
import { Id } from 'app/domain/deepblue';
import { DeepBlueService } from 'app/service/deepblue';
import { ProgressElement } from 'app/service/progresselement';

@Component({
  templateUrl: './upload-regions.html',
  selector: 'regions-upload',
})
export class RegionsUpload {

  uploadedFiles: any[] = [];
  textAreaContent: any;

  @Output() queryIdSelected = new EventEmitter();


  constructor(public deepBlueService: DeepBlueService, private progress_element: ProgressElement) {
  };

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    let response = JSON.parse(event.xhr.response);
    let query_id: string = response[1];
    this.queryIdSelected.emit(new DeepBlueOperation(new DataParameter("User Data"), new Id(query_id), 'input_regions', -1));
  }
}