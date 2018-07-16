import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { Task } from './task.model';

import {
  DatabaseListenForDataStart,
  DatabaseListenForDataStop,
  DeleteItem,
  UpsertItem,
} from './task.actions';

import * as FromAuthSelector from '../auth/auth.selector';
import * as FromRootReducer from '../reducers';
import { filter, take } from 'rxjs/operators';

import { Observable } from 'rxjs';

// TaskDespatchers??????
@Injectable()
export class TaskService {
  //
  private init$ = this.store.pipe(
    select(FromAuthSelector.getUserId),
    filter((userId) => userId !== ''),
  );

  constructor(private store: Store<FromRootReducer.State>) {}

  public getData$(): Observable<ReadonlyArray<Task>> {
    //
    return this.store.pipe(select(FromRootReducer.getAllTasks));
  }

  public ListenForDataStart(): void {
    //
    this.init$.pipe(take(1)).subscribe((userId) => {
      this.store.dispatch(new DatabaseListenForDataStart({ userId }));
    });
  }

  public ListenForDataStop(): void {
    //
    this.store.dispatch(new DatabaseListenForDataStop());
  }

  public deleteItem(item: Task) {
    //
    this.init$.pipe(take(1)).subscribe((userId) => {
      this.store.dispatch(new DeleteItem({ id: item.id, userId }));
    });
  }

  public upsertItem(item: Task) {
    //
    this.init$.pipe(take(1)).subscribe((userId) => {
      this.store.dispatch(new UpsertItem({ item, userId }));
    });
  }

  /*
  public isLoaded(): Observable<boolean> {
    //
    return this.store.pipe(select(FromRootReducer.getGadgetLoaded));
  }

  public isLoading(): Observable<boolean> {
    return this.store.pipe(select(FromRootReducer.getGadgetLoading));
  }
  */
}
