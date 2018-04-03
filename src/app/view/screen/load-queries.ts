import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { DeepBlueService } from "../../service/deepblue";
import { query } from "@angular/core/src/animation/dsl";
import { Id } from "app/domain/deepblue";
import { SelectedData } from "../../service/selected-data";


@Component({
  template: '<h1>Loading Query</h1>'
})
export class LoadQueriesScreen {
  constructor(private route: ActivatedRoute, private router: Router,
    private deepBlueService: DeepBlueService, private selectedData: SelectedData) {

    route.queryParams.subscribe(params => {
      let query_id = params['qid'];
      let g_id = params['gid'];
      let compare = params["cid"];

      debugger;
      if (!query_id) {
        return;
      }

      let setGenome = this.deepBlueService.getGenomes().subscribe(genomes => {
        for (let genome of genomes) {
          if (genome.id.id == g_id) {
            this.deepBlueService.setGenome(genome);
          }
        }

        let setData = this.deepBlueService.getQueryInfo(new Id(query_id)).subscribe((op) => {
          this.deepBlueService.setDataToDive(op);
          this.router.navigate(['/similarfinder']);
        });

        for (let c of compare) {
          let setData = this.deepBlueService.getQueryInfo(new Id(c)).subscribe((op) => {
            this.selectedData.insertForComparison(op);
          });
        }
      });
    })
  }
}
