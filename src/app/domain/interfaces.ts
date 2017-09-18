export interface ICloneable {
    clone (request_count: number): any;
}

export interface ITextable {
    text(): string;
}

export interface IKey extends ICloneable, ITextable {
    key(): string;
}

export interface IOperation extends IKey {
    queryId() : string;
}
