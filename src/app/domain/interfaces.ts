import { Id } from "app/domain/deepblue";

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
    queryId() : Id;
}

export interface IRow {
    [key: string]: any
}

export interface IMenu {
    loadMenu() : any;
    selectItem(item: any): any;
}