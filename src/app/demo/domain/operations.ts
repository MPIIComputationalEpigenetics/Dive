import { ICloneable,
         IKey } from '../domain/interfaces';

import { IdName } from '../domain/deepblue';


export class DeepBlueOperation implements IKey {
    constructor(public data: IdName, public query_id: string, public command: string, public request_count: number, public cached: boolean = false) { }

    clone(request_count: number = -1): DeepBlueOperation {
        return new DeepBlueOperation(this.data,this.query_id, this.command, request_count, this.cached);
    }

    cacheIt(query_id: string): DeepBlueOperation {
        return new DeepBlueOperation(this.data, query_id, this.command, this.request_count, true);
    }

    key() : string {
        return this.query_id;
    }
}

export class DeepBlueParametersOperation implements IKey {
    constructor(public operation: DeepBlueOperation, public parameters: string[], public command: string, public request_count: number, public cached: boolean = false) { }

    clone(request_count: number = -1): DeepBlueParametersOperation {
        return new DeepBlueParametersOperation(this.operation,this.parameters, this.command, request_count, this.cached);
    }

    cacheIt(query_id: string): DeepBlueParametersOperation {
        return new DeepBlueParametersOperation(this.operation, this.parameters, this.command, this.request_count, true);
    }

    key() : string {
        return this.operation.key() + this.parameters.join();
    }
}

export class DeepBlueMultiParametersOperation implements IKey {
    constructor(public op_one: DeepBlueOperation, public op_two:DeepBlueOperation, public parameters: string[], public command: string, public request_count: number, public cached: boolean = false) { }

    clone(request_count: number = -1): DeepBlueMultiParametersOperation {
        return new DeepBlueMultiParametersOperation(this.op_one, this.op_two, this.parameters, this.command, request_count, this.cached);
    }

    cacheIt(query_id: string): DeepBlueMultiParametersOperation {
        return new DeepBlueMultiParametersOperation(this.op_one, this.op_two, this.parameters, this.command, this.request_count, true);
    }

    key() : string {
        return this.op_one.key() + this.op_two.key() + this.parameters.join();
    }
}

export class DeepBlueRequest  implements IKey {
    constructor(public data: IdName, public request_id: string, public request_count: number) { }

    clone(request_count: number = -1) : DeepBlueRequest {
        return new DeepBlueRequest(this.data, this.request_id, request_count)
    }

    key(): string {
        return this.request_id;
    }
}

export class DeepBlueResult  implements ICloneable {
    constructor(public data: IdName, public result: Object, public request_count: number) { }

    clone(request_count: number = -1) : DeepBlueResult {
        return new DeepBlueResult(this.data, this.result, request_count);
    }

    resultAsString() : string {
        return <string> this.result;
    }
}
