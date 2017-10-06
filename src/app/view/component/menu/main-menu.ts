import { DeepBlueMiddlewareOverlapResult } from 'app/domain/operations';
import { Component, ViewChild, OnInit, Input, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';

import { MenuItem } from 'primeng/primeng';
import { Dropdown } from 'primeng/primeng';
import { SelectItem } from 'primeng/primeng';

import { Annotation } from 'app/domain/deepblue';
import { EpigeneticMark } from 'app/domain/deepblue';
import { Experiment } from 'app/domain/deepblue';
import { FullMetadata } from 'app/domain/deepblue';
import { Genome } from 'app/domain/deepblue';
import { IdName } from 'app/domain/deepblue';

import { StackValue } from 'app/domain/operations';
import { MenuService } from 'app/service/menu';

import { DataCache } from 'app/service/deepblue';
import { DeepBlueService } from 'app/service/deepblue';
import { MultiKeyDataCache } from 'app/service/deepblue';
import { SelectedData } from 'app/service/selecteddata';
import { DataStack } from 'app/service/datastack';
import { IMenu } from 'app/domain/interfaces';


@Component({
  selector: 'dive-menu',
  template: `
          <length-filtering></length-filtering>
          <dna-pattern-filtering></dna-pattern-filtering>
          `,
})
export class DiveStatus {
  menus: IMenu[] = [];
  constructor(private deepBlueService: DeepBlueService, private menuService: MenuService) {
      this.menus = [
          new GenomeSelectorMenu(this.deepBlueService, this.menuService),
          new HistoneExperimentsMenu(this.deepBlueService, this.menuService),
          new CSSExperimentsMenu(this.deepBlueService, this.menuService)
      ];

      this.menus.forEach((menu: IMenu) => {
          menu.loadMenu();
      });
  }
}


// Building Menu Items with Genome names
// TODO: These menu component must be moved to a 'Dive main component', since it is not a visual component anymore
class GenomeSelectorMenu implements IMenu {

  errorMessage: string;

  constructor(private deepBlueService: DeepBlueService, private menuService: MenuService) { }

  loadMenu(): any {
      return this.deepBlueService.getGenomes().subscribe(genomes => {
          this.deepBlueService.setGenome(genomes[0]);

          for (let genome of genomes) {
              this.menuService.includeItem('genomes', genome.name, 'fiber_manual_record',
                  (event: any) => { this.selectItem(genome) },
                  ['/'], /* router link */
                  null /* url */
              );
          }
          return true;
      },
          error => this.errorMessage = <any>error
      );
  }

  selectItem(genome: Genome) {
      this.deepBlueService.setGenome(genome);
  }
}

export class HistoneExperimentsMenu implements IMenu {
  errorMessage: string;
  selectHistones: EpigeneticMark[];
  genomeSubscription: Subscription;

  constructor(private deepBlueService: DeepBlueService, private menuService: MenuService) { }

  loadMenu(): any {
      this.genomeSubscription = this.deepBlueService.genomeValue$.subscribe(genome => {
          if (genome === null) {
              return;
          }
          this.deepBlueService.getHistones().subscribe(histones => {
              this.menuService.clean('histones');
              for (let histone of histones) {

                  this.menuService.includeItem('histones', histone.name, 'fiber_manual_record',
                      (event: any) => this.selectItem(histone),
                      ['/histonemark'], /* router link */
                      null /* url */
                  );
              }
          },
              error => this.errorMessage = <any>error);
      });
  }

  selectItem(histone: EpigeneticMark) {
      this.deepBlueService.setEpigeneticMark(histone);
  }
}

export class CSSExperimentsMenu implements IMenu {
  errorMessage: string;
  selectHistones: EpigeneticMark[];
  genomeSubscription: Subscription;

  constructor(private deepBlueService: DeepBlueService, private menuService: MenuService) { }

  loadMenu() {
      this.genomeSubscription = this.deepBlueService.genomeValue$.subscribe(genome => {
          if (genome === null) {
              return;
          }
          this.deepBlueService.getChromatinStateSegments().subscribe((csss: string[]) => {
              this.menuService.clean('css');
              for (let css of csss) {
                  this.menuService.includeItem('css', css[1], 'fiber_manual_record',
                      (event: any) => { this.selectItem(css[0]) },
                      ['/chromatin_states'], /* router link */
                      null /* url */
                  );
              }
          });
      },
          error => this.errorMessage = <any>error
      );
  }

  selectItem(css: string) {
      this.deepBlueService.setEpigeneticMark(new EpigeneticMark(["Chromatin State Segmentation", css]));
  }
}

///