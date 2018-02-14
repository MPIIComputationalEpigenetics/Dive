import { Component, OnInit, ViewChild } from '@angular/core';

import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { MenuItem } from 'primeng/primeng';
import { DeepBlueService } from "app/service/deepblue";
import { SelectedData } from "app/service/selecteddata";
import { IOperation } from 'app/domain/interfaces';
import { ProgressElement } from 'app/service/progresselement';
import { SimilarityBarChartComponent } from 'app/view/component/charts/similarity';
import { DeepBlueMiddlewareOverlapEnrichtmentResultItem } from 'app/domain/operations';
import { Statistics, IStatsResult } from 'app/service/statistics';
import { BioSource } from 'app/domain/deepblue';
import { RequestManager } from 'app/service/requests-manager';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
    templateUrl: './similar-finder.html'
})
export class SimilarFinder implements OnDestroy {

    @ViewChild('biosourcessimilaritybarchart') biosourcessimilaritybarchart: SimilarityBarChartComponent;
    @ViewChild('emssimilaritybarchart') emssimilaritybarchart: SimilarityBarChartComponent;

    visibleSidebar2 = false;
    stackSubscriber: Subscription;

    cutoffOptions = [
        {label: '1%', value: 1},
        {label: '5%', value: 5},
        {label: '10%', value: 10},
        {label: '20%', value: 20},
        {label: '35%', value: 35},
        {label: '50%', value: 50},
        {label: '65%', value: 65},
        {label: '100%', value: 100}
    ];

    cutoffValue = 20;

    orderOptions = [
        {label: 'Most similar', value: this.desc_func},
        {label: 'Most dissimilar', value: this.asc_func}
    ];

    orderFunction = this.desc_func;

    prevDatum: DeepBlueMiddlewareOverlapEnrichtmentResultItem[] = null;

    constructor(private confirmationService: ConfirmationService,
        private deepBlueService: DeepBlueService, public requestManager: RequestManager,
        public progress_element: ProgressElement, private selectedData: SelectedData) {

        this.stackSubscriber = this.selectedData.activeTopStackValue$.subscribe((dataStackItem) => {
            if (dataStackItem) {
                this.processSimilar(dataStackItem.op)
            }
        });
    }

    ngOnDestroy(): void {
        this.stackSubscriber.unsubscribe();
    }

    processSimilar(data: IOperation) {
        this.deepBlueService.composedCalculateFastsEnrichment(data).subscribe((request) => {
            this.requestManager.enqueueRequest(request)
            this.deepBlueService.getComposedResultIterator(request, this.progress_element, 'overlaps_enrichment_fast', this.reloadData, this)
                .subscribe((result: DeepBlueMiddlewareOverlapEnrichtmentResultItem[]) => {
                    this.reloadData(this, result);
                })
        })
    }

    desc_func(a: any, b: any, column: string) {
        return b[column] - a[column];
    }

    asc_func(a: any, b: any, column: string) {
        return a[column] - b[column];
    }

    reloadData(_self: SimilarFinder, datum: DeepBlueMiddlewareOverlapEnrichtmentResultItem[]) {
        if (!_self) {
            _self = this;
        }

        if (!datum) {
            datum = this.prevDatum;
        } else {
            _self.prevDatum = datum;
        }

        if ((!datum) || (datum.length == 0)) {
            return;
        }

        datum.sort((a, b) => _self.orderFunction(a, b, 'p_value_log'));
        let position = 0;
        let value = datum[0].p_value_log;
        for (let i = 0; i < datum.length; i++) {
            if (datum[i].p_value_log != value) {
                position = i;
                value = datum[i].p_value_log;
            }
            datum[i].log_rank = position + 1;
        }

        datum.sort((a, b) => _self.orderFunction(a, b, 'odds_ratio'));
        position = 0;
        value = datum[0].odds_ratio;
        for (let i = 0; i < datum.length; i++) {
            if (datum[i].odds_ratio != value) {
                position = i;
                value = datum[i].odds_ratio;
            }
            datum[i].odd_rank = position + 1;
        }

        datum.sort((a, b) => _self.orderFunction(a, b, 'support'));
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

        let cutoff = Statistics.percentile(datum.map((o: DeepBlueMiddlewareOverlapEnrichtmentResultItem) => o.mean_rank), (_self.cutoffValue / 100));
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
        _self.plot("Similar BioSources", biosources_data, _self.biosourcessimilaritybarchart, _self.biosourceElementClick)

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
        const category : string = point.category.trim();

        let bs = _self.deepBlueService.getBioSourceByName(category);
        _self.deepBlueService.addSelectedBiosource(bs);
        _self.deepBlueService.getRelatedBioSources(bs).subscribe((bss) => {
            if (bss[1].length > 1) {
                let s : any = bss[1];
                console.log(s)
                let text = "<ul>" + s.map((ss: string) => "<li>" + ss + "</li>").join("") + "</ul>";
                console.log(text);
                _self.confirmationService.confirm({
                    message: text,
                    accept: () => {
                        for (let similar of bss[1]) {
                            let bs = _self.deepBlueService.getBioSourceByName(similar);
                            _self.deepBlueService.addSelectedBiosource(bs);
                        }
                    }
                });
            }
        });
    }

    epigeneticMarkElementClick(click: any, _self: SimilarFinder) {
        const point = click.point;
        const category = point.category;
    }
}
