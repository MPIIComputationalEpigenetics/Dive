import { IOperation } from "app/domain/interfaces";

export class DataStackItem {
  constructor(public op: IOperation, public count: number) { }

  clone(): DataStackItem {
    return new DataStackItem(this.op, this.count);
  }
}