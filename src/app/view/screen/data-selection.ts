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

    @ViewChild('similaritybarchart') similaritybarchart: OverlapsBarChartComponent;

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
        if (!datum) {
            return;
        }

        //[["conventional dendritic cell",{"low":245,"q1":315.5,"median":642,"q3":1137,"high":1274,"mean":723.7142857142857,"elements":7}],["immature conventional dendritic cell",{"low":7,"q1":248.75,"median":715.5,"q3":1121,"high":1760,"mean":767.1666666666666,"elements":24}],["hematopoietic multipotent progenitor cell",{"low":256,"q1":263.5,"median":768,"q3":1274.25,"high":1287,"mean":769.75,"elements":4}],["lymphatic system",{"low":309,"q1":400,"median":834,"q3":1057.75,"high":1176,"mean":776.6176470588235,"elements":34}],["DG-75",{"low":7,"q1":451,"median":742,"q3":1191,"high":1645,"mean":811.1428571428571,"elements":7}],["CD8-positive, alpha-beta thymocyte",{"low":237,"q1":244,"median":1146,"q3":1209,"high":1221,"mean":811.4,"elements":5}],["band form neutrophil",{"low":7,"q1":306.5,"median":776,"q3":1179,"high":1686,"mean":830.3928571428571,"elements":28}],["adult endothelial progenitor cell",{"low":7,"q1":367.5,"median":763.5,"q3":1177.5,"high":1678,"mean":839.5555555555555,"elements":18}],["CD4-positive, alpha-beta thymocyte",{"low":239,"q1":453.25,"median":1123.5,"q3":1193.75,"high":1205,"mean":856.3333333333334,"elements":6}],["CD3-positive, CD4-positive, CD8-positive, double positive thymocyte",{"low":225,"q1":341.25,"median":931,"q3":1095.25,"high":2075,"mean":862.25,"elements":12}],["germinal center B cell",{"low":7,"q1":345,"median":768,"q3":1215.5,"high":1579,"mean":865.925925925926,"elements":27}],["central memory CD4-positive, alpha-beta T cell",{"low":7,"q1":335.75,"median":834,"q3":1172.25,"high":2070,"mean":871.5833333333334,"elements":12}],["bone marrow",{"low":7,"q1":594.25,"median":774.5,"q3":1196.5,"high":2400,"mean":891.875,"elements":16}],["erythroblast",{"low":7,"q1":519,"median":1000,"q3":1180.5,"high":1637,"mean":899.375,"elements":24}],["inflammatory macrophage",{"low":7,"q1":320,"median":854,"q3":1238,"high":2474,"mean":903.7123287671233,"elements":73}],["alternatively activated macrophage",{"low":7,"q1":342,"median":973,"q3":1234,"high":2684,"mean":928.8307692307692,"elements":65}],["CD8-positive, alpha-beta T cell",{"low":7,"q1":380,"median":995,"q3":1326,"high":2437,"mean":935.3777777777777,"elements":45}],["effector memory CD8-positive, alpha-beta T cell, terminally differentiated",{"low":291,"q1":332.5,"median":818.5,"q3":1240.75,"high":2496,"mean":953.625,"elements":8}],["endothelial cell of umbilical vein ",{"low":7,"q1":371.25,"median":945,"q3":1305,"high":2516,"mean":957.5882352941177,"elements":34}],["class switched memory B cell",{"low":7,"q1":355.5,"median":973,"q3":1518,"high":2474,"mean":968.4074074074074,"elements":27}],["CD14-positive, CD16-negative classical monocyte",{"low":3,"q1":851.5,"median":980.5,"q3":1124.5,"high":2431,"mean":989.6159420289855,"elements":138}],["cytotoxic CD56-dim natural killer cell",{"low":7,"q1":418,"median":1007.5,"q3":1232.25,"high":2515,"mean":992.6315789473684,"elements":38}],["effector memory CD4-positive, alpha-beta T cell",{"low":269,"q1":333,"median":1058,"q3":1551,"high":2076,"mean":1016.6666666666666,"elements":9}],["BL-2",{"low":7,"q1":585.5,"median":987,"q3":1319,"high":2415,"mean":1031.142857142857,"elements":7}],["capillary blood",{"low":7,"q1":585,"median":845,"q3":1557,"high":2545,"mean":1042.162162162162,"elements":37}],["CD34-negative, CD41-positive, CD42-positive megakaryocyte cell",{"low":7,"q1":559,"median":1082,"q3":1255.25,"high":2710,"mean":1075.357142857143,"elements":28}],["lymphocyte of B lineage",{"low":7,"q1":823.5,"median":923,"q3":1076,"high":2581,"mean":1085.2727272727273,"elements":11}],["CD4-positive, alpha-beta T cell",{"low":7,"q1":534,"median":1032,"q3":1551,"high":2710,"mean":1110.4943820224719,"elements":89}],["CD38-negative naive B cell",{"low":7,"q1":382,"median":1121,"q3":1578,"high":2633,"mean":1134.4666666666667,"elements":45}],["central memory CD8-positive, alpha-beta T cell",{"low":305,"q1":604.25,"median":1204,"q3":1314,"high":2420,"mean":1148,"elements":6}],["KARPAS-422",{"low":7,"q1":724,"median":1050,"q3":1116,"high":2614,"mean":1163.5555555555557,"elements":9}],["CD3-negative, CD4-positive, CD8-positive, double positive thymocyte",{"low":220,"q1":858.75,"median":1120,"q3":2071.5,"high":2305,"mean":1276.25,"elements":8}],["memory B cell",{"low":278,"q1":572.5,"median":1661.5,"q3":2494,"high":2715,"mean":1549.5,"elements":6}]]

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

        debugger;
        _self.similaritybarchart.setNewData(categories, series, null);
        console.log("RELOADING DATA: ", datum.length, datum);
    }

    selectAnnotationForComparison(selectedAnnotation: any) {
        this.selectedData.insertForComparison(selectedAnnotation);
    }
}