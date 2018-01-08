import { EpigeneticMark, Name } from './deepblue';
import { ICloneable, IOperation, IDataParameter, ITextable, IFiltered } from '../domain/interfaces'
import { IKey } from '../domain/interfaces';
import { IdName, FullMetadata, Id } from '../domain/deepblue';
import { request } from 'https';
import { stringify } from 'querystring';


function clone(obj: any) {
    let copy: any;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = clone(obj[attr]);
            }
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}


function textify(obj: any): string {
    if ("string" == typeof obj) {
        return obj;
    }

    if ("number" == typeof obj) {
        return (<number>obj).toString();
    }

    // Handle Date
    if (obj instanceof Date) {
        return (<Date>obj).toDateString()
    }

    // Handle Array
    if (obj instanceof Array) {
        let text = "";
        for (var i = 0, len = obj.length; i < len; i++) {
            text += textify(obj[i]);
        }
        return text;
    }


    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) {
        return "";
    }

    // Handle Object
    if (obj instanceof Object) {
        let text = "";
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                text += textify(obj[attr]);
            }
        }
        return text;
    }

    throw new Error("Unable to textify " + obj + "! Its type isn't supported.");
}

export enum DeepBlueResultStatus {
    Error = "error",
    Okay = "okay"
}


export class DeepBlueCommandExecutionResult<T> {
    constructor(public status: DeepBlueResultStatus, public result: T) {
    }
}


export class DeepBlueDataParameter implements IDataParameter {

    constructor(private _data: Name | string | string[]) { }

    name(): string {
        if (this._data instanceof Name) {
            return (<IdName>this._data).name;
        } else if ('string' === typeof this._data) {
            return (<string>this._data);
        } else {
            return (<string[]>this._data).join(",");
        }
    }

    id(): Id {
        if (this._data instanceof IdName) {
            return (<IdName>this._data).id;
        } if (this._data instanceof Name) {
            return new Id((<Name>this._data).name);
        } else if (this._data instanceof String) {
            return new Id(<string>this._data);
        } else {
            return new Id((<string[]>this._data).join(","));
        }
    }

    key(): string {
        return this.id().id + "_" + this.name();
    }

    clone(request_count?: number) {
        return new DeepBlueDataParameter(this._data);
    }

    text(): string {
        return stringify(this._data);
    }
}


export class DeepBlueOperationArgs implements IDataParameter {

    constructor(public args: Object) { }

    key(): string {
        return textify(this.args);
    }

    clone(): DeepBlueOperationArgs {
        return new DeepBlueOperationArgs(clone(this.args));
    }

    asKeyValue(): Object {
        return this.args;
    }

    text(): string {
        return textify(this.args);
    }

    name(): string {
        throw new Error("Method not implemented.");
    }

    id(): Id {
        throw new Error("Method not implemented.");
    }

}


export class DeepBlueMetadataParameters implements IDataParameter {

    constructor(public genome: string, public type: string, public epigenetic_mark: string,
        public biosource: string, public sample: string, public technique: string, public project: string) { }

    key(): string {
        let key = "";
        if (this.genome) key += this.genome;
        if (this.type) key += this.type;
        if (this.epigenetic_mark) key += this.epigenetic_mark;
        if (this.biosource) key += this.biosource;
        if (this.sample) key += this.sample;
        if (this.technique) key += this.technique;
        if (this.project) key += this.project;
        return key;
    }

    clone(): DeepBlueMetadataParameters {
        return new DeepBlueMetadataParameters(this.genome, this.type,
            this.epigenetic_mark, this.biosource, this.sample,
            this.technique, this.project);
    }

    asKeyValue(): Object {
        const params: { [key: string]: string } = {};

        if (this.genome) {
            params['genome'] = this.genome;
        }
        if (this.type) {
            params['type'] = this.type;
        }
        if (this.epigenetic_mark) {
            params['epigenetic_mark'] = this.epigenetic_mark;
        }
        if (this.biosource) {
            params['biosource'] = this.biosource;
        }
        if (this.sample) {
            params['sample'] = this.sample;
        }
        if (this.technique) {
            params['technique'] = this.technique;
        }
        if (this.project) {
            params['project'] = this.project;
        }

        return params;
    }

    text(): string {
        return textify(this.asKeyValue());
    }

    name(): string {
        return "Metadata Parameters: " + textify(this.asKeyValue());
    }

    id(): Id {
        return new Id(textify(this.asKeyValue()));
    }
}


export class DeepBlueOperation implements IOperation {
    constructor(private _data: IDataParameter, public query_id: Id,
        public command: string, public request_count?: number, public cached = false) { }

    data(): IDataParameter {
        return this._data;
    }

    clone(request_count: number = -1): DeepBlueOperation {
        return new DeepBlueOperation(this._data, this.query_id, this.command, request_count, this.cached);
    }

    cacheIt(query_id: Id): DeepBlueOperation {
        return new DeepBlueOperation(this._data, query_id, this.command, this.request_count, true);
    }

    key(): string {
        return this.query_id.id;
    }

    text(): string {
        return this.command + " " + this._data.name();
    }

    queryId(): Id {
        return this.query_id;
    }
}


export class DeepBlueTiling implements IOperation {
    constructor(public size: number, public genome: string, public chromosomes: string[], public query_id: Id,
        public request_count?: number, public cached = false) { }

    data(): IDataParameter {
        return new DeepBlueDataParameter(new IdName(this.query_id, "Tiling Regions of " + this.size.toLocaleString() + "bp"));
    }

    clone(request_count: number = -1): DeepBlueTiling {
        return new DeepBlueTiling(this.size, this.genome, this.chromosomes, this.query_id,
            this.request_count, this.cached);
    }

    cacheIt(query_id: Id): DeepBlueTiling {
        return new DeepBlueTiling(this.size, this.genome, this.chromosomes, this.query_id, this.request_count, true);
    }

    key(): string {
        return this.query_id.id;
    }

    text(): string {
        return "Tiling regions of " + this.size;
    }

    queryId(): Id {
        return this.query_id;
    }
}



export class DeepBlueIntersection extends DeepBlueOperation {

    constructor(private _subject: IOperation, public _filter: IOperation, public query_id: Id, public cached = false) {
        super(_subject.data(), query_id, "intersection")
    }

    clone(): DeepBlueIntersection {
        return new DeepBlueIntersection(
            this._subject.clone(),
            this._filter.clone(),
            this.query_id,
            this.cached
        );
    }

    queryId(): Id {
        return this.query_id;
    }

    data(): IDataParameter {
        return this._subject.data();
    }

    key(): string {
        return "intersect_" + this._subject.queryId().id + '_' + this._filter.queryId().id;
    }

    getDataName(): string {
        return this._subject.data.name;
    }

    getDataId(): Id {
        return this._subject.data().id();
    }

    getFilterName(): string {
        return this._filter.data().name();
    }

    getFilterQuery(): Id {
        return this._filter.queryId();
    }

    cacheIt(query_id: Id): DeepBlueIntersection {
        return new DeepBlueIntersection(this._subject, this._filter, this.query_id, true);
    }

    text(): string {
        return this._subject.text() + " filtered by " + this._filter.text();
    }
}

export class DeepBlueFilter extends DeepBlueOperation {

    constructor(private _subject: IOperation, public _params: FilterParameter, public query_id: Id, public cached = false) {
        super(_subject.data(), query_id, "regions_filter")
    }

    queryId(): Id {
        return this.query_id;
    };

    data(): IDataParameter {
        return this._subject.data();
    }

    getDataName(): string {
        return this._subject.data().name();
    }

    getDataId(): Id {
        return this._subject.data().id();
    }

    getFilterName(): string {
        return "filter_regions";
    }

    getFilterQuery(): Id {
        return new Id(this._params.toString());
    }

    key(): string {
        return "filter_" + this.queryId().id;
    }

    clone(): DeepBlueFilter {
        return new DeepBlueFilter(
            this._subject.clone(),
            this._params.clone(),
            this.query_id,
            this.cached
        );
    }

    cacheIt(query_id: Id): DeepBlueFilter {
        return new DeepBlueFilter(this._subject, this._params, this.query_id, this.cached);
    }

    text(): string {
        return this._subject.text() + "(" + this._params.text() + ")";
    }

}

export interface IResult {
    [key: string]: any;
}

export class DeepBlueResult implements ICloneable {
    constructor(private _request: DeepBlueRequest, public result: IResult | string, public request_count?: number) {
    }

    clone(): DeepBlueResult {
        return new DeepBlueResult(
            this._request.clone(),
            this.result,
            this.request_count
        );
    }

    resultAsString(): string {
        return <string>this.result;
    }

    static hasResult(result: IResult | string, key: string): result is IResult {
        return (<IResult>result)[key] !== undefined;
    }

    resultAsCount(): number {
        if (DeepBlueResult.hasResult(this.result, 'count')) {
            return this.result.count;
        } else {
            return null;
        }
    }

    resultAsDistinct(): { [key: string]: number } {
        if (DeepBlueResult.hasResult(this.result, 'distinct')) {
            return this.result.distinct;
        } else {
            return null;
        }
    }

    resultAsTuples(): Object[] {
        return <Object[]>this.result;
    }

    resultAsEnrichment(): Object[] {
        if (DeepBlueResult.hasResult(this.result, 'enrichment')) {
            return this.result.enrichment["results"];
        }
        return [];
    }

    data(): DeepBlueRequest {
        return this._request;
    }

    getRequestId(): Id {
        return this._request._id;
    }

    getDataName(): string {
        return this._request.getDataName();
    }

    getDataId(): Id {
        return this._request.getDataId();
    }

    getFilterName(): string {
        return this._request.getFilterName();
    }

    getFilterQuery(): Id {
        return this._request.getFilterQuery();
    }
}

export class StackValue {
    constructor(public stack: number,
        public value: IOperation | DeepBlueRequest | DeepBlueResult) { }

    getDeepBlueOperation(): IOperation {
        return <DeepBlueOperation>this.value;
    }

    getDeepBlueRequest(): DeepBlueRequest {
        return <DeepBlueRequest>this.value;
    }

    getDeepBlueResult(): DeepBlueResult {
        return <DeepBlueResult>this.value;
    }
}


export class DeepBlueError extends DeepBlueResult {
    constructor(private request: DeepBlueRequest, public error: string, public request_count: number) {
        super(request, error, request_count);
    }

    getError() {
        return this.error;
    }
}

export class DeepBlueMiddlewareOverlapResult {
    constructor(public data_name: string, public data_query: Id,
        public filter_name: string, public filter_query: Id,
        public count: number) {
    }

    static fromObject(obj: any): DeepBlueMiddlewareOverlapResult {
        return new DeepBlueMiddlewareOverlapResult(obj['data_name'], new Id(obj['data_query'].id),
            obj['filter_name'], new Id(obj['filter_query'].id), obj['count']);
    }

    getDataName(): string {
        return this.data_name;
    }

    getDataQuery(): Id {
        return this.data_query;
    }

    getFilterName(): string {
        return this.filter_name;
    }

    getFilterQuery(): Id {
        return this.filter_query;
    }

    getCount(): number {
        return this.count;
    }

    toDeepBlueOperation(): DeepBlueOperation {
        return new DeepBlueOperation(
            new DeepBlueDataParameter(
                new IdName(this.filter_query, this.filter_name)
            ),
            this.filter_query, 'Select Experiment Data', -1);
    }
}

export class DeepBlueMiddlewareGOEnrichtmentResult {
    constructor(public data_name: string, public gene_model: string, public results: Object[]) { }

    static fromObject(obj: any): DeepBlueMiddlewareGOEnrichtmentResult {
        return new DeepBlueMiddlewareGOEnrichtmentResult(obj['data_name'], obj['gene_model'],
            obj['results'])
    }

    getDataName(): string {
        return this.data_name;
    }

    getGeneModel(): string {
        return this.gene_model;
    }

    getResults(): {[key: string]: any} {
        return this.results;
    }
}


export class DeepBlueMiddlewareOverlapEnrichtmentResult {
    constructor(public data_name: string, public universe_id: Id, public datasets: Object, public results: Object[]) { }

    static fromObject(obj: any): DeepBlueMiddlewareOverlapEnrichtmentResult {
        return new DeepBlueMiddlewareOverlapEnrichtmentResult(
            obj['data_name'],
            new Id(obj['universe_id']),
            obj['datasets'],
            obj['results']['enrichment']['results'].map((obj: Object) => DeepBlueMiddlewareOverlapEnrichtmentResultItem.fromObject(obj))
        );
    }

    getDataName(): string {
        return this.data_name;
    }

    getUniverseId(): Id {
        return this.universe_id;
    }

    getDatasets(): Object {
        return this.datasets;
    }

    getResults(): Object[] {
        return this.results;
    }
}

export class FilterParameter implements ITextable {
    constructor(public field: string, public operation: string, public value: string, public type: string) { }

    static fromObject(o: any): FilterParameter {
        return new FilterParameter(o.field, o.operation, o.value, o.type);
    }
    asKeyValue(): Object {
        let params: any = {};

        params["field"] = this.field;
        params["operation"] = this.operation;
        params["value"] = this.value;
        params["type"] = this.type;

        return params;
    }

    text() {
        return JSON.stringify(this.asKeyValue());
    }

    clone(): FilterParameter {
        return new FilterParameter(this.field, this.operation, this.value, this.type);
    }
}


export class AbstractDeepBlueRequest implements IKey {

    canceled = false;

    constructor(public _id: Id, public command: string) { }

    isCanceled(): boolean {
        return this.canceled;
    }

    cancel() {
        this.canceled = true;
    }

    key(): string {
        return this._id.id;
    }

    clone(request_count: number) {
        throw new Error("Method not implemented.");
    }

    text(): string {
        return "Request - " + this.command + "(" + this.id + ")";
    }

    id() : Id {
        return this._id;
    }
}


export class DeepBlueRequest extends AbstractDeepBlueRequest {

    constructor(private _operation: IOperation, public _id: Id, public command: string, public request_count?: number) {
        super(_id, command);
    }

    clone(request_count?: number): DeepBlueRequest {
        return new DeepBlueRequest(
            this._operation.clone(),
            this._id,
            this.command,
            request_count
        );
    }

    key(): string {
        return this._id.id;
    }

    data(): IOperation {
        return this._operation;
    }

    getDataName(): string {
        return this._operation.data().name();
    }

    getDataId(): Id {
        return this._operation.data().id();
    }

    getFilterName(): string {
        if ((<IFiltered>this._operation).getFilterName) {
            return (<IFiltered>this._operation).getFilterName();
        } else {
            return null;
        }
    }

    getFilterQuery(): Id {
        if ((<IFiltered>this._operation).getFilterName) {
            return (<IFiltered>this._operation).getFilterQuery();
        } else {
            return null;
        }
    }

    text(): string {
        throw "Request: " + this._id.id;
    }

    id(): Id {
        return this._id;
    }
}

export class DeepBlueMiddlewareRequest extends AbstractDeepBlueRequest {

    constructor(public parameters: Map<string, any>, public command: string, public _id: Id) {
        super(_id, command);
    }

    clone(request_count: number) {
        return new DeepBlueMiddlewareRequest(this.parameters, this.command, this._id);
    }

    requestId(): Id {
        throw new Error("Method not implemented.");
    }

    key(): string {
        throw new Error("Method not implemented.");
    }

    text(): string {
        throw new Error("Method not implemented.");
    }
}

export class DeepBlueMiddlewareOverlapEnrichtmentResultItem {
    static fromObject(obj: any): DeepBlueMiddlewareOverlapEnrichtmentResultItem {
        return new DeepBlueMiddlewareOverlapEnrichtmentResultItem(
            obj['dataset'],
            obj['biosource'], obj['epigenetic_mark'],
            obj['description'], obj['experiment_size'], obj['database_name'],
            obj['p_value_log'], obj['log_odds_ratio'], obj['support'],
            obj['b'], obj['c'], obj['d'],
            obj['support_rank'], obj['log_rank'], obj['odd_rank'],
            obj['max_rank'], obj['mean_rank'], obj);
    }

    constructor(public dataset: string,
        public biosource: string, public epigenetic_mark: string,
        public description: string, public experiment_size: number, public database_name: string,
        public p_value_log: number, public log_odds_ratio: number, public support: number,
        public b: number, public c: number, public d: number,
        public support_rank: number, public log_rank: number, public odd_rank: number,
        public max_rank: number, public mean_rank: number, public data: any) {
        // JSON does not send infinity values, so we have to fix it manually.
        this.p_value_log = this.p_value_log != null ? this.p_value_log : Infinity;
        this.log_odds_ratio = this.log_odds_ratio != null ? this.log_odds_ratio : Infinity;
    }

    static asColumns() {
        return [
            { name: 'dataset', prop: 'dataset', column_type: 'string' },
            { name: 'biosource', prop: 'biosource', column_type: 'string' },
            { name: 'epigenetic_mark', prop: 'epigeneticmark', column_type: 'string' },
            { name: 'description', prop: 'description', column_type: 'string' },
            { name: 'experiment_size', prop: 'experimentsize', column_type: 'integer' },
            { name: 'database_name', prop: 'databasename', column_type: 'string' },
            { name: 'p_value_log', prop: 'pvaluelog', column_type: 'double' },
            { name: 'log_odds_ratio', prop: 'logoddsratio', column_type: 'double' },
            { name: 'support', prop: 'support', column_type: 'integer' },
            { name: 'b', prop: 'b', column_type: 'integer' },
            { name: 'c', prop: 'c', column_type: 'integer' },
            { name: 'd', prop: 'd', column_type: 'integer' },
            { name: 'support_rank', prop: 'supportrank', column_type: 'integer' },
            { name: 'log_rank', prop: 'logrank', column_type: 'integer' },
            { name: 'odd_rank', prop: 'oddrank', column_type: 'integer' },
            { name: 'max_rank', prop: 'maxrank', column_type: 'integer' },
            { name: 'mean_rank', prop: 'meanrank', column_type: 'integer' }
        ]
    }
}
