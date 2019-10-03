import { Component, Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { GeneModel } from 'app/domain/deepblue';
import { DeepBlueService } from 'app/service/deepblue';
import { Subscription } from 'rxjs';
import { Dropdown } from 'primeng/components/dropdown/dropdown';

@Component({
  selector: 'select-genes-component',
  templateUrl: './select-genes.html'
})
export class SelectGenesComponent {

  hasError = false;
  errorMessage = "";
  textAreaContent = "";

  menuGeneModel: { label: string; value: GeneModel; }[];
  genomeSubscription: Subscription;
  geneModels: GeneModel[];
  selectedGeneModel: GeneModel;

  request_count = 0;

  @ViewChild('geneModelDropdown', { static: true }) geneModelDropdown: Dropdown;

  @Output() queryIdSelected = new EventEmitter();

  constructor(public deepBlueService: DeepBlueService) {
  };

  ngAfterViewInit() {
    this.genomeSubscription = this.deepBlueService.genomeValue$.subscribe(genome => {
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
          this.geneModelDropdown.selectItem({}, l);
          return l;
        });
      },
        error => this.errorMessage = <any>error);
    });
  }

  selectGeneModel(event: any) {
    this.selectedGeneModel = event.value;
  }

  onUploadClick() {
    let ids = this.textAreaContent.trim();
    let lines = ids.split("\n");

    let genes = new Array<string>();
    let gos = new Array<string>();

    for (let line of lines) {
      line = line.trim();
      if (!line) {
        continue;
      }
      if (line.startsWith("GO:")) {
        gos.push(line.trim());
      } else {
        genes.push(line.trim());
      }
    }

    console.log(gos);
    console.log(genes);

    this.request_count++;
    this.deepBlueService.selectGenes(genes, gos, this.selectedGeneModel).subscribe((op) => {
      if (op.dataType() == "error") {
        this.hasError = true;
        this.errorMessage = op.text();
      } else {
        this.queryIdSelected.emit(op)
      }
    });
  }

  demo = `GO:0005654
  ADI1
  AGO1
  AHCYL2
  AJAP1
  APOBEC3C
  APOBEC3D
  ARHGEF38
  ATPAF2
  BCOR
  BMPR1A
  BRINP2
  C1R
  C2orf91
  CBY1
  CD200
  CD99L2
  CDH10
  CDX2
  CLDN9
  DAGLB
  DEFB113
  DEFB114
  DHDDS
  DHFR
  DPH6
  DPPA5
  DUSP12
  DUSP6
  E2F7
  ETS1
  EXOC7
  FAM120B
  FAM227A
  FCHO1
  FLAD1
  FOXD1
  GDF11
  GH1
  GID4
  GIMAP5
  GOLGA6A
  GOLGA6D
  GPRC5B
  GRID2
  HDAC9
  HES3
  ICMT
  KIAA1919
  LEFTY1
  LFNG
  LINGO1
  LRRTM3
  MAMDC2
  MSH3
  MTRNR2L1
  MTRNR2L2
  MTRNR2L8
  MUC1
  NADK
  NANOG
  NDUFA4L2
  NES
  NFE2L3
  NMNAT3
  PCSK1
  PF4
  PHC1
  PIPOX
  POLR2A
  POU5F1
  PPBP
  PRICKLE1
  REST
  RGPD2
  RMND5B
  RNF219
  SFRP2
  SHCBP1L
  SHISA5
  SLC2A14
  SLC35G6
  SLITRK3
  SLTM
  SMARCA2
  SNRPN
  SNX16
  SOX2
  SRRM4
  STAT3
  TACC2
  TALDO1
  TFE3
  TGIF2
  TMPRSS11E
  UBD
  USP44
  USP7
  WDR74
  WNT5B
  ZBTB4`
}