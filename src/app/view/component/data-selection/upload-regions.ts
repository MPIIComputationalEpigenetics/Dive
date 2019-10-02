import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DeepBlueOperation, DeepBlueEmptyParameter } from 'app/domain/operations';
import { Id } from 'app/domain/deepblue';
import { DeepBlueService } from 'app/service/deepblue';

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


  constructor(public deepBlueService: DeepBlueService) {
  };

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.isUploading = false;
    let response = JSON.parse(event.xhr.response);
    if (response[0] == "error") {
      this.uploadedFiles = [];
      this.hasError = true;
      this.errorMessage = response[1];
    } else {
      let query_id: string = response[1];
      this.queryIdSelected.emit(new DeepBlueOperation(new DeepBlueEmptyParameter(), new Id(query_id), 'input_regions'));
    }

  }
}