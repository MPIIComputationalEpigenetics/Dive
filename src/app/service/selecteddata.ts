import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { Annotation } from 'app/domain/deepblue';

import { DeepBlueOperation } from 'app/domain/operations'

import { DeepBlueService } from 'app/service/deepblue';
import { DataStack, DataStackFactory, DataStackItem } from 'app/service/datastack';

@Injectable()
export class SelectedData {

  _activeStack: DataStack = null;
  _stacks: DataStack[] = [];

  currentStackSubscription: Subscription = null;

  public activeTopStackSubject = new Subject<DataStackItem>();
  public activeTopStackValue$: Observable<DataStackItem> = this.activeTopStackSubject.asObservable();

  annotationSubscription: Subscription;

  constructor(private deepBlueService: DeepBlueService, private dataStackFactory: DataStackFactory) {
    this.annotationSubscription = deepBlueService.annotationValue$.subscribe((annotation: Annotation) => {
      let stack: DataStack = dataStackFactory.newDataStack();
      if (annotation.id != "") {
        // TODO: Ask if the user want to save the previous stack
        console.log("Non empty annotation");
        stack.setInitialData(annotation);
        this.replaceStack(0, stack);
        this.setActiveStack(stack);
      }
    });
  }

  insertForComparison(annotation: Annotation) {
    debugger;
    let stack: DataStack = this.dataStackFactory.newDataStack();
    stack.setInitialData(annotation);
    this.insertStack(1, stack);
  }

  insertStack(position: number, stack: DataStack) {
    this._stacks.splice(position, 0, stack);
  }

  replaceStack(position: number, stack: DataStack) {
    this._stacks[position] = stack;
  }

  setActiveStack(stack: DataStack) {
    let index = this._stacks.indexOf(stack, 0);
    if (index <= -1) {
      console.log(stack, "not found");
      return;
    }
    this._activeStack = stack;

    let toChange = this._stacks[index];
    this._stacks[index] = this._stacks[0];
    this._stacks[0] = toChange;

    if (this.currentStackSubscription != null && !this.currentStackSubscription.closed) {
      this.currentStackSubscription.unsubscribe();
    }
    this.currentStackSubscription = stack.topStackValue$.subscribe((dataStackItem: DataStackItem) => this.activeTopStackSubject.next(dataStackItem));
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

  getActiveStack() {
    return this._activeStack;
  }

  getActiveData(): DataStackItem[] {
    if (this._activeStack != null) {
      return this._activeStack.getData();
    }
    return [];
  }

  getActiveTopStackValue(): Observable<DataStackItem> {
    return this.activeTopStackValue$;
  }

  getActiveCurrentOperation(): DeepBlueOperation {
    if (this._activeStack != null) {
      return this._activeStack.getCurrentOperation();
    }
    return null;
  }

  getStacksTopOperation(): DeepBlueOperation[] {
    let ops: DeepBlueOperation[] = [];
    for (let stack of this._stacks) {
      ops.push(stack.getCurrentOperation());
    }
    return ops;
  }

  saveActiveStack() {
    let clone = this.getActiveStack().cloneStackItems();
    let stack: DataStack = this.dataStackFactory.newDataStack();
    stack.setInitialDataArray(clone);
    this.insertStack(1, stack);
  }

  ngOnDestroy() {
    console.log("SelectedData destroyed");
    this.annotationSubscription.unsubscribe();
  }

  getStackName(pos: number) {
    if (pos >= this._stacks.length) {
      return "Invalid Stack";
    }

    return this._stacks[pos].name();
  }

  getStackColor(pos: number, alpha: string) {
    if (pos >= this._stacks.length) {
      return "#FFFFFF";
    }

    return this._stacks[pos].getColor(alpha);
  }

}
