import { Component, OnDestroy } from "@angular/core";
import { DeepBlueService } from "app/service/deepblue";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-enrichment-database-component',
  templateUrl: 'select-databases.html'
})
export class SelectDatabasesComponent implements OnDestroy {
  genomeSubscription: Subscription;

  sourceDatabases: [string, string[]][] = [];
  targetDatabases: [string, string[]][] = [];

  constructor(private deepBlueService: DeepBlueService) {
      this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
          if (genome.id === '') {
              return;
          }
          this.deepBlueService.composedOverlapEnrichmentDatabase(genome).subscribe(databases => {
              this.sourceDatabases = databases;
          });
      });
  }

  ngOnDestroy() {
      this.genomeSubscription.unsubscribe();
  }
}

