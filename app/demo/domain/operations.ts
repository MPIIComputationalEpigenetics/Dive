import { IdName } from '../domain/deepblue';

export class DeepBlueOperation {
    constructor(public data: IdName, public query_id: string, public command: string, public request_count: number, public cached: boolean = false) { }

    cacheIt(query_id: string): DeepBlueOperation {
        return new DeepBlueOperation(this.data, query_id, this.command, this.request_count, true);
    }
}

export class DeepBlueRequest {
    constructor(public data: IdName, public request_id: string, public request_count: number) { }
}

export class DeepBlueResult {
    constructor(public data: IdName, public result: Object, public request_count: number) { }
}
