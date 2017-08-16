import { Component } from '@angular/core';

import {
    Annotation,
    BioSource,
    EpigeneticMark,
    Experiment,
    IdName,
    Technique,
    Project,
} from 'app/domain/deepblue';

import { DeepBlueService } from 'app/service/deepblue';

@Component({
    selector: 'select-deepblue-experiments-component',
    templateUrl: './select-deepblue-experiments.html'
})

export class SelectDeepBlueDataComponent {
    all_epigenetic_marks = new Array<EpigeneticMark>();
    epigenetic_marks = new Array<EpigeneticMark>();
    epigenetic_marks_suggestions = new Array<EpigeneticMark>();

    all_biosources = new Array<BioSource>();
    biosources = new Array<BioSource>();
    biosources_suggestions = new Array<BioSource>();

    all_techniques = new Array<Technique>();
    techniques = new Array<Technique>();
    techniques_suggestions = new Array<Technique>();

    all_projects = new Array<Project>();
    projects = new Array<Project>();
    projects_suggestions = new Array<Project>();

    datatable_columns = [
        { name: 'id', prop: 'id', column_type: 'string' },
        { name: 'name', prop: 'name', column_type: 'string' }
    ];

    experiments: Experiment[] = [];
    selected_experiment: Experiment[] = [];

    constructor(private deepBlueService: DeepBlueService) {
        this.deepBlueService.listEpigeneticMarks().subscribe(data => this.all_epigenetic_marks = data);
        this.deepBlueService.listBioSources().subscribe(data => this.all_biosources = data);
        this.deepBlueService.listTechniques().subscribe(data => this.all_techniques = data);
        this.deepBlueService.listProjects().subscribe(data => this.all_projects = data);
    }

    search_epigenetic_marks(event) {
        this.epigenetic_marks_suggestions = this.all_epigenetic_marks.filter((em: EpigeneticMark) =>
            em.name.toLowerCase().includes(event.query)
        );
    }


    search_biosources(event) {
        this.biosources_suggestions = this.all_biosources.filter((bs: BioSource) =>
            bs.name.toLowerCase().includes(event.query)
        );
    }

    search_techniques(event) {
        this.techniques_suggestions = this.all_techniques.filter((tc: Technique) =>
            tc.name.toLowerCase().includes(event.query)
        );
    }

    search_projects(event) {
        this.projects_suggestions = this.all_projects.filter((pj: Project) =>
            pj.name.toLowerCase().includes(event.query)
        );
    }

    handle_dropdown_epigenetic_marks(event) {
        this.epigenetic_marks_suggestions = this.all_epigenetic_marks;
    }

    handle_dropdown_biosources(event) {
        this.biosources_suggestions = this.all_biosources;
    }

    handle_dropdown_techniques(event) {
        this.techniques_suggestions = this.all_techniques;
    }

    handle_dropdown_project(event) {
        this.projects_suggestions = this.all_projects;
    }

    content_changed(event) {
        console.log(event);
        setTimeout(() =>
            this.deepBlueService.listExperiments(this.epigenetic_marks, this.biosources, this.techniques, this.projects).subscribe((exps: Experiment[]) => {
                this.experiments = exps;
            }), 0);
    }

    select_click() {
        console.log(this.selected_experiment[0]);
    }
}
