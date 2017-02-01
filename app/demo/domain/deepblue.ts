import { IKey } from './interfaces';

export class IdName implements IKey{
    constructor (public id: string, public name: string) {  }

    key() : string {
        return this.id;
    }

    clone() : IdName {
        return new IdName(this.id, this.name);
    }
}

export class IdNameCount extends IdName {
    count: number;

    constructor (data: string[] ) {
        super(data[0], data[1]);
        this.count = parseInt(data[2]);
    }
}

export class EpigeneticMark extends IdName {
    constructor (data: string[] ) {
        super(data[0], data[1])
    }
}

export class BioSource extends IdName {
    constructor (data: string[] ) {
        super(data[0], data[1])
    }
}

export class Annotation extends IdName {
    constructor (data: string[] ) {
        super(data[0], data[1])
    }
}

export class Experiment extends IdName {
    constructor (data: string[] ) {
        super(data[0], data[1])
    }
}

export class Genome extends IdName {
    constructor (data: string[] ) {
        super(data[0], data[1])
    }
}

export class FullMetadata extends IdName {
    values: Object;

    constructor (data: Object) {
        super(data["_id"], data["name"]);
        this.values = data;
    }

    get(key: string) : any {
        return this.values[key];
    }
}


export class FullAnnotation extends FullMetadata {
    constructor (data: Object) {
        super(data);
    }

    genome() : string {
        return this.values["genome"];
    }

    description() : string {
        return this.values["description"];
    }
}


export class FullExperiment extends FullMetadata {
    constructor (data: Object) {
        super(data);
    }

    description() : string {
        return this.values["description"];
    }

    genome() : string {
        return this.values["genome"];
    }

    sample_info(): Object {
        return this.values["sample_info"];
    }

    sample_id() : string {
        return this.values["sample_id"];
    }

    epigenetic_mark(): string {
        return this.values["epigenetic_mark"];
    }

    technique() : string {
        return this.values["technique"];
    }

    project() : string {
        return this.values["project"];
    }
}

export class ProgressElement {
    total_to_load: number = 0;
    total_loaded: number = 0;
    progress_value: number = -1;
    request_count: number = -1;

    reset(total, request_count) {
        this.total_to_load = total;
        this.total_loaded = 0;
        this.progress_value = 0;
        this.request_count = request_count;
    }

    increment(request_count: number) {
        if (request_count != this.request_count) {
            return;
        }
        this.total_loaded++;
        this.progress_value = Math.ceil(this.total_loaded * 100 / this.total_to_load);
    }
}
