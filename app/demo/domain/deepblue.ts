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
