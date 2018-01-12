import { Id, Name } from "app/domain/deepblue";
import { DeepBlueDataParameter, DeepBlueOperationArgs, DeepBlueMetadataParameters, DeepBlueOperation, DeepBlueTiling, DeepBlueIntersection, FilterParameter, DeepBlueFilter } from "app/domain/operations";

export interface ICloneable {
    clone(request_count?: number): any;
}

export interface ITextable {
    text(): string;
}

export interface INamedDataType {
    dataType(): string;
}

export interface IKey extends ICloneable, ITextable {
    key(): string;
}

export interface IDataParameter extends INamedDataType, IKey {
    name(): string;
    id(): Id;
}

export interface IOperation extends IDataParameter {
    data(): IDataParameter;

    cacheIt(query_id: Id): IOperation;
}

export interface IFiltered extends IOperation {
    getFilterName(): string;

    getFilterQuery(): Id;
}

export interface IRow {
    [key: string]: any
}

export interface IMenu {
    loadMenu(): any;
    selectItem(item: any): any;
}

