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

