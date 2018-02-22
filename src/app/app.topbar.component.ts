import { Component, Inject, forwardRef, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from './app.component';
import { SelectItem, Dropdown } from 'primeng/primeng';
import { DeepBlueService } from './service/deepblue';
import { MultiSelect } from 'primeng/components/multiselect/multiselect';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="topbar-left">
                <div class="logo"></div>
            </div>

            <div class="topbar-right">
                <a id="menu-button" href="#" (click)="app.onMenuButtonClick($event)">
                    <i></i>
                </a>

                <a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
                    <i class="material-icons">menu</i>
                </a>

                <div id="rightpanel-menu-button">
                    <p-toolbar>
                        <div class="ui-toolbar-group-right">
                            <div class="ui-inputgroup">
                                <span class="ui-inputgroup-addon" style="border-style: none">Genome</span>
                                <p-dropdown #genomesDropdown [options]="genomeItems" [style]="{'width':'75px'}" (onChange)="selectGenome($event)"  [(ngModel)]="selectedGenome"></p-dropdown>
                            </div>
                            <div class="ui-inputgroup">
                                <span class="ui-inputgroup-addon" style="border-style: none">Projects</span>
                                <p-multiSelect #multiselect [defaultLabel]="defaultSelectProjects" [options]="projectItems" [(ngModel)]="selectedProjects" (onChange)="selectProjects($event)">
                                </p-multiSelect>
                            </div>
                        </div>
                    </p-toolbar>

                </div>

            </div>
        </div>

    `
})
export class AppTopBar implements OnInit {

    genomeItems: SelectItem[] = [];
    selectedGenome: any = null;

    projectItems: SelectItem[] = [];
    selectedProjects: Object[] = [];
    defaultSelectProjects = 'Select the Projects';

    @ViewChild('genomesDropdown') genomesDropdown: Dropdown;
    @ViewChild('multiselect') multiselect: MultiSelect;

    constructor(@Inject(forwardRef(() => AppComponent)) public app: AppComponent,
        private deepBlueService: DeepBlueService) {
    }

    ngOnInit(): void {
        this.deepBlueService.getGenomes().subscribe(genomes => {
            this.deepBlueService.setGenome(genomes[0]);

            for (let genome of genomes) {
                let item = { label: genome.name, value: genome };
                this.genomeItems.push(item);
                if (!this.selectedGenome) {
                    this.genomesDropdown.selectItem(null, item);
                }
            }

            this.deepBlueService.listProjects().subscribe((projects) => {
                for (let project of projects) {
                    let item = { label: project.name, value: project };
                    this.projectItems.push(item);
                    this.selectedProjects.push(item.value);
                }
                this.selectProjects({value: projects});
                this.multiselect.updateLabel();
            })
        });

    }

    selectGenome($event: any) {
        this.deepBlueService.setGenome($event.value);
    }

    selectProjects($event: any) {
        debugger;
        this.deepBlueService.setProjects($event.value);
    }
}