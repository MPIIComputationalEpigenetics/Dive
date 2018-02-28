import { DeepBlueService } from "app/service/deepblue";
import { IOperation } from 'app/domain/interfaces';
import { ProgressElement } from 'app/service/progresselement';
import { DeepBlueMiddlewareOverlapEnrichtmentResultItem } from 'app/domain/operations';
import { Statistics, IStatsResult } from 'app/service/statistics';
import { BioSource } from 'app/domain/deepblue';
import { RequestManager } from 'app/service/requests-manager';

export class SimilarDatasets {

  static getOrderFunction(order: string) {
    if (order == "desc") {
      return this.desc_func;
    } else {
      return this.asc_func;
    }
  }

  static desc_func(a: any, b: any, column: string) {
    return b[column] - a[column];
  }

  static asc_func(a: any, b: any, column: string) {
    return a[column] - b[column];
  }

  static processSimilar(data: IOperation,
    callback: (_self: any, result: DeepBlueMiddlewareOverlapEnrichtmentResultItem[]) => void, _self: any,
    deepBlueService: DeepBlueService, requestManager: RequestManager, progress_element: ProgressElement) {

    deepBlueService.composedCalculateFastsEnrichment(data).subscribe((request) => {
      requestManager.cancelAllRequest();
      requestManager.enqueueRequest(request)
      deepBlueService.getComposedResultIterator(request, progress_element, 'overlaps_enrichment_fast', callback, _self)
        .subscribe((result: DeepBlueMiddlewareOverlapEnrichtmentResultItem[]) => {
          callback(_self, result);
        })
    })
  }

  static sortDatasets(cutoffValue: number, order: string, datum: DeepBlueMiddlewareOverlapEnrichtmentResultItem[]) {

    let orderFunction = this.getOrderFunction(order);

    if ((!datum) || (datum.length == 0)) {
      return {
        "all": [],
        "biosources": [],
        "epigenetic_marks": []
      }
    }

    datum.sort((a, b) => orderFunction(a, b, 'p_value_log'));
    let position = 0;
    let value = datum[0].p_value_log;
    for (let i = 0; i < datum.length; i++) {
      if (datum[i].p_value_log != value) {
        position = i;
        value = datum[i].p_value_log;
      }
      datum[i].log_rank = position + 1;
    }

    datum.sort((a, b) => orderFunction(a, b, 'odds_ratio'));
    position = 0;
    value = datum[0].odds_ratio;
    for (let i = 0; i < datum.length; i++) {
      if (datum[i].odds_ratio != value) {
        position = i;
        value = datum[i].odds_ratio;
      }
      datum[i].odd_rank = position + 1;
    }

    datum.sort((a, b) => orderFunction(a, b, 'support'));
    position = 0;
    value = datum[0].support;
    for (let i = 0; i < datum.length; i++) {
      if (datum[i].support != value) {
        position = i;
        value = datum[i].support;
      }
      datum[i].support_rank = position + 1;
    }

    for (let ds of datum) {
      ds.mean_rank = (ds.log_rank + ds.odd_rank + ds.support_rank) / 3;
      ds.max_rank = Math.max(ds.log_rank, ds.odd_rank, ds.support_rank);
    }

    datum.sort((a, b) => a.mean_rank - b.mean_rank);

    let cutoff = Statistics.percentile(datum.map((o: DeepBlueMiddlewareOverlapEnrichtmentResultItem) => o.mean_rank), (cutoffValue / 100));
    let filtered_data = []
    for (let d of datum) {
      if (d["mean_rank"] <= cutoff) {
        filtered_data.push(d);
      }
    }

    let biosources: { [key: string]: number[] } = {};
    let ems: { [key: string]: number[] } = {};

    for (let ds of filtered_data) {
      let biosource = ds.biosource;
      let em = ds.epigenetic_mark;
      let rank = ds.mean_rank;

      if (!(biosource in biosources)) {
        biosources[biosource] = [];
      }
      biosources[biosource].push(rank);

      if (!(em in ems)) {
        ems[em] = [];
      }
      ems[em].push(rank);
    }

    let biosources_stats: { [key: string]: IStatsResult } = {};
    let ems_stats: { [key: string]: IStatsResult } = {};

    for (let bs in biosources) {
      const results = biosources[bs];
      biosources_stats[bs] = Statistics.calculateStats(biosources[bs]);
    }

    for (let em in ems) {
      const results = ems[em];
      ems_stats[em] = Statistics.calculateStats(ems[em]);
    }

    return {
      "all": datum,
      "biosources": Object.keys(biosources_stats).map((biosource) => [biosource, biosources_stats[biosource]]).sort((a: any, b: any) => a[1].mean - b[1].mean),
      "epigenetic_marks": Object.keys(ems_stats).map((em) => [em, ems_stats[em]]).sort((a: any, b: any) => a[1].mean - b[1].mean)
    }
  }
}
