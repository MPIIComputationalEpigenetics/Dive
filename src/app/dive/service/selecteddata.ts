import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { DeepBlueOperation } from '../domain/operations'

import { DeepBlueService } from '../service/deepblue';
import { DataStack, DataStackItem } from '../service/datastack'

@Injectable()
export class SelectedData {

  _activeStack: DataStack = null;
  _stacks: DataStack[] = [];

  currentStackSubscription: Subscription;

  public topStackSubject = new Subject<DataStackItem>();
  public topStackValue$: Observable<DataStackItem> = this.topStackSubject.asObservable();

  addStack(stack: DataStack) {
    this._stacks.push(stack);
  }

  removeStack(stack: DataStack): DataStack {
    let index = this._stacks.indexOf(stack, 0);
    if (index > -1) {
      let removedStack = this._stacks[index];
      this._stacks.splice(index, 1);
      if (this._activeStack == removedStack) {
        // TODO: set the next one as active.
        this._activeStack = null;
      }
      return removedStack;
    }
    return null;
  }

  setActiveStack(stack: DataStack) {
    let index = this._stacks.indexOf(stack, 0);
    if (index <= -1) {
      console.log(stack, "not found");
      return;
    }
    this._activeStack = stack;

    if (!this.currentStackSubscription.closed) {
      this.currentStackSubscription.unsubscribe();
    }
    this.currentStackSubscription = stack.topStackValue$.subscribe();
  }

  getActiveStack() {
    debugger;
    return this._activeStack;
  }

  getData(): DataStackItem[] {
    if (this._activeStack != null) {
      return this._activeStack.getData();
    }
    return [];
  }

  getCurrentOperation(): DeepBlueOperation {
    if (this._activeStack != null) {
      return this._activeStack.getCurrentOperation();
    }
    return null;
  }

}
