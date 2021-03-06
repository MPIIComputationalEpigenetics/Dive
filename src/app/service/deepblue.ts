import { DataLoadProgressBar } from '../view/component/progressbar';
import { Injectable } from '@angular/core';

import { HttpParams } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import {
    Annotation,
    BioSource,
    EpigeneticMark,
    Experiment,
    FullAnnotation,
    FullExperiment,
    FullGeneModel,
    FullMetadata,
    GeneModel,
    Genome,
    IdName,
    Technique,
    Project,
    Gene,
    Id
} from '../domain/deepblue';

import { IKey, IDataParameter } from '../domain/interfaces';

import {
    DeepBlueMiddlewareGOEnrichtmentResult,
    DeepBlueOperation,
    DeepBlueRequest,
    DeepBlueResult,
    DeepBlueFilterParameters,
    DeepBlueTiling,
    DeepBlueMiddlewareOverlapEnrichtmentResult,
    DeepBlueDataParameter,
    DeepBlueOperationArgs,
    StackValue,
    DeepBlueMiddlewareRequest,
    DeepBlueMiddlewareOverlapEnrichtmentResultItem,
    AbstractDeepBlueRequest,
    toClass,
    DeepBlueEmptyParameter,
    DeepBlueOperationError,
    DeepBlueFilter,
    DeepBlueIntersection,
    DeepBlueExtend,
    DeepBlueFlank,
    DeepBlueFilterMotifParameters,
} from '../domain/operations';

import { ProgressElement } from '../service/progresselement';

import { ICloneable, IOperation } from '../domain/interfaces';
import { MiddlewareProxy } from './middleware-proxy';


export class DataCache<T extends IKey, V extends ICloneable> {

    constructor(private _data: Map<string, V> = new Map()) { }

    put(key: T, value: V) {
        const cloneValue = value.clone(-1);
        this._data.set(key.key(), cloneValue);
    }

    get(key: T, request_count: number): V {
        const value: V = this._data.get(key.key());
        if (value) {
            return value.clone(request_count);
        } else {
            return null;
        }
    }
}

export class MultiKeyDataCache<T extends IKey, V extends ICloneable> {

    constructor(private _data: Map<string, V> = new Map()) { }

    put(keys: T[], value: V) {
        const key_value = keys.map((k) => k.key()).join();
        const cloneValue = value.clone(-1);
        this._data.set(key_value, cloneValue);
    }

    get(keys: T[], request_count: number): V {
        const key_value = keys.map((k) => k.key()).join();
        const value: V = this._data.get(key_value);
        if (value) {
            return value.clone(request_count);
        } else {
            return null;
        }
    }
}

@Injectable()
export class DeepBlueService {

    // Observable string sources
    public genomeSource = new BehaviorSubject<Genome>(null);
    public projectsSource = new BehaviorSubject<Project[]>(null);
    public dataToDiveSource = new BehaviorSubject<IOperation>(null);
    public epigeneticMarkSource = new BehaviorSubject<EpigeneticMark>(new EpigeneticMark(['', '']));
    public selectedBioSources = new BehaviorSubject<BioSource[]>([]);

    // Observable string streams
    genomeValue$ = this.genomeSource.asObservable();
    projectsValue$ = this.projectsSource.asObservable();
    dataToDiveValue$ = this.dataToDiveSource.asObservable();
    epigeneticMarkValue$ = this.epigeneticMarkSource.asObservable();
    selectedBioSourcesValue$ = this.selectedBioSources.asObservable();

    idNamesQueryCache = new DataCache<IdName, DeepBlueOperation>();
    overlapsQueryCache = new DataCache<IKey, DeepBlueOperation>();
    filtersQueryCache = new DataCache<IKey, DeepBlueOperation>();
    operationCache = new DataCache<IOperation, IOperation>();
    requestCache = new DataCache<IOperation, DeepBlueRequest>();
    resultCache = new DataCache<DeepBlueRequest, DeepBlueResult>();

    // Service messages
    setGenome(genome: Genome) {
        let actual = this.genomeSource.getValue();
        if (genome && !genome.equals(actual)) {
            this.genomeSource.next(genome);
        }
    }

    setProjects(projects: Project[]) {
        let actual = this.projectsSource.getValue();

        if (projects == actual) {
            return;
        }

        if ((projects && !actual) || (!projects && actual)) {
            this.projectsSource.next(projects);
            return;
        }

        if (actual.length != projects.length) {
            this.projectsSource.next(projects);
        } else {
            actual.sort();
            projects.sort();
            for (let i = 0; i < actual.length; i++) {
                if (!actual[i].id.equals(projects[i].id)) {
                    console.log("[2s] setting projects", projects);
                    this.projectsSource.next(projects);
                    return;
                }
            }
        }
    }

    /* Define the annotation that we are going to dive */
    setDataToDive(dataToDive: IOperation) {
        let actual = this.dataToDiveSource.getValue();

        if (dataToDive == actual) {
            return;
        }

        if ((dataToDive && !actual) || (!dataToDive && actual)) {
            this.dataToDiveSource.next(dataToDive);
            return;
        }

        if (dataToDive && !dataToDive.id().equals(actual.id())) {
            this.dataToDiveSource.next(dataToDive);
        }
    }

    setEpigeneticMark(epigeneticMark: EpigeneticMark) {
        let actual = this.epigeneticMarkSource.getValue();
        if (epigeneticMark && !epigeneticMark.equals(actual)) {
            this.epigeneticMarkSource.next(epigeneticMark);
        }
    }

    getGenome(): Genome {
        return this.genomeSource.getValue();
    }

    getDivingData(): IOperation {
        return this.dataToDiveSource.getValue();
    }

    getSelectedEpigeneticMark(): EpigeneticMark {
        return this.epigeneticMarkSource.getValue();
    }

    //

    constructor(private middleware: MiddlewareProxy, public progress_element: ProgressElement) {
        console.info('Starting DeepBlue Service');
    }

    // Functions to select data from the Server


    genomeToEpigeneticMarks = new Map<string, Observable<EpigeneticMark[]>>();
    genomeToEpigeneticMarksResult = new Map<string, EpigeneticMark[]>();
    listEpigeneticMarks(): Observable<EpigeneticMark[]> {
        if (!this.getGenome()) {
            return Observable.empty<EpigeneticMark[]>();
        }

        let genome = this.getGenome().name;
        if (this.genomeToEpigeneticMarksResult.has(genome)) {
            return Observable.of(this.genomeToEpigeneticMarksResult.get(genome));
        }

        if (this.genomeToEpigeneticMarks.has(genome)) {
            return this.genomeToEpigeneticMarks.get(genome);
        }

        const params = new HttpParams()
            .set('genome', this.getGenome().name)
            .set('controlled_vocabulary', 'epigenetic_marks')
            .set('type', 'peaks');

        let bsObserver = this.middleware.get('collection_experiments_count', params)
            .map(this.extractEpigeneticMarks).share();


        this.genomeToEpigeneticMarks.set(genome, bsObserver);
        bsObserver.subscribe((result) => {
            this.genomeToEpigeneticMarksResult.set(genome, result);
        })

        return bsObserver;
    }

    getEpigeneticMarkByNameObservable(name: string): Observable<EpigeneticMark> {
        let genome = this.getGenome().name;
        if (!this.genomeToEpigeneticMarksResult.has(genome)) {
            return this.listEpigeneticMarks().flatMap(() => Observable.of(this.getEpigeneticMarkByName(name)));
        } else {
            return Observable.of(this.getEpigeneticMarkByName(name));
        }
    }

    getEpigeneticMarkByName(name: string): EpigeneticMark {
        if (!name) {
            return null;
        }

        let genome = this.getGenome().name;

        if (!this.genomeToEpigeneticMarksResult.has(genome)) {
            return null;
        }

        let cache = this.genomeToEpigeneticMarksResult.get(genome);
        for (let epigenetic_mark of cache) {
            if (epigenetic_mark.name.toLowerCase().replace(/[\W_]+/g, "") == name.toLowerCase().replace(/[\W_]+/g, "")) {
                return epigenetic_mark;
            }
        }
        return null;
    }

    getHistones(): Observable<EpigeneticMark[]> {
        if (!this.getGenome()) {
            return Observable.empty<EpigeneticMark[]>();
        }
        const params = new HttpParams()
            .set('genome', this.getGenome().name)
            .set('controlled_vocabulary', 'epigenetic_marks')
            .set('type', 'peaks');

        return this.middleware.get('collection_experiments_count', params)
            .map(this.extractHistone)
    }

    getChromatinStateSegments(): Observable<string[][]> {
        const params = new HttpParams()
            .set('genome', this.getGenome().name);

        return this.middleware.get('composed_commands/chromatin_states_by_genome', params)
            .map((data: any) => {
                let states = data[1] || [];
                // Remove the numbers and the _
                return Object.keys(states).map((k) => [k, k.replace(/[0-9]+_/, "").replace(/_/g, " ")]).sort();
            });
    }

    getAnnotations(genome: Genome): Observable<Annotation[]> {
        if (!genome) {
            return Observable.empty<Annotation[]>();
        }

        const params = new HttpParams()
            .set('genome', genome.name);

        return this.middleware.get('list_annotations', params)
            .map(this.extractAnnotation)
    }


    genomeToBioSource = new Map<string, Observable<BioSource[]>>();
    genomeToBioSourceResult = new Map<string, BioSource[]>();
    listBioSources(): Observable<BioSource[]> {
        if (!this.getGenome()) {
            return Observable.empty<BioSource[]>();
        }

        let genome = this.getGenome().name;
        if (this.genomeToBioSourceResult.has(genome)) {
            return Observable.of(this.genomeToBioSourceResult.get(genome));
        }

        if (this.genomeToBioSource.has(genome)) {
            return this.genomeToBioSource.get(genome);
        }

        const params = new HttpParams()
            .set('genome', genome)
            .set('controlled_vocabulary', 'biosources')
            .set('type', 'peaks');

        let bsObserver = this.middleware.get('collection_experiments_count', params)
            .map(this.extractBioSources).share();


        this.genomeToBioSource.set(genome, bsObserver);
        bsObserver.subscribe((result) => {
            this.genomeToBioSourceResult.set(genome, result);
        })

        return bsObserver;
    }

    getBioSourceByNameObservable(name: string): Observable<BioSource> {
        let genome = this.getGenome().name;
        if (!this.genomeToBioSourceResult.has(genome)) {
            return this.listBioSources().flatMap(() => Observable.of(this.getBioSourceByName(name)));
        } else {
            return Observable.of(this.getBioSourceByName(name));
        }
    }

    getBioSourceByName(name: string): BioSource {
        if (!name) {
            return null;
        }

        let genome = this.getGenome().name;

        if (!this.genomeToBioSourceResult.has(genome)) {
            return null;
        }

        let cache = this.genomeToBioSourceResult.get(genome);
        for (let biosource of cache) {
            if (biosource.name.toLowerCase().replace(/[\W_]+/g, "") == name.toLowerCase().replace(/[\W_]+/g, "")) {
                return biosource;
            }
        }
        return null;
    }

    listTechniques(): Observable<Technique[]> {
        if (!this.getGenome()) {
            return Observable.empty<Technique[]>();
        }
        const params = new HttpParams()
            .set('genome', this.getGenome().name)
            .set('controlled_vocabulary', 'techniques')
            .set('type', 'peaks');

        return this.middleware.get('collection_experiments_count', params)
            .map(this.extractBioSources)
    }

    listProjects(): Observable<Project[]> {
        if (!this.getGenome()) {
            return Observable.empty<Project[]>();
        }
        const params = new HttpParams()
            .set('genome', this.getGenome().name)
            .set('controlled_vocabulary', 'projects')
            .set('type', 'peaks');

        return this.middleware.get('collection_experiments_count', params)
            .map(this.extractProjects)
    }

    listExperiments(epigenetic_marks: EpigeneticMark[], biosources: BioSource[], techniques: Technique[], projects: Project[]): Observable<Experiment[]> {
        if (!this.getGenome()) {
            return Observable.empty<Project[]>();
        }

        let params = new HttpParams()
            .set('genome', this.getGenome().name)
            .set('controlled_vocabulary', 'projects')
            .set('type', 'peaks');

        epigenetic_marks.forEach(em => {
            params = params.append("epigenetic_mark", em.name);
        });

        biosources.forEach(bs => {
            params = params.append("biosource", bs.name);
        });

        techniques.forEach(tc => {
            params = params.append("technique", tc.name);
        });

        projects.forEach(pj => {
            params = params.append("project", pj.name);
        });

        return this.middleware.get('list_experiments', params)
            .map(this.extractExperiments)
    }

    private extractBioSources(body: any) {
        const data = body[1] || [];
        return data.map((value: string[]) => {
            return new BioSource(value);
        }).sort((a: BioSource, b: BioSource) => a.name.localeCompare(b.name));
    }

    private extractEpigeneticMarks(body: any) {
        const data = body[1] || [];
        return data.map((value: string[]) => {
            return new EpigeneticMark(value);
        }).sort((a: EpigeneticMark, b: EpigeneticMark) => a.name.localeCompare(b.name));
    }

    private extractProjects(body: any) {
        const data = body[1] || [];
        return data.map((value: string[]) => {
            return new Project(value);
        }).sort((a: Project, b: Project) => a.name.localeCompare(b.name));
    }

    private extractExperiments(body: any) {
        const data = body[1] || [];
        return data.map((value: string[]) => {
            return new Experiment(value);
        }).sort((a: Experiment, b: Experiment) => a.name.localeCompare(b.name));
    }

    private extractHistone(body: any) {
        const data = body[1] || [];
        const regexp = new RegExp('h([134]|2[ab])([a-z])([0-9]+)(.*)');

        let filtered_data = data.filter((em: string) => {
            // em[1] is where the name is
            return regexp.test(em[1].toLowerCase());
        }).sort((em1: string, em2: string) => {
            return em1[1].localeCompare(em2[1]);
        });

        return filtered_data.map((value: string[]) => {
            return (new EpigeneticMark(value));
        }).sort((a: IdName, b: IdName) => a.name.localeCompare(b.name));
    };

    private extractFullMetadata(body: any) {
        const data = body[1] || [];
        return data.map((value: string[]) => {
            return FullMetadata.fromObject(value);
        }).sort((a: FullMetadata, b: FullMetadata) => a.name.localeCompare(b.name));
    }

    getGenomes(): Observable<Genome[]> {
        const params = new HttpParams()
            .set('controlled_vocabulary', 'genomes')
            .set('type', 'peaks');

        return this.middleware.get('collection_experiments_count', params)
            .map(this.extractGenomes)
    }

    private extractGenomes(body: any) {
        const data = body[1] || [];
        return data.map((value: string[]) => {
            return new Genome(value);
        }).sort((a: IdName, b: IdName) => a.name.localeCompare(b.name));
    }

    private extractAnnotation(body: any) {
        const data = body[1] || [];
        return data.map((value: string[]) => {
            return new Annotation(value);
        }).sort((a: IdName, b: IdName) => a.name.localeCompare(b.name));
    }

    getExperiments(genome: Genome, epigenetic_mark: IdName | string): Observable<IdName[]> {
        if (!genome) {
            return Observable.empty<IdName[]>();
        }

        if (!epigenetic_mark) {
            return Observable.empty<IdName[]>();
        }

        let epigenetic_mark_name = "";
        if (epigenetic_mark instanceof IdName) {
            epigenetic_mark_name = epigenetic_mark.name;
        } else {
            epigenetic_mark_name = epigenetic_mark;
        }

        const params = new HttpParams()
            .set('genome', genome.name)
            .set('type', 'peaks')
            .set('epigenetic_mark', epigenetic_mark_name);

        return this.middleware.get('list_experiments', params)
            .map((body: any) => {
                const data = body[1] || [];
                return data.map((value: string[]) => {
                    return new Experiment(value);
                });
            })
    }

    addSelectedBiosource(biosource: BioSource) {
        let bss = this.selectedBioSources.value;

        let found = false;
        for (let bs of bss) {
            if (bs.id.id == biosource.id.id) {
                found = true;
            }
        }

        if (!found) {
            bss.push(biosource.clone());
            this.selectedBioSources.next(bss);
        }
    }


    removeSelectedBiosource(biosource: BioSource) {
        let bs = this.selectedBioSources.value;
        let index = bs.indexOf(biosource);
        if (index >= -1) {
            bs.splice(index, 1);
            this.selectedBioSources.next(bs);
        }
    }

    setSelectedBioSources(biosources: BioSource[]) {
        this.selectedBioSources.next(biosources);
    }

    tilingRegions(size: number, chromosomes: string[], request_count: number = -1): Observable<DeepBlueTiling> {
        let params = new HttpParams()
            .set('size', size.toString())
            .set('genome', this.getGenome().name);

        for (let chromosome of chromosomes) {
            params = params.append('chromosome', chromosome);
        }

        return this.middleware.get('tiling_regions', params)
            .map((body: any) => {
                const response: string = body[1] || '';
                const query_id = new Id(response);
                this.progress_element.increment(request_count);
                return new DeepBlueTiling(size, this.getGenome().name, chromosomes, query_id, request_count);
            })
    }

    selectAnnotation(annotation: IdName, request_count: number = -1): Observable<DeepBlueOperation> {
        if (!annotation) {
            return Observable.empty<DeepBlueOperation>();
        }

        if (this.idNamesQueryCache.get(annotation, request_count)) {
            this.progress_element.increment(request_count);
            const cached_operation = this.idNamesQueryCache.get(annotation, request_count);
            return Observable.of(cached_operation);
        }

        const params = new HttpParams()
            .set('annotation_name', annotation.name)
            .set('genome', this.getGenome().name);

        return this.middleware.get('select_annotations', params)
            .map((body: any) => {
                const response: string = body[1] || '';
                const query_id = new Id(response);
                this.progress_element.increment(request_count);
                return new DeepBlueOperation(new DeepBlueDataParameter(annotation), query_id, 'select_annotations', request_count);
            })
            .do((operation) => { this.idNamesQueryCache.put(annotation, operation) })
    }

    selectExperiment(experiment: IdName, request_count: number = -1): Observable<DeepBlueOperation> {
        if (!experiment) {
            return Observable.empty<DeepBlueOperation>();
        }

        if (this.idNamesQueryCache.get(experiment, request_count)) {
            this.progress_element.increment(request_count);
            const cached_operation = this.idNamesQueryCache.get(experiment, request_count);
            return Observable.of(cached_operation);
        }

        const params = new HttpParams()
            .set('experiment_name', experiment.name)
            .set('genome', this.getGenome().name);

        return this.middleware.get('select_experiments', params)
            .map((body: any) => {
                const response: string = body[1] || '';
                const query_id = new Id(response);
                this.progress_element.increment(request_count);
                return new DeepBlueOperation(new DeepBlueDataParameter(experiment), query_id, 'select_experiments', request_count);
            })
            .do((operation) => { this.idNamesQueryCache.put(experiment, operation) });
    }

    selectMultipleExperiments(experiments: IdName[], request_count: number): Observable<IOperation[]> {
        const observableBatch: Observable<IOperation>[] = [];

        experiments.forEach((experiment, key) => {
            this.progress_element.increment(request_count);
            observableBatch.push(this.selectExperiment(experiment, request_count));
        });

        return Observable.forkJoin(observableBatch);
    }

    mergeQueries(queries_id: IOperation[], request_count: number): Observable<IOperation> {
        if (!queries_id || queries_id.length == 0) {
            return Observable.empty<DeepBlueOperation>();
        }

        if (queries_id.length == 1) {
            return Observable.of(queries_id[0]);
        }

        let params = new HttpParams()
            .set('query_a_id', queries_id[0].id().id);

        for (let query_b of queries_id.slice(1)) {
            params = params.append('query_b_id', query_b.id().id);
        }

        return this.middleware.get('merge_queries', params)
            .map((body: any) => {
                const response: string = body[1] || '';
                const query_id = new Id(response);
                this.progress_element.increment(request_count);
                return new DeepBlueOperation(new DeepBlueDataParameter("Merged queries"), query_id, 'merge_queries', request_count);
            })
    }

    filter_region(data: IOperation, field: string, operation: string, value: string, type: string, request_count: number): Observable<IOperation> {

        const parameters = [field, operation, value, type];
        const cache_key = new DeepBlueOperationArgs([data, parameters, 'filter']);

        if (this.filtersQueryCache.get(cache_key, request_count)) {
            this.progress_element.increment(request_count);
            const cached_operation = this.filtersQueryCache.get(cache_key, request_count);
            return Observable.of(cached_operation);
        }

        const params = new HttpParams()
            .set('query_id', data.id().id)
            .set('field', field)
            .set('operation', operation)
            .set('value', value)
            .set('type', type)

        return this.middleware.get('filter_regions', params)
            .map((body: any) => {
                const response: string = body[1] || '';
                const query_id = new Id(response);
                this.progress_element.increment(request_count);
                let filter_parameters = new DeepBlueFilterParameters(field, operation, value, type);
                return new DeepBlueFilter(data, filter_parameters, query_id);
            })
            .do((result_operation) => { this.filtersQueryCache.put(cache_key, result_operation) });
    }


    filter_by_motif(data: IOperation, motif: string, request_count: number): Observable<IOperation> {

        const parameters = [motif];
        const cache_key = new DeepBlueOperationArgs([data, parameters, 'filter_by_motif']);

        if (this.filtersQueryCache.get(cache_key, request_count)) {
            this.progress_element.increment(request_count);
            const cached_operation = this.filtersQueryCache.get(cache_key, request_count);
            return Observable.of(cached_operation);
        }

        const params = new HttpParams()
            .set('query_id', data.id().id)
            .set('motif', motif)

        return this.middleware.get('filter_by_motif', params)
            .map((body: any) => {
                const response: string = body[1] || '';
                const query_id = new Id(response);
                this.progress_element.increment(request_count);
                let filter_parameters = new DeepBlueFilterMotifParameters(motif);
                return new DeepBlueFilter(data, filter_parameters, query_id);
            })
            .do((result_operation) => { this.filtersQueryCache.put(cache_key, result_operation) });
    }


    overlap(query_data: IOperation, query_filter: IOperation, overlap: boolean, request_count: number = -1): Observable<DeepBlueOperation> {

        const cache_key = new DeepBlueOperationArgs([query_data, query_filter, overlap, 'overlap']);

        if (this.overlapsQueryCache.get(cache_key, request_count)) {
            this.progress_element.increment(request_count);
            const cached_operation = this.overlapsQueryCache.get(cache_key, request_count);
            return Observable.of(cached_operation);
        }

        let overlap_string = overlap ? "true" : "false";

        const params = new HttpParams()
            .set('query_data_id', query_data.id().id)
            .set('query_filter_id', query_filter.id().id);

        console.log(query_data.id().id, query_filter.id().id);

        return this.middleware.get('intersection', params)
            .map((body: any) => {
                const response: string = body[1] || '';
                const query_id = new Id(response);
                this.progress_element.increment(request_count);
                return new DeepBlueIntersection(query_data, query_filter, overlap, query_id);
            })
            .do((operation) => { this.overlapsQueryCache.put(cache_key, operation) })
    }


    extend(data: IOperation, length: number, direction: string, request_count: number = -1): Observable<DeepBlueOperation> {
        const params = new HttpParams()
            .set('query_id', data.id().id)
            .set('length', length.toString())
            .set('direction', direction)
            .set('use_strand', "true")


        let o = {
            "length": length,
            "direction": direction
        }

        let doa = new DeepBlueOperationArgs(o);

        return this.middleware.get("extend", params).map((response: [string, string]) => {
            return new DeepBlueExtend(data, doa , new Id(response[1]));
        })
    }

    flank(data: IOperation, start: number, length: number, request_count: number = -1): Observable<DeepBlueOperation> {
        const params = new HttpParams()
            .set('query_id', data.id().id)
            .set('start', start.toString())
            .set('length', length.toString())
            .set('use_strand', "true")

        let o = {
            "start": start,
            "length": length
        }

        let doa = new DeepBlueOperationArgs(o);

        return this.middleware.get("flank", params).map((response: [string, string]) => {
            return new DeepBlueFlank(data, doa , new Id(response[1]));
        })
    }

    selectGoTerm(go_term: string, gene_model: GeneModel, request_count: number): Observable<DeepBlueOperation> {
        if (!go_term) {
            return Observable.empty<DeepBlueOperation>();
        }

        const params = new HttpParams()
            .set('go_terms', go_term)
            .set('gene_model', gene_model.name)
            .set('genome', this.getGenome().name);

        return this.middleware.get('select_genes', params)
            .map((body: any) => {
                const response: string = body[1] || '';
                const query_id = new Id(response);
                this.progress_element.increment(request_count);
                return new DeepBlueOperation(new DeepBlueDataParameter([go_term, gene_model.name]), query_id, 'select_genes', request_count);
            })
    }

    findMotif(dna_motif: string, request_count: number = -1): Observable<DeepBlueOperation> {
        if (!dna_motif) {
            return Observable.empty<DeepBlueOperation>();
        }

        const params = new HttpParams()
            .set('motif', dna_motif)
            .set('genome', this.getGenome().name);

        return this.middleware.get('find_motif', params)
            .map((body: any) => {
                const response: string = body[1] || '';
                const query_id = new Id(response);
                this.progress_element.increment(request_count);
                return new DeepBlueOperation(new DeepBlueDataParameter(dna_motif), query_id, 'find_motif', request_count);
            })
    }

    cacheQuery(selected_data: IOperation, request_count: number = -1): Observable<IOperation> {
        if (!selected_data) {
            return Observable.empty<DeepBlueOperation>();
        }

        if (this.operationCache.get(selected_data, request_count)) {
            this.progress_element.increment(request_count);
            const cached_operation = this.operationCache.get(selected_data, request_count);
            return Observable.of(cached_operation);
        }

        const params = new HttpParams()
            .set('query_id', selected_data.id().id)
            .set('cache', 'true');

        return this.middleware.get('query_cache', params)
            .map((body: any) => {
                const response: string = body[1] || '';
                const query_id = new Id(response);
                this.progress_element.increment(request_count);
                return selected_data.cacheIt(query_id);
            })
            .do((operation) => this.operationCache.put(selected_data, operation))
    }

    getResult(op_request: DeepBlueRequest, request_count: number): Observable<DeepBlueResult> {
        const params = new HttpParams()
            .set('request_id', op_request.id().id);

        const pollSubject = new Subject<DeepBlueResult>();

        if (this.resultCache.get(op_request, request_count)) {
            this.progress_element.increment(request_count);
            const cached_result = this.resultCache.get(op_request, request_count);
            return Observable.of(cached_result);
        }

        const pollData = this.middleware.get('get_request_data', params)
            .map((body: any) => {
                console.info('polling...', op_request.id().id);
                const status = body[0] || 'error';
                if (status === 'okay') {
                    this.progress_element.increment(request_count);
                    const op_result = new DeepBlueResult(op_request, body[1], request_count);
                    this.resultCache.put(op_request, op_result);
                    expand.unsubscribe();
                    pollSubject.next(op_result);
                    pollSubject.complete();
                }
            });

        const expand = pollData.expand(
            () => Observable.timer(250).concatMap(() => pollData)
        ).subscribe();

        return pollSubject.asObservable();
    }

    countRegionsRequest(op_exp: IOperation, request_count: number = -1): Observable<DeepBlueResult> {
        const params = new HttpParams()
            .set('query_id', op_exp.id().id);

        if (this.requestCache.get(op_exp, request_count)) {
            this.progress_element.increment(request_count);
            const cached_result = this.requestCache.get(op_exp, request_count);
            return this.getResult(cached_result, request_count);

        } else {
            const request: Observable<DeepBlueResult> = this.middleware.get('count_regions', params)
                .map((body: any) => {
                    const request_id = new Id(body[1]);
                    this.progress_element.increment(request_count);
                    const deepblue_request = new DeepBlueRequest(op_exp, request_id, 'count_regions', request_count);
                    this.requestCache.put(op_exp, deepblue_request);
                    return deepblue_request;
                })
                .flatMap((request_id) => {
                    return this.getResult(request_id, request_count);
                });
            return request;
        }
    }

    getRegions(data: IOperation, format: string, request_count: number = -1): Observable<DeepBlueResult> {
        const params = new HttpParams()
            .set('query_id', data.id().id)
            .set('output_format', format);

        const request: Observable<DeepBlueResult> = this.middleware.get('get_regions', params)
            .map((body: any) => {
                const request_id = new Id(body[1]);
                this.progress_element.increment(request_count);
                const deepblue_request = new DeepBlueRequest(data, request_id, 'get_regions', request_count);
                return deepblue_request;
            })
            .flatMap((deepblue_request) => {
                return this.getResult(deepblue_request, request_count);
            });
        return request;
    }

    getResultBatch(op_requests: DeepBlueRequest[], request_count: number = -1): Observable<DeepBlueResult[]> {
        const observableBatch: Observable<DeepBlueResult>[] = [];

        op_requests.forEach((op_request, key) => {
            const o: Observable<DeepBlueResult> = this.getResult(op_request, request_count);
            observableBatch.push(o);
        });

        return Observable.forkJoin(observableBatch);

    }

    countRegionsBatch(query_ids: StackValue[], request_count: number = -1): Observable<StackValue[]> {
        const observableBatch: Observable<StackValue>[] = [];

        query_ids.forEach((op_exp, key) => {
            const o: Observable<StackValue> = new Observable((observer) => {
                this.countRegionsRequest(op_exp.getDeepBlueOperation(), request_count).subscribe((result) => {
                    observer.next(new StackValue(op_exp.stack, result));
                    observer.complete();
                });
            });

            observableBatch.push(o);
        });

        return Observable.forkJoin(observableBatch);

    }

    // TODO: remove and use new features of Angular5
    private extractId(body: any) {
        return body[1] || '';
    }

    getExperimentsInfos(ids: string[]): Observable<FullExperiment[]> {
        let request = {
            "id": ids
        }

        return this.middleware.post('info', request)
            .map((body: any) => {
                const data = body[1] || [];
                return data.map((value: any) => {
                    return new FullExperiment(value);
                });
            })
    }

    nameToId(name: string, collection: string) : Observable<IdName[]> {
        let request = {
            "name": name,
            "collection": collection
        }

        return this.middleware.post('name_to_id', request)
            .map((body: any) => {
                const data = body[1] || [];
                return data.map((value: any) => {
                    return new IdName(new Id(value[0]), value[1]);
                })

            })
    }

    getInfo(id: Id): Observable<FullMetadata> {
        const params = new HttpParams()
            .set('id', id.id);

        return this.middleware.get('info', params)
            .map((body: any) => {
                const data = body[1] || [];

                if (id.id[0] === 'e') {
                    return new FullExperiment(data[0]);
                } else if (id.id[0] === 'a') {
                    return new FullAnnotation(data[0]);
                } else if (id.id[0] === 'g' && id.id[1] === 's') {
                    return new FullGeneModel(data[0]);
                } else {
                    console.warn('UNKNOW TYPE: ' + id);
                    return new FullMetadata(data[0]);
                }

            });
    }

    getGeneModelsInfo(ids: string[]): Observable<FullGeneModel[]> {
        let params = new HttpParams()
        for (const id of ids) {
            params = params.append('id', id);
        }

        return this.middleware.get('info', params)
            .map((body: any) => {
                const data = body[1] || [];
                return data.map((value: any) => {
                    return new FullGeneModel(value);
                });
            })
    }

    getGeneModels(): Observable<GeneModel[]> {
        return this.middleware.get('list_gene_models')
            .map((body: any) => {
                const data = body[1] || [];
                return data.map((value: string[]) => {
                    return new GeneModel(value);
                });
            })
    }

    previewExperiment(experiment_name: string): Observable<string[]> {
        const params = new HttpParams()
            .set('experiment_name', experiment_name);

        return this.middleware.get<string[]>('preview_experiment');
    }

    getGeneModelsBySelectedGenome(): Observable<GeneModel[]> {
        const params = new HttpParams()
            .set('genome', this.getGenome().name);

        return this.middleware.get('composed_commands/gene_models_by_genome', params)
            .map((body: any) => {
                const data = body[1] || [];
                return data.map((value: any) => {
                    return new FullGeneModel(value['values']);
                });
            })
    }

    selectGenes(genes: string[], go_terms: string[], gene_model: IdName, request_count: number = -1): Observable<DeepBlueOperation> {
        if (!gene_model) {
            return Observable.empty<DeepBlueOperation>();
        }

        let params = new HttpParams()
            .set('gene_model', gene_model.name);

        for (let name of genes) {
            params = params.append('genes', name);
        }

        for (let go_term of go_terms) {
            params = params.append("go_terms", go_term);
        }

        return this.middleware.get('select_genes', params)
            .map((body: any) => {
                const response: string = body[1] || '';
                const query_id = new Id(body[1]);
                this.progress_element.increment(request_count);
                return new DeepBlueOperation(new DeepBlueOperationArgs({ "genes": genes, "go_terms": go_terms, "gene_model": gene_model.name }), query_id, 'select_genes', request_count);
            })
    }

    inputRegions(region_set: string, request_count: number = -1): Observable<IOperation> {
        if (!region_set) {
            return Observable.empty<IOperation>();
        }

        let request = {
            "genome": this.getGenome().name,
            "region_set": region_set
        }

        return this.middleware.post('composed_commands/input_regions', request)
            .map((body: any) => {
                this.progress_element.increment(request_count);
                if (body[0] == "okay") {
                    const query_id = new Id(body[1]);
                    return new DeepBlueOperation(new DeepBlueEmptyParameter(), query_id, 'input_regions', -1)
                } else {
                    return new DeepBlueOperationError(body[1]);
                }
            });
    }

    public composedCountOverlaps(queries: IOperation[], experiments: IdName[], filters?: DeepBlueFilterParameters[]): Observable<DeepBlueMiddlewareRequest> {

        let request: any = {
            "queries_id": queries.map((op) => op.id().id),
            "experiments_id": experiments.map((exp) => exp.id.id),
            "filters": JSON.stringify(filters)
        }

        let paramsMap = new Map<string, [string | string[]]>();
        for (let k of Object.keys(request)) {
            paramsMap.set(k, request[k]);
        }

        return this.middleware.post('composed_commands/count_overlaps', request)
            .map((body: any) => {
                const response: string = body[1] || '';
                return new DeepBlueMiddlewareRequest(paramsMap, "count_overlaps", new Id(response));;
            });
    }

    public composedCountGenesOverlaps(queries: IOperation[], gene_model: GeneModel, filters: any[]): Observable<DeepBlueMiddlewareRequest> {
        let params = new HttpParams()
            .set('gene_model_name', gene_model.name);

        for (const query_op_id of queries) {
            params = params.append('queries_id', query_op_id.id().id);
        }

        let request: any = {
            "gene_model_name": gene_model.name,
            "queries_id": queries.map((query) => query.id().id),
            "filters": JSON.stringify(filters)
        }

        let paramsMap = new Map<string, [string | string[]]>();
        for (let k of Object.keys(request)) {
            paramsMap.set(k, request[k]);
        }

        return this.middleware.post('composed_commands/count_genes_overlaps', request)
            .map((body: any) => {
                const response: string = body[1] || '';
                return new DeepBlueMiddlewareRequest(paramsMap, "count_genes_overlaps", new Id(response));
            });
    }

    public composedCalculateGenesEnrichment(queries: IOperation[], gene_model: GeneModel): Observable<DeepBlueMiddlewareRequest> {
        let params = new HttpParams()
            .set('gene_model_name', gene_model.name);

        for (const query_op_id of queries) {
            params = params.append('queries_id', query_op_id.id().id);
        }

        let paramsMap = new Map<string, string | string[]>();
        for (let k in params.keys()) {
            paramsMap.set(k, params.getAll(k));
        }

        return this.middleware.get('composed_commands/enrich_regions_go_terms', params)
            .map((body: any) => {
                const response: string = body[1] || '';
                return new DeepBlueMiddlewareRequest(paramsMap, "enrich_regions_go_terms", new Id(response));
            });
    }

    public composedCalculateOverlapsEnrichment(queries: IOperation[], universe_id: Id, datasets: Object[]): Observable<DeepBlueMiddlewareRequest> {
        let request: { [key: string]: any } = {
            "queries_id": queries.map((op) => op.id().id),
            "universe_id": universe_id.id,
            "genome": this.genomeSource.getValue().name,
            "datasets": datasets
        }

        let request_map = new Map<string, any>();
        for (let key of Object.keys(request)) {
            request_map.set(key, request[key]);
        }

        return this.middleware.post('composed_commands/enrich_regions_overlap', request)
            .map((body: any) => {
                const response: string = body[1] || '';
                return new DeepBlueMiddlewareRequest(request_map, "enrich_regions_overlap", new Id(response));
            });
    }

    public composedCalculateFastsEnrichment(op: IOperation): Observable<DeepBlueMiddlewareRequest> {
        let request: { [key: string]: any } = {
            "query_id": op.id().id,
            "genome": this.genomeSource.getValue().name
        }

        let request_map = new Map<string, any>();
        for (let key of Object.keys(request)) {
            request_map.set(key, request[key]);
        }

        return this.middleware.post('composed_commands/enrich_regions_fast', request)
            .map((body: any) => {
                const response: string = body[1] || '';
                return new DeepBlueMiddlewareRequest(request_map, "enrich_regions_fast", new Id(response));
            });
    }

    composedCancel(request: AbstractDeepBlueRequest): Observable<string[]> {
        const params = new HttpParams()
            .append('id', request.id().id);

        return this.middleware.get<string[]>('composed_commands/cancel', params);
    }

    public getComposedResult(request: DeepBlueMiddlewareRequest): Observable<[string, string | DeepBlueResult[]]> {
        const params = new HttpParams()
            .set('request_id', request.requestId().id);

        return this.middleware.get<[string, string | DeepBlueResult[]]>('composed_commands/get_request', params);
    }


    // TODO: Move the logic of converting the data to the function callers
    public getComposedResultIterator(request: DeepBlueMiddlewareRequest, request_type: string, callback?: any, param?: any):
        Observable<DeepBlueResult[] | DeepBlueResult[][] | DeepBlueMiddlewareGOEnrichtmentResult[] | DeepBlueMiddlewareOverlapEnrichtmentResultItem[] | DeepBlueMiddlewareOverlapEnrichtmentResult[]> {
        const pollSubject = new Subject<DeepBlueResult[] | DeepBlueResult[][] | DeepBlueMiddlewareGOEnrichtmentResult[] | DeepBlueMiddlewareOverlapEnrichtmentResultItem[] | DeepBlueMiddlewareOverlapEnrichtmentResult[]>();

        const timer = Observable.timer(0, 1000).concatMap(() => {

            if (request.isCanceled()) {
                timer.unsubscribe();
                return null;
            }

            return this.getComposedResult(request).map((data: [string, string | DeepBlueResult[] | DeepBlueResult[][]]) => {
                if (data[0] === 'okay') {
                    timer.unsubscribe();
                    if (request_type === 'overlaps') {
                        pollSubject.next(
                            (<Object[]>(data[1])).map((ee) => DeepBlueResult.fromObject(ee))
                        );
                    } else if (request_type === 'go_enrichment') {
                        pollSubject.next(
                            (<Object[]>(data[1])).map((ee) => DeepBlueMiddlewareGOEnrichtmentResult.fromObject(ee))
                        );
                    } else if (request_type === 'overlaps_enrichment_fast') {
                        pollSubject.next(
                            (<Object[]>(data[1])).map((ee) => DeepBlueMiddlewareOverlapEnrichtmentResultItem.fromObject(ee))
                        );
                    } else if (request_type === 'overlaps_enrichment') {
                        pollSubject.next(
                            (<Object[]>(data[1])).map((ee) => DeepBlueMiddlewareOverlapEnrichtmentResult.fromObject(ee))
                        );
                    } else if (request_type === 'genes_overlaps') {
                        let result = new Array<DeepBlueResult[]>();
                        for (let values of data[1]) {
                            let vv = (<Object[]>(values)).map((ee) => DeepBlueResult.fromObject(ee))
                            result.push(vv);
                        }
                        pollSubject.next(result);
                    }
                    pollSubject.complete();
                    this.progress_element.finish();
                } else {

                    let status: any = data[1];
                    let partial: any[] = status["partial"];

                    if (partial && callback) {
                        if (request_type === 'overlaps') {
                            partial = (<Object[]>(partial)).map((ee) => DeepBlueResult.fromObject(ee));
                        } else if (request_type === 'go_enrichment') {
                            partial = (<Object[]>(partial)).map((ee) => DeepBlueMiddlewareGOEnrichtmentResult.fromObject(ee))
                        } else if (request_type === 'overlaps_enrichment_fast') {
                            partial = (<Object[]>(partial)).map((ee) => DeepBlueMiddlewareOverlapEnrichtmentResultItem.fromObject(ee))
                        } else if (request_type === 'overlaps_enrichment') {
                            partial = (<Object[]>(partial)).map((ee) => DeepBlueMiddlewareOverlapEnrichtmentResult.fromObject(ee))
                        }

                        if (partial) {
                            pollSubject.next(partial);
                            callback(param, partial);
                        }
                    }
                    this.progress_element.setStatus(status['step'], status['processed'], status['total']);
                }
            });
        }).subscribe();

        return pollSubject;
    }

    public getComposedListGenes(gene_model: string, gene_id_name: string): Observable<Gene[]> {
        const params = new HttpParams()
            .set('gene_model', gene_model)
            .set('gene_id_name', gene_id_name);

        return this.middleware.get<Gene[]>('composed_commands/list_genes', params)
    }


    genomeToDatabases = new Map<string, Observable<[string, string[]][]>>();
    genomeToDatabasesResult = new Map<string, [string, string[]][]>();

    public getComposedEnrichmentDatabases(genome: string): Observable<[string, string[]][]> {
        if (this.genomeToDatabasesResult.has(genome)) {
            return Observable.of(this.genomeToDatabasesResult.get(genome));
        }

        if (this.genomeToDatabases.has(genome)) {
            return this.genomeToDatabases.get(genome);
        }

        const params = new HttpParams()
            .set('genome', genome);

        let observable = this.middleware.get<[string, string[]][]>('composed_commands/get_enrichment_databases', params)
            .share();

        this.genomeToDatabases.set(genome, observable);
        observable.subscribe((result) => {
            this.genomeToDatabasesResult.set(genome, result)
        });

        return observable;
    }

    public getComposedEpigeneticMarksCategories(): Observable<string[]> {
        const params = new HttpParams()
            .set('genome', this.getGenome().name);

        return this.middleware.get<string[]>('composed_commands/get_epigenetic_marks_categories', params);
    }

    public getComposedEpigeneticMarksFromCategory(category: string): Observable<FullMetadata[]> {
        const params = new HttpParams()
            .set('category', category)
            .set('genome', this.getGenome().name);

        return this.middleware.get('composed_commands/get_epigenetic_marks_from_category', params)
            .map(this.extractFullMetadata)
    }

    public getRelatedBioSources(biosource: BioSource): Observable<string[]> {
        const params = new HttpParams()
            .set('biosource', biosource.name)
            .set('genome', this.getGenome().name);

        return this.middleware.get<string[]>('composed_commands/get_related_biosources', params);
    }

    getQueryInfo(id: Id): Observable<IOperation> {
        const params = new HttpParams()
            .set('query_id', id.id);

        return this.middleware.get('composed_commands/query_info', params)
            .map((body: any) => {
                return <IOperation>toClass(body);
            });
    }
}
