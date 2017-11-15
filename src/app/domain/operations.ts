import { ICloneable } from 'app/domain/interfaces';
import { IKey, IOperation, IDataParameter } from 'app/domain/interfaces';
import { IdName, GeneModel, Id } from 'app/domain/deepblue';

export class DataParameter implements IDataParameter {
    constructor(private _data: IdName | string | string[]) { }

    name(): string {
        if (this._data instanceof IdName) {
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
        } else if (this._data instanceof String) {
            return new Id(<string>this._data);
        } else {
            return new Id((<string[]>this._data).join(","));
        }
    }
}

export class DeepBlueOperation implements IOperation {
    constructor(private _data: IDataParameter, public query_id: Id,
        public command: string, public request_count: number, public cached = false) { }

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
        public request_count: number, public cached = false) { }

    data(): DataParameter {
        return new DataParameter(new IdName(this.query_id, "Tiling Regions of " + this.size.toLocaleString() + "bp"));
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

export class DeepBlueGenes implements IOperation {
    constructor(public genes: string[], public gene_model: GeneModel, public query_id: Id,
        public request_count: number, public cached = false) { }

    data(): DataParameter {
        return new DataParameter(new IdName(this.query_id, "Selected Genes"));
    }

    clone(request_count: number = -1): DeepBlueGenes {
        return new DeepBlueGenes(this.genes, this.gene_model, this.query_id, this.request_count, this.cached);
    }

    cacheIt(query_id: Id): DeepBlueGenes {
        return new DeepBlueGenes(this.genes, this.gene_model, this.query_id, this.request_count, true);
    }

    key(): string {
        return this.query_id.id;
    }

    text(): string {
        return "Genes: " + this.genes.join(",");
    }

    queryId(): Id {
        return this.query_id;
    }
}

export class DeepBlueParametersOperation implements IKey {
    constructor(public operation: IOperation, public parameters: string[],
        public command: string, public request_count: number, public cached = false) { }

    clone(request_count: number = -1): DeepBlueParametersOperation {
        return new DeepBlueParametersOperation(this.operation, this.parameters, this.command, request_count, this.cached);
    }

    cacheIt(query_id: string): DeepBlueParametersOperation {
        return new DeepBlueParametersOperation(this.operation, this.parameters, this.command, this.request_count, true);
    }

    key(): string {
        return this.operation.key() + this.parameters.join();
    }

    text(): string {
        return this.command + "(" + this.parameters.join(",") + ") on " + this.operation;
    }
}

export class DeepBlueMultiParametersOperation implements IKey {
    constructor(public op_one: IOperation, public op_two: IOperation, public parameters: string[],
        public command: string, public request_count: number, public cached = false) { }

    clone(request_count: number = -1): DeepBlueMultiParametersOperation {
        return new DeepBlueMultiParametersOperation(this.op_one, this.op_two, this.parameters, this.command, request_count, this.cached);
    }

    cacheIt(query_id: string): DeepBlueMultiParametersOperation {
        return new DeepBlueMultiParametersOperation(this.op_one, this.op_two, this.parameters, this.command, this.request_count, true);
    }

    key(): string {
        return this.op_one.key() + this.op_two.key() + this.parameters.join();
    }

    text(): string {
        return this.command + "(" + this.parameters.join(",") + ") on " + this.op_one + " and " + this.op_two;
    }
}

export class DeepBlueRequest implements IKey {
    constructor(public _data: IDataParameter, public request_id: Id,
        public command: string, public operation: IOperation, public request_count: number) { }

    clone(request_count: number = -1): DeepBlueRequest {
        return new DeepBlueRequest(this._data, this.request_id, this.command, this.operation, request_count);
    }

    data(): IDataParameter {
        return this._data;
    }

    key(): string {
        return this.request_id.id;
    }

    text(): string {
        return "Request data: " + this.operation;
    }
}

export class DeepBlueResult implements ICloneable {
    constructor(public _data: IDataParameter, public result: any, public request: DeepBlueRequest, public request_count: number) { }

    clone(request_count: number = -1): DeepBlueResult {
        return new DeepBlueResult(this._data, this.result, this.request, request_count);
    }

    data(): IDataParameter {
        return this._data;
    }

    resultAsString(): string {
        return <string>this.result;
    }

    resultAsCount(): number {
        return <number>this.result['count'];
    }
}


export class StackValue {
    constructor(public stack: number,
        public value: IOperation | DeepBlueParametersOperation |
            DeepBlueMultiParametersOperation | DeepBlueRequest | DeepBlueResult) { }

    getDeepBlueOperation(): IOperation {
        return <DeepBlueOperation>this.value;
    }

    getDeepBlueParametersOperation(): DeepBlueParametersOperation {
        return <DeepBlueParametersOperation>this.value;
    }

    getDeepBlueMultiParametersOperation(): DeepBlueMultiParametersOperation {
        return <DeepBlueMultiParametersOperation>this.value;
    }

    getDeepBlueRequest(): DeepBlueRequest {
        return <DeepBlueRequest>this.value;
    }

    getDeepBlueResult(): DeepBlueResult {
        return <DeepBlueResult>this.value;
    }
}


export class DeepBlueMiddlewareOverlapResult {

    static fromObject(obj: any): DeepBlueMiddlewareOverlapResult {
        return new DeepBlueMiddlewareOverlapResult(obj['data_name'], new Id(obj['data_query'].id),
            obj['filter_name'], new Id(obj['filter_query'].id), obj['count']);
    }

    constructor(private data_name: string, private data_query: Id,
        private filter_name: string, private filter_query: Id,
        private count: number) {

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
            new DataParameter(
                new IdName(this.filter_query, this.filter_name)
            ),
            this.filter_query, 'Select Experiment Data', -1);
    }
}

export class DeepBlueMiddlewareGOEnrichtmentResult {

    static fromObject(obj: any): DeepBlueMiddlewareGOEnrichtmentResult {
        return new DeepBlueMiddlewareGOEnrichtmentResult(obj['data_name'], obj['gene_model'],
            obj['results'])
    }

    constructor(public data_name: string, public gene_model: string,
        public results: any[]) { }

    getDataName(): string {
        return this.data_name;
    }

    getGeneModel(): string {
        return this.gene_model;
    }

    getResults(): any {
        return this.results;
    }
}

export class DeepBlueMiddlewareOverlapEnrichtmentResult {

    static fromObject(obj: any): DeepBlueMiddlewareOverlapEnrichtmentResult {
        return new DeepBlueMiddlewareOverlapEnrichtmentResult(
            obj['data_name'],
            obj['universe_id'],
            obj['results']['enrichment']['results'].map((obj: Object) => DeepBlueMiddlewareOverlapEnrichtmentResultItem.fromObject(obj))
        );
    }

    constructor(public data_name: string, public universe_id: string, public results: DeepBlueMiddlewareOverlapEnrichtmentResultItem[]) { }

    getDataName(): string {
        return this.data_name;
    }

    getUniverseId(): string {
        return this.universe_id;
    }

    getResults(): DeepBlueMiddlewareOverlapEnrichtmentResultItem[] {
        return this.results;
    }
}

export class DeepBlueMiddlewareOverlapEnrichtmentResultItem {
    static fromObject(obj: any): DeepBlueMiddlewareOverlapEnrichtmentResultItem {
        return new DeepBlueMiddlewareOverlapEnrichtmentResultItem(
            obj['dataset'],
            obj['biosource'], obj['epigenetic_mark'],
            obj['description'], obj['experiment_size'],  obj['database_name'],
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

export class FilterParameter {
    constructor(public field: string, public operation: string, public value: string, public type: string) { }
}
