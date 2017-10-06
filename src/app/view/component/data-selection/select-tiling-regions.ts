import { DeepBlueService } from 'app/service/deepblue';
import { Component, Output, EventEmitter, ChangeDetectorRef, OnInit, ViewChild } from "@angular/core";
import { ProgressElement } from 'app/service/progresselement';
import { DeepBlueTiling } from 'app/domain/operations';
import { InplaceModule, Inplace } from 'primeng/primeng';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'select-tiling-component',
  templateUrl: './select-tiling-regions.html'
})

export class SelectTilingRegionsComponent {
  min: number = 1000;
  max: number = 1000000;
  size: number = 10000;

  @ViewChild('inplace') inPlace: Inplace;
  @Output() queryIdSelected = new EventEmitter();

  constructor(private deepBlueService: DeepBlueService, private progress_element: ProgressElement, public cdRef: ChangeDetectorRef) { }

  onEnter($event: any) {
    this.cdRef.detectChanges();
    if (this.size < this.min) {
      this.size = this.min;
    }
    this.inPlace.deactivate($event);
    this.select_click();
  }

  select_click() {
    this.deepBlueService.tilingRegions(this.size, [], this.progress_element, 0).subscribe((tiling: DeepBlueTiling) => {
      this.queryIdSelected.emit(tiling);
    });
  }
}
