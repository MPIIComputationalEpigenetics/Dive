import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';

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
import { SimilarDatasets } from '../../algorithms/similar-datasets';

@Component({
    templateUrl: './similar-finder.html'
})
export class SimilarFinder implements OnDestroy {


    @ViewChild('biosourcessimilaritybarchart') biosourcessimilaritybarchart: SimilarityBarChartComponent;
    @ViewChild('emssimilaritybarchart') emssimilaritybarchart: SimilarityBarChartComponent;

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
        {label: 'Most similar', value: "desc"},
        {label: 'Most dissimilar', value: "asc"}
    ];

    orderDirection = "desc";

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
            this.requestManager.cancelAllRequest();
            this.requestManager.enqueueRequest(request)
            this.deepBlueService.getComposedResultIterator(request, this.progress_element, 'overlaps_enrichment_fast', this.reloadData, this)
                .subscribe((result: DeepBlueMiddlewareOverlapEnrichtmentResultItem[]) => {
                    this.reloadData(this, result);
                })
        })
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

        let sortedData = SimilarDatasets.sortDatasets(_self.cutoffValue, _self.orderDirection, datum);

        _self.plot("Similar BioSources", sortedData['biosources'], _self.biosourcessimilaritybarchart, _self.biosourceElementClick)
        _self.plot("Similar Epigenetic Marks", sortedData['epigenetic_marks'], _self.emssimilaritybarchart, _self.epigeneticMarkElementClick)
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
