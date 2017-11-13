import { Component, OnInit, ViewChild } from '@angular/core';

import { MenuItem } from 'primeng/primeng';
import { DeepBlueService } from "app/service/deepblue";
import { SelectedData } from "app/service/selecteddata";
import { IOperation } from 'app/domain/interfaces';
import { ProgressElement } from 'app/service/progresselement';
import { OverlapsBarChartComponent } from 'app/view/component/charts/overlappingbar';

@Component({
    templateUrl: './data-selection.html'
})
export class DataSelectionScreen {

    selected_data: IOperation;

    @ViewChild('biosourcessimilaritybarchart') biosourcessimilaritybarchart: OverlapsBarChartComponent;
    @ViewChild('emssimilaritybarchart') emssimilaritybarchart: OverlapsBarChartComponent;

    constructor(private deepBlueService: DeepBlueService, public progress_element: ProgressElement,
        private selectedData: SelectedData) {
    }

    selectQuery(event: IOperation) {
        this.selected_data = event;
        this.deepBlueService.setDataToDive(this.selected_data);
        this.deepBlueService.composedCalculateFastsEnrichment(this.selected_data).subscribe((request_id) =>

            this.deepBlueService.getComposedResultIterator(request_id, this.progress_element, 'overlaps_enrichment', this.reloadData, this)
                .subscribe((result: Object[]) => {
                    const end = new Date().getTime();
                    // Now calculate and output the difference
                    console.log(result);
                })
        )
    }

    reloadData(_self: DataSelectionScreen, datum: any) {
        let biosources_data = datum['biosources'];
        _self.plot(biosources_data, _self.biosourcessimilaritybarchart)

        let ems_data = datum['epigenetic_marks'];
        _self.plot(ems_data, _self.emssimilaritybarchart)
    }

    plot(datum: any, chart: OverlapsBarChartComponent) {
        if (!datum) {
            return;
        }

        const categories: string[] = datum.map((o: any) => o[0]);

        const series: Array<Object> = [];

        const stack_values_result: Array<number> = [];
        const stack_values_result_boxplot: Array<Object> = [];

        for (let data of datum) {
            stack_values_result.push(data[1]['mean']);
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

        series.push({
            type: 'column',
            name: "Similar",
            data: stack_values_result
        });

        let cccategories = ["bone marrow", "myeloid cell"];
        let ssseries = [
            {
                "type": "boxplot",
                "name": "C000S5H1.ERX149095.H3K27ac.bwa.GRCh38.20150527.bed",
                "data": [[28615, 29200.5, 29786, 30371.5, 30957], [15299, 22613, 28382, 35165.5, 38309]],
                "color": "rgba(52,142,0,1)"
            },
            {
                "type": "column",
                "name": "C000S5H1.ERX149095.H3K27ac.bwa.GRCh38.20150527.bed",
                "data": [29786, 28221],
                "color": "rgba(52,142,0,0.3)"
            }
        ]

        chart.setNewData(categories, series, null);
    }

    selectAnnotationForComparison(selectedAnnotation: any) {
        this.selectedData.insertForComparison(selectedAnnotation);
    }
}