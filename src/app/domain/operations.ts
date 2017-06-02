import { ICloneable } from 'app/domain/interfaces';
import { IKey } from 'app/domain/interfaces';
import { IdName } from 'app/domain/deepblue';

export class DeepBlueOperation implements IKey {
    constructor(public data: IdName, public query_id: string,
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
}

export class DeepBlueRequest implements IKey {
    constructor(public data: IdName, public request_id: string,
        public command: string, public operation: DeepBlueOperation, public request_count: number) { }

    clone(request_count: number = -1): DeepBlueRequest {
        return new DeepBlueRequest(this.data, this.request_id, this.command, this.operation, request_count);
    }

    key(): string {
        return this.request_id;
    }
}

export class DeepBlueResult implements ICloneable {
    constructor(public data: IdName, public result: Object, public request: DeepBlueRequest, public request_count: number) { }

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
            obj['results']);
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


