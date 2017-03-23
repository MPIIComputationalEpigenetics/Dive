import { IKey } from 'app/domain/interfaces';

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


export class GeneModel extends IdName {
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

    genome() : string {
        return this.values["genome"];
    }

    description() : string {
        return this.values["description"];
    }

    format() : string {
        return this.values["format"];
    }

    columns() : Object {
        return this.values["columns"];
    }
}


export class FullAnnotation extends FullMetadata {
    constructor (data: Object) {
        super(data);
    }
}

export class FullGeneModel extends FullMetadata {
    constructor(data: Object) {
        super(data);
    }
}

export class FullExperiment extends FullMetadata {
    constructor (data: Object) {
        super(data);
    }

    sample_info(): Object {
        return this.values["sample_info"];
    }

    biosource() : string {
        return this.sample_info()["biosource_name"];
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
