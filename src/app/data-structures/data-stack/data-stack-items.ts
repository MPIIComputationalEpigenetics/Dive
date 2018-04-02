import { DataStackItem } from "app/data-structures/data-stack/data-stack-item";
import { BehaviorSubject, Observable } from "rxjs";
import { IOperation } from "app/domain/interfaces";

export class DataStackItems {
  _data: DataStackItem[] = [];

  public topStackSubject = new BehaviorSubject<DataStackItem>(null);
  public topStackValue$: Observable<DataStackItem> = this.topStackSubject.asObservable();

  public stackSubject = new BehaviorSubject<DataStackItem[]>(null);
  public stackValue$: Observable<DataStackItem[]> = this.stackSubject.asObservable();

  public DataStackItems() {
    this._data = [];
  }

  init(data?: DataStackItem[]) {
    if (data) {
      this._data = data;
    } else {
      this._data = [];
    }
  }

  getInitialOperation(): IOperation {
    if (this._data.length > 0) {
      return this._data[0].op;
    }
    return null;
  }

  getCurrentOperation(): IOperation {
    if (this._data.length > 0) {
      return this._data[this._data.length - 1].op;
    }
    return null;
  }

  push(item: DataStackItem) {
    this._data.push(item);
    this.topStackSubject.next(item);
    this.stackSubject.next(this._data);
  }

  unshift(item: DataStackItem) {
    this._data.unshift(item);
    this.stackSubject.next(this._data);
  }

  // Return true if the stack is empty
  remove(data: DataStackItem): boolean {
    const query_id = data.op.id().id;
    // find position
    let i = this._data.length - 1;
    for (; i >= 0; i--) {
      if (this._data[i].op.id().id === query_id) {
        break;
      }
    }

    this._data = this._data.slice(0, i);
    if (this._data.length > 0) {
      this.topStackSubject.next(this._data[this._data.length - 1]);
      this.stackSubject.next(this._data);
      return false;
    } else {
      this.topStackSubject.next(null);
      this.stackSubject.next(this._data);
      return true;
    }
  }

  clone(): DataStackItem[] {
    const newStack: DataStackItem[] = [];
    for (const item of this._data) {
      newStack.push(item);
    }
    return newStack;
  }

  name(): string {
    const top = this._data[0];
    if (top === undefined) {
      return '(loading..)';
    }
    if (this._data.length > 1) {
      return top.op.data().name() + ' (filtered)';
    } else {
      return top.op.data().name();
    }
  }

}