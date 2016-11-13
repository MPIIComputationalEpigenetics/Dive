export class Annotation {
    id: string;
    name: string;

    constructor (data: string[] ) {
        this.id = data[0];
        this.name = data[1];
    }
//    extra_metadata: Object; 
}