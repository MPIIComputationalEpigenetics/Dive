import { Component, Output } from '@angular/core';
import { Message } from 'primeng/primeng';
import { EventEmitter } from '@angular/core';
import { DeepBlueOperation, DataParameter } from 'app/domain/operations';
import { Id } from 'app/domain/deepblue';

@Component({
  templateUrl: './upload.html',
  selector: 'regions-upload',
})
export class RegionsUpload {

  uploadedFiles: any[] = [];

  @Output() queryIdSelected = new EventEmitter();

  onUpload(event: any) {

    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    let query_id : string = event.xhr.response;
    this.queryIdSelected.emit(new DeepBlueOperation(new DataParameter("User Data"), new Id(query_id), 'input_regions', -1));
  }
}