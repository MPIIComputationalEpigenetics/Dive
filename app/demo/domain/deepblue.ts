
export class IdNameCount {
    id: string;
    name: string;
    count: number;

    constructor (data: string[]) {
        this.id = data[0];
        this.name = data[1];
        this.count = parseInt(data[2]);
    }
}

export class IdName {
    id: string;
    name: string; 

    constructor (data: string[]) {
        this.id = data[0];
        this.name = data[1];
    }
}

export class EpigeneticMark {
    id: string;
    name: string;
    extra_metadata: Object; 

    constructor (data: string[] ) {        
        this.id = data[0];
        this.name = data[1];        
    }
}

export class Annotation {
    id: string;
    name: string;
    extra_metadata: Object; 

    constructor (data: string[] ) {
        this.id = data[0];
        this.name = data[1];
    }
}

export class Genome {
    id: string;
    name: string;
    extra_metadata: Object;
    
    constructor (data: string[] ) {
        this.id = data[0];
        this.name = data[1];
    }
}

