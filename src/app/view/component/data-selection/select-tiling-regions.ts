import { DeepBlueService } from 'app/service/deepblue';
import { Component, Output, EventEmitter } from "@angular/core";
import { ProgressElement } from 'app/service/progresselement';
import { DeepBlueTiling } from 'app/domain/operations';

@Component({
  selector: 'select-tiling-component',
  templateUrl: './select-tiling-regions.html'
})

export class SelectTilingRegionsComponent {
  size: number = 2500;

  @Output() queryIdSelected = new EventEmitter();

  constructor(private deepBlueService: DeepBlueService, private progress_element: ProgressElement) { }

  select_click() {
    this.deepBlueService.tilingRegions(this.size, [], this.progress_element, 0).subscribe((tiling: DeepBlueTiling) => {
      this.queryIdSelected.emit(tiling);
    });
  }
}
