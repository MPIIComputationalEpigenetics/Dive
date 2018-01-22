import { Id, Name } from "app/domain/deepblue";

export interface ICloneable {
    clone (request_count?: number): any;
}

export interface ITextable {
    text(): string;
}

export interface INamedDataType {
    dataType() : string;
}

export interface IKey extends ICloneable, ITextable {
    key(): string;
}

export interface IDataParameter extends INamedDataType, IKey {
    name() : string;

    id() : Id;
}

export interface IOperation extends IDataParameter {
    data() : IDataParameter;

    mainOperation() : IOperation;

    cacheIt(query_id: Id): IOperation;
}

export interface IFiltered extends IOperation {
    filter(): IDataParameter;
}

export interface IRow {
    [key: string]: any
}

