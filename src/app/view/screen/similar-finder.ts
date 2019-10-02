import { Component, ViewChild, OnDestroy } from '@angular/core';

import { DeepBlueService } from "app/service/deepblue";
import { IOperation } from 'app/domain/interfaces';
import { SimilarityBarChartComponent } from 'app/view/component/charts/similarity';
import { DeepBlueMiddlewareOverlapEnrichtmentResultItem } from 'app/domain/operations';
import { RequestManager } from 'app/service/requests-manager';
import { Subscription } from 'rxjs';
import { SimilarDatasets } from '../../algorithms/similar-datasets';
import { SelectedData } from 'app/service/selected-data';
import { ConfirmationService } from 'primeng/components/common/confirmationservice';

@Component({
    templateUrl: './similar-finder.html'
})
export class SimilarFinder implements OnDestroy {


    @ViewChild('biosourcessimilaritybarchart', { static: true }) biosourcessimilaritybarchart: SimilarityBarChartComponent;
    @ViewChild('emssimilaritybarchart', { static: true }) emssimilaritybarchart: SimilarityBarChartComponent;

    stackSubscriber: Subscription;

    cutoffOptions = [
        { label: '1%', value: 1 },
        { label: '3%', value: 3 },
        { label: '5%', value: 5 },
        { label: '10%', value: 10 },
        { label: '15%', value: 15 },
        { label: '20%', value: 20 },
        { label: '35%', value: 35 },
        { label: '50%', value: 50 },
        { label: '65%', value: 65 },
        { label: '80%', value: 80 },
        { label: '90%', value: 90 },
        { label: '100%', value: 100 }
    ];

    cutoffValue = 3;

    orderOptions = [
        { label: 'Most similar', value: "desc" },
        { label: 'Most dissimilar', value: "asc" }
    ];

    orderDirection = "desc";

    prevDatum: DeepBlueMiddlewareOverlapEnrichtmentResultItem[] = null;

    constructor(private confirmationService: ConfirmationService,
        private deepBlueService: DeepBlueService, public requestManager: RequestManager,
        private selectedData: SelectedData) {

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
        SimilarDatasets.processSimilar(data, this.reloadData, this, this.deepBlueService, this.requestManager);
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

        SimilarDatasets.sortDatasets(_self.deepBlueService, _self.cutoffValue, _self.orderDirection, datum).subscribe((sortedData) => {
            _self.plot("Similar BioSources", sortedData['biosources'], _self.biosourcessimilaritybarchart, _self.biosourceElementClick)
            _self.plot("Similar Epigenetic Marks", sortedData['epigenetic_marks'], _self.emssimilaritybarchart, _self.epigeneticMarkElementClick)
        })
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
        const category: string = point.category.trim();

        let bs = _self.deepBlueService.getBioSourceByName(category);
        _self.deepBlueService.addSelectedBiosource(bs);
        _self.deepBlueService.getRelatedBioSources(bs).subscribe((bss) => {
            if (bss[1].length > 1) {
                let s: any = bss[1];
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
