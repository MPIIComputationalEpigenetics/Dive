import { Component, Output } from '@angular/core';
import { InputTextareaModule } from 'primeng/primeng';
import { Message } from 'primeng/primeng';
import { EventEmitter } from '@angular/core';
import { DeepBlueOperation, DeepBlueEmptyParameter } from 'app/domain/operations';
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

  isUploading = false;
  hasError = false;
  errorMessage = "";

  @Output() queryIdSelected = new EventEmitter();


  constructor(public deepBlueService: DeepBlueService, private progress_element: ProgressElement) {
  };

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.isUploading = true;
    let response = JSON.parse(event.xhr.response);
    if (response[0] == "error") {
      this.uploadedFiles = [];
      this.hasError = true;
      this.errorMessage = response[1];
    } else {
      let query_id: string = response[1];
      this.queryIdSelected.emit(new DeepBlueOperation(new DeepBlueEmptyParameter(), new Id(query_id), 'input_regions', -1));
    }

  }
}