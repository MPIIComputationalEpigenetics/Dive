import { DeepBlueService } from 'app/service/deepblue';
import { Component } from "@angular/core";

@Component({
  selector: 'select-tiling-component',
  templateUrl: './select-tiling-regions.html'
})

export class SelectTilingRegionsComponent {
  val: number = 2500;

  select_click() {
    console.log(this.val);
  }
}
