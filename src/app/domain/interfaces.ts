import { Id, IdName } from "app/domain/deepblue";

export interface ICloneable {
    clone (request_count: number): any;
}

export interface ITextable {
    text(): string;
}

export interface IKey extends ICloneable, ITextable {
    key(): string;
}

export interface IDataParameter {
    name() : string;
    id() : Id;
}

export interface IOperation extends IKey {
    data() : IDataParameter;

    queryId() : Id;

    cacheIt(query_id: Id): IOperation;
}

export interface IRow {
    [key: string]: any
}

export interface IMenu {
    loadMenu() : any;
    selectItem(item: any): any;
}