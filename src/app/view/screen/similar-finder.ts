import { Component, OnInit, ViewChild } from '@angular/core';

import { MenuItem } from 'primeng/primeng';
import { DeepBlueService } from "app/service/deepblue";
import { SelectedData } from "app/service/selecteddata";
import { IOperation } from 'app/domain/interfaces';
import { ProgressElement } from 'app/service/progresselement';
import { SimilarityBarChartComponent } from 'app/view/component/charts/similarity';
import { DeepBlueMiddlewareOverlapEnrichtmentResultItem, DeepBlueMiddlewareOverlapResult } from 'app/domain/operations';
import { Statistics, IStatsResult } from 'app/service/statistics';
import { BioSource } from 'app/domain/deepblue';
import { RequestManager } from 'app/service/requests-manager';

@Component({
    templateUrl: './similar-finder.html'
})
export class SimilarFinder {

    @ViewChild('biosourcessimilaritybarchart') biosourcessimilaritybarchart: SimilarityBarChartComponent;
    @ViewChild('emssimilaritybarchart') emssimilaritybarchart: SimilarityBarChartComponent;

    constructor(private deepBlueService: DeepBlueService, public requestManager: RequestManager,
        public progress_element: ProgressElement, private selectedData: SelectedData) {
        this.selectedData.getActiveTopStackValue().subscribe((dataStackItem) => {
            if (dataStackItem) {
                this.processSimilar(dataStackItem.op)
            }
        });
    }

    visibleSidebar2 = false;

    processSimilar(data: IOperation) {
        this.deepBlueService.composedCalculateFastsEnrichment(data).subscribe((request) => {
            this.requestManager.enqueueRequest(request)
            this.deepBlueService.getComposedResultIterator(request, this.progress_element, 'overlaps_enrichment_fast', this.reloadData, this)
                .subscribe((result: DeepBlueMiddlewareOverlapEnrichtmentResultItem[]) => {
                    const end = new Date().getTime();
                    // Now calculate and output the difference
                    this.reloadData(this, result);
                })
        })
    }

    reloadData(_self: SimilarFinder, datum: DeepBlueMiddlewareOverlapEnrichtmentResultItem[]) {
        if ((!datum) || (datum.length == 0)) {
            return;
        }

        datum.sort((a: DeepBlueMiddlewareOverlapEnrichtmentResultItem, b: DeepBlueMiddlewareOverlapEnrichtmentResultItem) => b.p_value_log - a.p_value_log)
        let position = 0;
        let value = datum[0].p_value_log;
        for (let i = 0; i < datum.length; i++) {
            if (datum[i].p_value_log != value) {
                position = i;
                value = datum[i].p_value_log;
            }
            datum[i].log_rank = position + 1;
        }

        datum.sort((a: DeepBlueMiddlewareOverlapEnrichtmentResultItem, b: DeepBlueMiddlewareOverlapEnrichtmentResultItem) => b.log_odds_ratio - a.log_odds_ratio);
        position = 0;
        value = datum[0].log_odds_ratio;
        for (let i = 0; i < datum.length; i++) {
            if (datum[i].log_odds_ratio != value) {
                position = i;
                value = datum[i].log_odds_ratio;
            }
            datum[i]['odd_rank'] = position + 1;
        }

        datum.sort((a, b) => b['support'] - a['support']);
        position = 0;
        value = datum[0]['support'];
        for (let i = 0; i < datum.length; i++) {
            if (datum[i]['support'] != value) {
                position = i;
                value = datum[i]['support'];
            }
            datum[i]['support_rank'] = position + 1;
        }

        for (let ds of datum) {
            ds.mean_rank = (ds.log_rank + ds.odd_rank + ds.support_rank) / 3;
            ds.max_rank = Math.max(ds.log_rank, ds.odd_rank, ds.support_rank);
        }

        datum.sort((a, b) => a.mean_rank - b.mean_rank);

        let cutoff = Statistics.percentile(datum.map((o: DeepBlueMiddlewareOverlapEnrichtmentResultItem) => o.mean_rank), 0.20);
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

        let biosources_data = Object.keys(biosources_stats).map((biosource) => [biosource, biosources_stats[biosource]]).sort((a: any, b: any) => a[1].mean - b[1].mean);
        _self.plot("Similar Biosources", biosources_data, _self.biosourcessimilaritybarchart, _self.biosourceElementClick)

        let ems_data = Object.keys(ems_stats).map((em) => [em, ems_stats[em]]).sort((a: any, b: any) => a[1].mean - b[1].mean);
        _self.plot("Similar Epigenetic Marks", ems_data, _self.emssimilaritybarchart, _self.epigeneticMarkElementClick)
    }

    plot(title: string, datum: any, chart: SimilarityBarChartComponent, clickCallback: any) {
        if (!datum) {
            return;
        }

        const categories: string[] = datum.map((o: any) => o[0]);

        const series: Array<Object> = [];

        const stack_values_result_boxplot: Array<Object> = [];

        for (let data of datum) {
            stack_values_result_boxplot.push([
                data[1]['low'],
                data[1]['q1'],
                data[1]['median'],
                data[1]['q3'],
                data[1]['high']
            ]);
        }

        series.push({
            type: 'boxplot',
            name: "Similar",
            data: stack_values_result_boxplot,
        });

        chart.setNewData(title, categories, series, this, clickCallback);
    }

    biosourceElementClick(click: any, _self: SimilarFinder) {
        const point = click.point;
        const category = point.category;

        let bs = _self.deepBlueService.getBioSourceByName(category);
        _self.deepBlueService.addSelectedBiosource(bs);
    }

    epigeneticMarkElementClick(click: any, _self: SimilarFinder) {
        const point = click.point;
        const category = point.category;
        console.log("em:", category);
    }
}