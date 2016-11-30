export class IdName {
    constructor (public id: string, public name: string) {  }
}

export class IdNameCount extends IdName {
    id: string;
    name: string;
    count: number;

    constructor (data: string[] ) {
        super(data[0], data[1]);
        this.count = parseInt(data[2]);                     
    }     
}

export class EpigeneticMark extends IdName {
    id: string;
    name: string;
    extra_metadata: Object; 

    constructor (data: string[] ) {
        super(data[0], data[1])             
    }
}

export class Annotation extends IdName {
    id: string;
    name: string;
    extra_metadata: Object; 

    constructor (data: string[] ) {
        super(data[0], data[1])             
    }
}

export class Experiment extends IdName {
    id: string;
    name: string;
    extra_metadata: Object;
    
    constructor (data: string[] ) {
        super(data[0], data[1])             
    }
}

export class Genome extends IdName {
    id: string;
    name: string;
    extra_metadata: Object;
    
    constructor (data: string[] ) {
        super(data[0], data[1])             
    }
}

