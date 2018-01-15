import { Component, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';

import {
    Annotation,
    BioSource,
    EpigeneticMark,
    Experiment,
    IdName,
    Technique,
    Project,
    Gene,
    GeneModel,
} from 'app/domain/deepblue';

import { DeepBlueService } from 'app/service/deepblue';
import { Subscription } from 'rxjs';
import { Dropdown } from 'primeng/primeng';
import { ProgressElement } from 'app/service/progresselement';
import { DeepBlueOperation } from 'app/domain/operations';

@Component({
    selector: 'select-genes-component',
    templateUrl: './select-genes.html'
})

export class SelectGenesComponent implements OnDestroy {
    errorMessage: any;

    @ViewChild('geneModelDropdown') geneModelDropdown: Dropdown;

    menuGeneModel: { label: string; value: GeneModel; }[];
    geneModels: GeneModel[];
    selectedGeneModel: GeneModel;

    gene: Gene = null;
    genes_suggestions = new Array<Gene>();

    selected_genes: Gene[] = [];

    dt_selected_gene: Gene[] = [];

    genomeSubscription: Subscription;

    @Output() queryIdSelected = new EventEmitter();

    datatable_columns = [
        { name: 'name', prop: 'data.gene_name', column_type: 'string' },
        { name: 'id', prop: 'data.gene_id', column_type: 'string' },
    ];

    constructor(private deepBlueService: DeepBlueService, private progress_element: ProgressElement) {
        this.genomeSubscription = deepBlueService.genomeValue$.subscribe(genome => {
            if (genome === null) {
                return;
            }
            this.deepBlueService.getGeneModelsBySelectedGenome().subscribe((geneModels: GeneModel[]) => {
                if (geneModels.length === 0) {
                    return;
                }
                this.geneModels = geneModels;
                this.menuGeneModel = geneModels.map((geneModel: GeneModel) => {
                    const l = { label: geneModel.name, value: geneModel };
                    this.geneModelDropdown.selectItem(null, l);
                    return l;
                });
            },
                error => this.errorMessage = <any>error);
        });
    }

    selectGeneModel(event: any) {
        this.selectedGeneModel = event.value;
    }

    search_genes(event: any) {
        let gene_name = event.query;
        if (gene_name.length < 3) {
            return;
        }
        this.deepBlueService.getComposedListGenes(this.selectedGeneModel.name, event.query).subscribe((genes: Gene[]) => {
            this.genes_suggestions = genes
        });
    }

    selectGenes(event: any) {
        let gene_names = this.selected_genes.map((gene: Gene) => gene.name);
        this.deepBlueService.selectGenes(gene_names, this.selectedGeneModel, this.progress_element, 0).subscribe((operation: DeepBlueOperation) => {
            this.queryIdSelected.emit(operation);
        });
    }

    handle_dropdown_genes(event: any) {
    }

    content_changed() {
        if (this.selected_genes.indexOf(this.gene) == -1) {
            this.selected_genes.push(this.gene);
        }
    }

    select_click() {
        console.debug(this.gene);
    }

    ngOnDestroy() {
        this.genomeSubscription.unsubscribe();
    }
}
