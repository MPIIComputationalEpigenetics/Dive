import { IKey } from '../domain/interfaces';


export class Id implements IKey {
    constructor(public id: string) { }

    key(): string {
        return this.id;
    }

    clone(): Id {
        return new Id(this.id);
    }

    text(): string {
        return 'ID: ' + this.id;
    }

    equals(other: Id): boolean {
        if (other != null) {
            return this.id == other.id;
        }
        return false;
    }
}

export class Name implements IKey {

    constructor(public name: string) { }

    key(): string {
        return this.name;
    }

    text(): string {
        throw name;
    }

    clone(): Name {
        return new Name(this.name);
    }
}

export class IdName extends Name {
    constructor(public id: Id, public name: string) {
        super(name)
    }

    key(): string {
        return this.id.id;
    }

    clone(): IdName {
        return new IdName(this.id, this.name);
    }

    text(): string {
        return this.name + "(" + this.id + ")";
    }

    equals(other: IdName): boolean {
        if (other != null) {
            return this.id.equals(other.id);
        }
    }
}

export class IdNameCount extends IdName {
    /*

            count: number;

            constructor(data: string[]) {
                super(new Id(data[0]), data[1]);
                if (data.length >= 2) {
                    this.count = parseInt(data[2]);
                } else {
                    this.count = -1;
                }
            }
        }
    */
    constructor(public id: Id, public name: string, public count: number) {
        super(id, name);
    }

    Count(): number {
        return this.count;
    }

    clone(): IdName {
        return new IdNameCount(this.id, this.name, this.count);
    }
}


export class EpigeneticMark extends IdName {
    constructor(data: string[]) {
        super(new Id(data[0]), data[1]);
    }
}

export class BioSource extends IdName {
    constructor(data: string[]) {
        super(new Id(data[0]), data[1]);
    }
}

export class Technique extends IdName {
    constructor(data: string[]) {
        super(new Id(data[0]), data[1]);
    }
}

export class Project extends IdName {
    constructor(data: string[]) {
        super(new Id(data[0]), data[1]);
    }
}

export class Annotation extends IdName {
    constructor(data: string[]) {
        super(new Id(data[0]), data[1]);
    }
}

export class Experiment extends IdName {
    constructor(data: string[]) {
        super(new Id(data[0]), data[1]);
    }
}

export class Genome extends IdName {
    constructor(data: string[]) {
        super(new Id(data[0]), data[1]);
    }
}


export class GeneModel extends IdName {
    constructor(data: string[]) {
        super(new Id(data[0]), data[1]);
    }
}

export class Gene extends IdName {
    constructor(private data: any) {
        super(new Id(data["_id"]), data["gene_name"]);
    }

    gene_id(): string {
        return (<any>this.data)["gene_id"];
    }

    gene_name(): string {
        return (<any>this.data)["gene_name"];
    }
}

export class FullMetadata extends IdName {
    values: any;

    static fromObject(o: any): FullMetadata {
        return new FullMetadata(o.values);
    }

    constructor(data: any) {
        super(new Id(data["_id"]), data["name"]);
        this.values = data;
    }

    get(key: string): any {
        return this.values[key];
    }

    genome(): string {
        return this.values['genome'];
    }

    description(): string {
        return this.values['description'];
    }

    format(): string {
        return this.values['format'];
    }

    columns(): any[] {
        return this.values['columns'];
    }
}


export class FullAnnotation extends FullMetadata {
    constructor(data: Object) {
        super(data);
    }
}

export class FullGeneModel extends FullMetadata {
    constructor(data: Object) {
        super(data);
    }
}

export class FullExperiment extends FullMetadata {
    constructor(data: any) {
        super(data);
    }

    sample_info(): any {
        return this.values['sample_info'];
    }

    biosource(): string {
        return this.sample_info()['biosource_name'];
    }

    sample_id(): string {
        return this.values['sample_id'];
    }

    epigenetic_mark(): string {
        return this.values['epigenetic_mark'];
    }

    technique(): string {
        return this.values['technique'];
    }

    project(): string {
        return this.values['project'];
    }
}

