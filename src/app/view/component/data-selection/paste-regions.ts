import { Component, Output } from '@angular/core';
import { InputTextareaModule } from 'primeng/primeng';
import { Message } from 'primeng/primeng';
import { EventEmitter } from '@angular/core';
import { DeepBlueOperation } from 'app/domain/operations';
import { Id } from 'app/domain/deepblue';
import { DeepBlueService } from 'app/service/deepblue';
import { ProgressElement } from 'app/service/progresselement';

@Component({
  templateUrl: './paste-regions.html',
  selector: 'regions-paste',
})
export class RegionsPaste {

  hasError = false;
  errorMessage = "";
  textAreaContent = "";

  @Output() queryIdSelected = new EventEmitter();

  constructor(public deepBlueService: DeepBlueService, private progress_element: ProgressElement) {
  };

  onUploadClick() {
    this.deepBlueService.inputRegions(this.textAreaContent.trim(), this.progress_element, -1).subscribe((op) => {
      if (op.dataType() == "error") {
        this.hasError = true;
        this.errorMessage = op.text();
      } else {
        this.queryIdSelected.emit(op)
      }
    });
  }
}