import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import { Annotation } from '../domain/deepblue';

import { DeepBlueOperation } from '../domain/operations'

import { DeepBlueService } from '../service/deepblue';
import { DataStack, DataStackFactory, DataStackItem } from '../service/datastack';

@Injectable()
export class SelectedData {

  _activeStack: DataStack = null;
  _stacks: DataStack[] = [];

  currentStackSubscription: Subscription = null;

  public activeTopStackSubject = new Subject<DataStackItem>();
  public activeTopStackValue$: Observable<DataStackItem> = this.activeTopStackSubject.asObservable();

  annotationSubscription: Subscription;

  constructor(private deepBlueService: DeepBlueService, private dataStackFactory: DataStackFactory) {
    console.log("CREATING SELECTED DATA");
    this.annotationSubscription = deepBlueService.annotationValue$.subscribe((annotation: Annotation) => {
      let stack: DataStack = dataStackFactory.newDataStack();
      if (annotation.id != "") {
        console.log("Non empty annotation");
        stack.setInitialData(annotation);
        this.addStack(stack);
        this.setActiveStack(stack);
      }
    });
  }

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

    if (this.currentStackSubscription != null && !this.currentStackSubscription.closed) {
      this.currentStackSubscription.unsubscribe();
    }
    this.currentStackSubscription = stack.topStackValue$.subscribe((dataStackItem: DataStackItem) => this.activeTopStackSubject.next(dataStackItem));
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

  getActiveTopStackValue() : Observable<DataStackItem> {
    return this.activeTopStackValue$;
  }

  getActiveCurrentOperation(): DeepBlueOperation {
    if (this._activeStack != null) {
      return this._activeStack.getCurrentOperation();
    }
    return null;
  }

  getStacksTopOperation(): DeepBlueOperation[] {
    let ops : DeepBlueOperation[] = [];
    for (let stack of this._stacks) {

    }
    return ops;
  }

  saveActiveStack() {
    let clone = this.getActiveStack().cloneStackItems();
    let stack: DataStack = this.dataStackFactory.newDataStack();
    stack.setInitialDataArray(clone);
    this.addStack(stack);
  }

  ngOnDestroy() {
    console.log("SelectedData destroyed");
    this.annotationSubscription.unsubscribe();
  }

}
