import { Component, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IOperation } from 'app/domain/interfaces';
import { DeepBlueService } from 'app/service/deepblue';
import { Router } from '@angular/router';
import { ProgressElement } from 'app/service/progresselement';

@Component({
  templateUrl: './initial.html'
})
export class InitialScreenComponent {

  constructor(private deepBlueService: DeepBlueService, private progress_element: ProgressElement,

    private router: Router) { }

  showDemo: boolean = false;
  showUpload: boolean = false;

  showDemoDialog() {

    this.deepBlueService.genomeValue$.subscribe(genome => {
      if (genome === null) {
        return;
      }
      this.deepBlueService.getAnnotations(genome).subscribe(annotations => {
        for (let annotation of annotations) {
          if (annotation.name.toLowerCase().startsWith('cpg islands')) {
            debugger;
            this.deepBlueService.selectAnnotation(annotation, this.progress_element, 0).subscribe((operation) => {
              debugger;
              this.deepBlueService.setDataToDive(operation);
              this.router.navigate(['/similarfinder']);
            });
          }
        }
      });
    });

    this.showDemo = true;
  }

  showExistingDataset() {
    this.router.navigate(['/dataselection']);
  }

  showUploadDialog() {
    this.showUpload = true;
  }

  selectQuery(event: IOperation) {
    this.deepBlueService.setDataToDive(event);
    this.router.navigate(['/similarfinder']);
  }
}