import { ICloneable } from 'app/domain/interfaces';
import { IKey, IOperation } from 'app/domain/interfaces';
import { IdName, GeneModel } from 'app/domain/deepblue';

export class DeepBlueOperation implements IOperation {
    constructor(public data: IdName | string[], public query_id: string,
        public command: string, public request_count: number, public cached = false) { }

    clone(request_count: number = -1): DeepBlueOperation {
        return new DeepBlueOperation(this.data, this.query_id, this.command, request_count, this.cached);
    }

    cacheIt(query_id: string): DeepBlueOperation {
        return new DeepBlueOperation(this.data, query_id, this.command, this.request_count, true);
    }

    key(): string {
        return this.query_id;
    }

    dataName(): string {
        let data_name = "";
        if (this.data instanceof IdName) {
            data_name = (<IdName>this.data).name;
        } else {
            data_name = (<string[]>this.data).join(",");
        }
        return data_name;
    }

    dataId(): string {
        let data_id = "";
        if (this.data instanceof IdName) {
            data_id = (<IdName>this.data).id;
        } else {
            data_id = (<string[]>this.data).join(",");
        }
        return data_id;
    }

    text(): string {
        return this.command + " " + this.dataName();
    }

    queryId(): string {
        return this.query_id;
    }
}

export class DeepBlueTiling implements IOperation {
    constructor(public size: number, public genome: string, public chromosomes: string[], public query_id: string,
        public request_count: number, public cached = false) { }

    clone(request_count: number = -1): DeepBlueTiling {
        return new DeepBlueTiling(this.size, this.genome, this.chromosomes, this.query_id,
            this.request_count, this.cached);
    }

    cacheIt(query_id: string): DeepBlueTiling {
        return new DeepBlueTiling(this.size, this.genome, this.chromosomes, this.query_id, this.request_count, true);
    }

    key(): string {
        return this.query_id;
    }

    text(): string {
        return "Tiling regions of " + this.size;
    }

    queryId(): string {
        return this.query_id;
    }
}

export class DeepBlueGenes implements IOperation {
    constructor(public genes: string[], public gene_model: GeneModel, public query_id: string,
        public request_count: number, public cached = false) { }

    clone(request_count: number = -1): DeepBlueGenes {
        return new DeepBlueGenes(this.genes, this.gene_model, this.query_id, this.request_count, this.cached);
    }

    cacheIt(query_id: string): DeepBlueGenes {
        return new DeepBlueGenes(this.genes, this.gene_model, this.query_id, this.request_count, true);
    }

    key(): string {
        return this.query_id;
    }

    text(): string {
        return "Genes: " + this.genes.join(",");
    }

    queryId(): string {
        return this.query_id;
    }
}

export class DeepBlueParametersOperation implements IKey {
    constructor(public operation: DeepBlueOperation, public parameters: string[],
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
    constructor(public op_one: DeepBlueOperation, public op_two: DeepBlueOperation, public parameters: string[],
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
    constructor(public data: IdName | string[], public request_id: string,
        public command: string, public operation: DeepBlueOperation, public request_count: number) { }

    clone(request_count: number = -1): DeepBlueRequest {
        return new DeepBlueRequest(this.data, this.request_id, this.command, this.operation, request_count);
    }

    key(): string {
        return this.request_id;
    }

    text(): string {
        return "Request data: " + this.operation;
    }
}

export class DeepBlueResult implements ICloneable {
    constructor(public data: IdName | string[], public result: Object, public request: DeepBlueRequest, public request_count: number) { }

    clone(request_count: number = -1): DeepBlueResult {
        return new DeepBlueResult(this.data, this.result, this.request, request_count);
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
        public value: DeepBlueOperation | DeepBlueParametersOperation |
            DeepBlueMultiParametersOperation | DeepBlueRequest | DeepBlueResult) { }

    getDeepBlueOperation(): DeepBlueOperation {
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

    static fromObject(obj: Object): DeepBlueMiddlewareOverlapResult {
        return new DeepBlueMiddlewareOverlapResult(obj['data_name'], obj['data_query'],
            obj['filter_name'], obj['filter_query'], obj['count']);
    }

    constructor(private data_name: string, private data_query: string,
        private filter_name: string, private filter_query: string,
        private count: number) {

    }

    getDataName(): string {
        return this.data_name;
    }

    getDataQuery(): string {
        return this.data_query;
    }

    getFilterName(): string {
        return this.filter_name;
    }

    getFilterQuery(): string {
        return this.filter_query;
    }

    getCount(): number {
        return this.count;
    }

    filterToDeepBlueOperation(): DeepBlueOperation {
        return new DeepBlueOperation(
            new IdName(this.filter_query, this.filter_name),
            this.filter_query, 'Select Experiment Data', -1);
    }
}

export class DeepBlueMiddlewareGOEnrichtmentResult {

    static fromObject(obj: Object): DeepBlueMiddlewareGOEnrichtmentResult {
        return new DeepBlueMiddlewareGOEnrichtmentResult(obj['data_name'], obj['gene_model'],
            obj['results'])
    }

    constructor(public data_name: string, public gene_model: string,
        public results: Object[]) { }

    getDataName(): string {
        return this.data_name;
    }

    getGeneModel(): string {
        return this.gene_model;
    }

    getResults(): Object[] {
        return this.results;
    }
}

export class DeepBlueMiddlewareOverlapEnrichtmentResult {

    static fromObject(obj: Object): DeepBlueMiddlewareOverlapEnrichtmentResult {
        return new DeepBlueMiddlewareOverlapEnrichtmentResult(obj['data_name'], obj['universe_id'],
            obj['results']['enrichment']['results'].map((obj: Object) => DeepBlueMiddlewareOverlapEnrichtmentResultItem.fromObject(obj)));
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
    static fromObject(obj: Object): DeepBlueMiddlewareOverlapEnrichtmentResultItem {
        debugger;
        return new DeepBlueMiddlewareOverlapEnrichtmentResultItem(
            obj['dataset'], obj['description'], obj['experiment_size'], obj['database_name'],
            obj['p_value_log'], obj['log_odds_ratio'], obj['support'],
            obj['b'], obj['c'], obj['d'],
            obj['support_rank'], obj['log_rank'], obj['odd_rank'],
            obj['max_rank'], obj['mean_rank']);
    }

    constructor(public dataset: string, public description: string, public experiment_size: number, public database_name: string,
        public p_value_log: number, public log_odds_ratio: number, public support: number,
        public b: number, public c: number, public d: number,
        public support_rank: number, public log_rank: number, public odd_rank: number,
        public max_rank: number, public mean_rank: number) {
        // JSON does not send infinity values, so we have to fix it manually.
        this.p_value_log = this.p_value_log != null ? this.p_value_log : Infinity;
    }
}

export class FilterParameter {
    constructor(public field: string, public operation: string, public value: string, public type: string) { }
}
