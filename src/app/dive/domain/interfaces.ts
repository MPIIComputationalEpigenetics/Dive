export interface ICloneable {
    clone (request_count: number): any;
}

export interface IKey extends ICloneable {
    key() : string;
}
