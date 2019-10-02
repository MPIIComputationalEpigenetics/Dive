import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { DeepBlueService } from 'app/service/deepblue';
import { ProgressElement } from 'app/service/progresselement';

@Component({
  templateUrl: './dna-motif.html',
  selector: 'select-motif'
})
export class SelectMotif {

  motif: string = null;

  @Output() queryIdSelected = new EventEmitter();

  constructor(public deepBlueService: DeepBlueService, private progress_element: ProgressElement) { };

  useMotif() {
    this.deepBlueService.findMotif(this.motif).subscribe((op) => {
      this.deepBlueService.cacheQuery(op).subscribe((cached_data) => {
        this.queryIdSelected.emit(cached_data);
      })
    })
  }

  minimulLength() {
    return (this.motif && this.motif.length >= 8);
  }
}
