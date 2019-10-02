import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DeepBlueService } from 'app/service/deepblue';

@Component({
  templateUrl: './paste-regions.html',
  selector: 'regions-paste',
})
export class RegionsPaste {

  hasError = false;
  errorMessage = "";
  textAreaContent = "";

  @Output() queryIdSelected = new EventEmitter();

  constructor(public deepBlueService: DeepBlueService) {
  };

  onUploadClick() {
    this.deepBlueService.inputRegions(this.textAreaContent.trim()).subscribe((op) => {
      if (op.dataType() == "error") {
        this.hasError = true;
        this.errorMessage = op.text();
      } else {
        this.queryIdSelected.emit(op)
      }
    });
  }
}