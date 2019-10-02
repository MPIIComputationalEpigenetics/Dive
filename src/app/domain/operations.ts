import { Name } from './deepblue';
import { ICloneable, IOperation, IDataParameter, ITextable, IFiltered, INamedDataType } from '../domain/interfaces'
import { IKey } from '../domain/interfaces';
import { IdName, FullMetadata, Id } from '../domain/deepblue';

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

export class AbstractNamedDataType implements INamedDataType {
    constructor(public _data_type: string) {

    }

    dataType(): string {
        return this._data_type;
    }
}

export abstract class AbstractDataParameter extends AbstractNamedDataType implements IDataParameter {

    constructor(public _data_type: string) {
        super(_data_type);
    }

    abstract name(): string;

    abstract id(): Id;

    abstract key(): string;

    abstract clone(request_count?: number): AbstractDataParameter;

    abstract text(): string;

    dataType(): string {
        return this._data_type;
    }
}

export abstract class AbstractFilterParameter extends AbstractDataParameter {

}

export class DeepBlueEmptyParameter extends AbstractDataParameter {

    constructor() {
        super("empty_parameter");
    }

    name(): string {
        return "";
    }
    id(): Id {
        return null;
    }
    key(): string {
        return "";
    }
    clone(request_count?: number): AbstractDataParameter {
        return this;
    }
    text(): string {
        return "";
    }
}

export class DeepBlueDataParameter extends AbstractDataParameter {

    constructor(private _data: Name | string | string[]) {
        super("data_parameter");
    }

    name(): string {
        if (this._data instanceof Name) {
            return (<Name>this._data).name;
        } else if (typeof this._data === 'string') {
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
        } else if (typeof this._data === 'string') {
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
        return JSON.stringify(this._data);
    }
}


export class DeepBlueOperationArgs extends AbstractDataParameter {

    constructor(public args: any) {
        super("operation_args");
    }

    static fromObject(o: any): DeepBlueOperationArgs {
        return new DeepBlueOperationArgs(o);
    }

    key(): string {
        return textify(this.args);
    }

    clone(): DeepBlueOperationArgs {
        return new DeepBlueOperationArgs(clone(this.args));
    }

    asKeyValue(): any {
        return this.args;
    }

    text(): string {
        return textify(this.args);
    }

    name(): string {
        return this.text();
    }

    id(): Id {
        return new Id(this.text());
    }
}


export class DeepBlueMetadataParameters extends AbstractDataParameter {

    constructor(public genome: string, public type: string, public epigenetic_mark: string,
        public biosource: string, public sample: string, public technique: string, public project: string) {
        super("metadata_parameters");
    }

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


export class DeepBlueFilterParameters extends AbstractFilterParameter {

    constructor(public field: string, public operation: string, public value: string, public type: string) {
        super("filter_parameters");
    }

    static fromObject(o: any): DeepBlueFilterParameters {
        return new DeepBlueFilterParameters(o.field, o.operation, o.value, o.type);
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
        if (this.field.length > 0 && this.field[0] == "@") {
            this.field = this.field.replace("@", "")
        }
        return this.field + " " + this.operation + " " + this.value;
    }

    clone(): DeepBlueFilterParameters {
        return new DeepBlueFilterParameters(this.field, this.operation, this.value, this.type);
    }

    name(): string {
        return "Filter Parameters: " + textify(this.asKeyValue);
    }

    id(): Id {
        return new Id(textify(this.asKeyValue));
    }

    key(): string {
        return this.id().id;
    }
}

export class DeepBlueFilterMotifParameters extends AbstractFilterParameter {

    constructor(public motif: string) {
        super("filter_motif_parameter");
    }

    static fromObject(o: any): DeepBlueFilterMotifParameters {
        return new DeepBlueFilterMotifParameters(o.motif);
    }

    asKeyValue(): Object {
        let params: any = {};

        params["motif"] = this.motif;

        return params;
    }

    text() {
        return this.motif
    }

    clone(): DeepBlueFilterMotifParameters {
        return new DeepBlueFilterMotifParameters(this.motif);
    }

    name(): string {
        return "Filter Motif: " + this.motif;
    }

    id(): Id {
        return new Id(textify(this.asKeyValue));
    }

    key(): string {
        return this.id().id;
    }
}

export class DeepBlueOperation extends AbstractNamedDataType implements IOperation {

    constructor(public _data: IDataParameter, public query_id: Id,
        public command: string, public request_count?: number, public cached = false) {
        super("data_operation");
    }

    data(): IDataParameter {
        return this._data;
    }

    mainOperation(): IOperation {
        if (this._data instanceof DeepBlueOperation) {
            return (<DeepBlueOperation>this._data).mainOperation();
        }
        return this;
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

    name(): string {
        return this._data.name();
    }

    id(): Id {
        return this.query_id;
    }
}


export class DeepBlueTiling extends AbstractNamedDataType implements IOperation {
    constructor(public size: number, public genome: string, public chromosomes: string[], public query_id: Id,
        public request_count?: number, public cached = false) {
        super("tiling");
    }

    data(): IDataParameter {
        return new DeepBlueDataParameter(new IdName(this.query_id, "Tiling Regions of " + this.size.toLocaleString() + "bp"));
    }

    mainOperation(): IOperation {
        return this;
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

    name(): string {
        return this.text();
    }

    id(): Id {
        return this.query_id;
    }
}


export class DeepBlueIntersection extends DeepBlueOperation implements IFiltered {

    constructor(private _subject: IOperation, public _filter: IOperation, public overlap: boolean,
        public query_id: Id, public cached = false) {
        super(_subject.data(), query_id, "intersection")
    }

    clone(): DeepBlueIntersection {
        return new DeepBlueIntersection(
            this._subject.clone(),
            this._filter.clone(),
            this.overlap,
            this.query_id,
            this.cached
        );
    }

    data(): IDataParameter {
        return this._subject;
    }

    key(): string {
        return "intersect_" + this._subject.id().id + '_' + this._filter.id().id;
    }

    mainOperation(): IOperation {
        return this._subject.mainOperation();
    }

    filter(): IOperation {
        return this._filter;
    }

    cacheIt(query_id: Id): DeepBlueIntersection {
        return new DeepBlueIntersection(this._subject, this._filter, this.overlap, this.query_id, true);
    }

    text(): string {
        if (this.overlap) {
            return "Overlapping " + this._filter.text();
        } else {
            return "Not overlapping " + this._filter.text();
        }
    }
}

export class DeepBlueAggregate extends DeepBlueOperation implements IFiltered {

    constructor(private _subject: IOperation, public _ranges: IOperation, public field: string, public query_id: Id, public cached = false) {
        super(_subject.data(), query_id, "aggregate")
    }

    clone(): DeepBlueAggregate {
        return new DeepBlueAggregate(
            this._subject.clone(),
            this._ranges.clone(),
            this.field,
            this.query_id,
            this.cached
        );
    }

    data(): IDataParameter {
        return this._subject;
    }

    key(): string {
        return "aggreate_" + this._subject.id().id + '_' + this._ranges.id().id;
    }

    mainOperation(): IOperation {
        return this._subject.mainOperation();
    }

    filter(): IOperation {
        return this._ranges;
    }

    cacheIt(query_id: Id): DeepBlueAggregate {
        return new DeepBlueAggregate(this._subject, this._ranges, this.field, this.query_id, true);
    }

    text(): string {
        return this._subject.text() + " aggregated by " + this._ranges.text();
    }
}

export class DeepBlueFilter extends DeepBlueOperation implements IFiltered {

    constructor(public _data: IOperation, public _params: AbstractFilterParameter, public query_id: Id, public cached = false) {
        super(_data, query_id, "regions_filter")
    }

    data(): IDataParameter {
        return this._data;
    }

    mainOperation(): IOperation {
        return this._data.mainOperation();
    }

    filter(): IDataParameter {
        return this._params;
    }

    key(): string {
        return "filter_" + this.id().id;
    }

    clone(): DeepBlueFilter {
        return new DeepBlueFilter(
            this._data.clone(),
            this._params.clone(),
            this.query_id,
            this.cached
        );
    }

    cacheIt(query_id: Id): DeepBlueFilter {
        return new DeepBlueFilter(this._data, this._params, this.query_id, this.cached);
    }

    text(): string {
        return this._data.text() + " by " + this._params.text();
    }
}

export class DeepBlueFlank extends DeepBlueOperation implements IFiltered {

    constructor(public _data: IOperation, public _params: DeepBlueOperationArgs, public query_id: Id, public cached = false) {
        super(_data, query_id, "flank")
    }

    data(): IDataParameter {
        return this._data;
    }

    mainOperation(): IOperation {
        return this._data.mainOperation();
    }

    filter(): IDataParameter {
        return this._params;
    }

    key(): string {
        return "flank_" + this.id().id;
    }

    clone(): DeepBlueFlank {
        return new DeepBlueFlank(
            this._data.clone(),
            this._params.clone(),
            this.query_id,
            this.cached
        );
    }

    cacheIt(query_id: Id): DeepBlueFlank {
        return new DeepBlueFlank(this._data, this._params, this.query_id, this.cached);
    }

    text(): string {
        return "flanking at " + this._params.args['start'] + " by " + this._params.args['length'] + "bp"
    }
}

export class DeepBlueExtend extends DeepBlueOperation implements IFiltered {

    constructor(public _data: IOperation, public _params: DeepBlueOperationArgs, public query_id: Id, public cached = false) {
        super(_data, query_id, "extend")
    }

    data(): IDataParameter {
        return this._data;
    }

    mainOperation(): IOperation {
        return this._data.mainOperation();
    }

    filter(): IDataParameter {
        return this._params;
    }

    key(): string {
        return "extend_" + this.id().id;
    }

    clone(): DeepBlueExtend {
        return new DeepBlueExtend(
            this._data.clone(),
            this._params.clone(),
            this.query_id,
            this.cached
        );
    }

    cacheIt(query_id: Id): DeepBlueExtend {
        return new DeepBlueExtend(this._data, this._params, this.query_id, this.cached);
    }

    text(): string {
        return "extend by " + this._params.args['length'] + "bp to " + (<string>this._params.args['direction']).toLocaleLowerCase() + " direction(s)";
    }
}

export class DeepBlueOperationError extends AbstractNamedDataType implements IOperation {

    constructor(public message: string, public request_count?: number) {
        super("error");
    }

    data(): IDataParameter {
        return new DeepBlueDataParameter(this.message);
    }

    mainOperation(): IOperation {
        return this;
    }

    cacheIt(query_id: Id): IOperation {
        return this;
    }

    name(): string {
        return this.message;
    }

    id(): Id {
        return new Id(this.message);
    }

    key(): string {
        return this.message;
    }

    clone(request_count?: number) {
        return new DeepBlueOperationError(this.message, this.request_count);
    }

    text(): string {
        return this.message;
    }
}

export interface IResult {
    [key: string]: any;
}

export class DeepBlueResult implements ICloneable {
    constructor(public request: DeepBlueRequest, public result: IResult | string, public request_count?: number) {
    }

    static fromObject(obj: any): DeepBlueResult {
        return new DeepBlueResult(
            DeepBlueRequest.fromObject(obj['request']), obj['result']);
    }

    clone(): DeepBlueResult {
        return new DeepBlueResult(
            this.request.clone(),
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


    getRequestId(): Id {
        return this.request._id;
    }

    getData(): IDataParameter {
        return this.request.getData();
    }

    getFilter(): IDataParameter {
        return this.request.getFilter();
    }
}

export class DeepBlueResultError extends DeepBlueResult {
    constructor(public request: DeepBlueRequest, public error: string, public request_count?: number) {
        super(request, error, request_count);
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
    constructor(public request: DeepBlueRequest, public error: string, public request_count: number) {
        super(request, error, request_count);
    }

    getError() {
        return this.error;
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

    getResults(): { [key: string]: any } {
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

    id(): Id {
        return this._id;
    }
}


export class DeepBlueRequest extends AbstractDeepBlueRequest {

    constructor(private _operation: IOperation, public _id: Id, public command: string, public request_count?: number) {
        super(_id, command);
    }

    static fromObject(obj: any): DeepBlueRequest {
        return new DeepBlueRequest(
            <IOperation>toClass(obj['_operation']), new Id(obj['_id']), obj['command']
        );
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

    getData(): IDataParameter {
        return this._operation.data();
    }

    getFilter(): IDataParameter {
        if ((<IFiltered>this._operation).filter) {
            return (<IFiltered>this._operation).filter();
        } else {
            return null;
        }
    }

    text(): string {
        return "Request: " + this._id.id;
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
        return this._id;
    }

    key(): string {
        return this._id.id;
    }

    text(): string {
        return "MiddlewareRequest: " + this._id.id;
    }
}

export class DeepBlueMiddlewareOverlapEnrichtmentResultItem {
    static fromObject(obj: any): DeepBlueMiddlewareOverlapEnrichtmentResultItem {
        return new DeepBlueMiddlewareOverlapEnrichtmentResultItem(
            obj['dataset'],
            obj['biosource'], obj['epigenetic_mark'],
            obj['description'], obj['experiment_size'], obj['database_name'],
            obj['p_value_log'], obj['odds_ratio'], obj['support'],
            obj['b'], obj['c'], obj['d'],
            obj['support_rank'], obj['log_rank'], obj['odd_rank'],
            obj['max_rank'], obj['mean_rank'], obj);
    }

    constructor(public dataset: string,
        public biosource: string, public epigenetic_mark: string,
        public description: string, public experiment_size: number, public database_name: string,
        public p_value_log: number, public odds_ratio: number, public support: number,
        public b: number, public c: number, public d: number,
        public support_rank: number, public log_rank: number, public odd_rank: number,
        public max_rank: number, public mean_rank: number, public data: any) {
        // JSON does not send infinity values, so we have to fix it manually.
        this.p_value_log = this.p_value_log != null ? this.p_value_log : Infinity;
        this.odds_ratio = this.odds_ratio != null ? this.odds_ratio : Infinity;
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
            { name: 'odds_ratio', prop: 'oddsratio', column_type: 'double' },
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


export function toClass(o: any): IDataParameter {
    switch (o._data_type) {
        case 'data_parameter': {
            let data;
            if (o._data.id) {
                data = new IdName(new Id(o._data.id.id), o._data.name);
            } else if (o._data.name) {
                data = new Name(o._data.name);
            } else {
                data = o._data;
            }
            return new DeepBlueDataParameter(data);
        }

        case 'operation_args': {
            return new DeepBlueOperationArgs(o.args);
        }

        case 'metadata_parameters': {
            return new DeepBlueMetadataParameters(o.genome, o.type, o.epigenetic_mark,
                o.biosource, o.sample, o.technique, o.project);
        }

        case 'tiling': {
            return new DeepBlueTiling(o.size, o.genome, o.chromosomes, new Id(o.query_id.id),
                o.request_count, o.cached);
        }

        case 'data_operation': {
            switch (o.command) {
                case 'intersection': {
                    let subject = toClass(o._subject);
                    let filter = toClass(o._filter);
                    let overlap = o.overlap;
                    let query_id = new Id(o.query_id.id);

                    return new DeepBlueIntersection(<IOperation>subject, <IOperation>filter, overlap, query_id, o.cached);
                }

                case 'aggregate': {
                    let subject = toClass(o._subject);
                    let filter = toClass(o._ranges);
                    let field = o.field;
                    let query_id = new Id(o.query_id.id);

                    return new DeepBlueAggregate(<IOperation>subject, <IOperation>filter, field, query_id, o.cached);
                }

                case 'regions_filter': {
                    let data = toClass(o._data);
                    let filter;
                    if (o._params._data_type == "filter_parameters") {
                        filter = DeepBlueFilterParameters.fromObject(o._params);
                    } else if (o._params._data_type == "filter_motif_parameter") {
                        filter = DeepBlueFilterMotifParameters.fromObject(o._params);
                    }

                    let query_id = new Id(o.query_id.id);

                    return new DeepBlueFilter(<IOperation>data, filter, query_id, o.cached);
                }

                case 'flank': {
                    let data = toClass(o._data);
                    let params = toClass(o._params);
                    let query_id = new Id(o.query_id.id);

                    return new DeepBlueFlank(<IOperation>data, <DeepBlueOperationArgs>params, query_id);
                }

                case 'extend': {
                    let data = toClass(o._data);
                    let params = toClass(o._params);
                    let query_id = new Id(o.query_id.id);

                    return new DeepBlueExtend(<IOperation>data, <DeepBlueOperationArgs>params, query_id);
                }

                default: {
                    let data = toClass(o._data);
                    let query_id = new Id(o.query_id.id);
                    return new DeepBlueOperation(data, query_id, o.command, o.request_count, o.cached);
                }
            }
        }

        default: {
            console.warn("Invalid type: ", o._data_type);
        }
    }
}
