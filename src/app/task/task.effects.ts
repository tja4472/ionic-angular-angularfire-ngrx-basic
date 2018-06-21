import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TaskDataService } from './task.data.service';
import {
  DatabaseListenForDataStart,
  DatabaseListenForDataStop,
  TaskActionTypes,
  DatabaseListenForDataStartError,
  LoadSuccess,
  UpsertItem,
  UpsertItemSuccess,
  UpsertItemError,
  DeleteItem,
} from './task.actions';
import {
  catchError,
  concatMap,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { Task } from './task.model';
import { Store } from '@ngrx/store';
import * as FromRootReducer from '../reducers';
import { empty, of, from } from 'rxjs';

@Injectable()
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private dataService: TaskDataService,
    private store$: Store<FromRootReducer.State>,
  ) {}

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public deleteItem$ = this.actions$.pipe(
    ofType(TaskActionTypes.DELETE_ITEM),
    map((action: DeleteItem) => action.payload),
    tap((payload) => {
      console.log('Effect:deleteItem$:A', payload);
      this.dataService.deleteItem(payload.id, payload.userId);
    }),
  );

  // tslint:disable-next-line:member-ordering
  @Effect({ dispatch: false })
  public listenForData$ = this.actions$.pipe(
    ofType<DatabaseListenForDataStart | DatabaseListenForDataStop>(
      TaskActionTypes.DATABASE_LISTEN_FOR_DATA_START,
      TaskActionTypes.DATABASE_LISTEN_FOR_DATA_STOP,
    ),
    tap(() => {
      console.log('Effect:listenForData$:A');
    }),
    switchMap((action) => {
      console.log('Effect:listenForData$:action>', action);
      switch (action.type) {
        case TaskActionTypes.DATABASE_LISTEN_FOR_DATA_START: {
          return this.dataService.getData$(action.payload.userId).pipe(
            map((items: Task[]) => {
              this.store$.dispatch(new LoadSuccess({ items }));
            }),
            catchError((error) => {
              this.store$.dispatch(
                new DatabaseListenForDataStartError({
                  error: this.handleFirebaseError(error),
                }),
              );
              // Pass on to higher level.
              // throw error;
              return empty();
            }),
          );
        }

        default: {
          return empty();
        }
      }
    }),
    tap((x) => {
      console.log('Effect:listenForData$:B', x);
    }),
  );

  // tslint:disable-next-line:member-ordering
  @Effect()
  public upsertItem$ = this.actions$.pipe(
    ofType<UpsertItem>(TaskActionTypes.UPSERT_ITEM),
    map((action) => action.payload),
    switchMap((payload) => {
      return from(
        this.dataService.upsertItem(payload.item, payload.userId),
      ).pipe(
        map(() => new UpsertItemSuccess()),
        catchError((error) =>
          of(
            new UpsertItemError({
              error: this.handleFirebaseError(error),
            }),
          ),
        ),
      );
    }),
  );

  private handleFirebaseError(firebaseError: any) {
    //
    return {
      code: firebaseError.code,
      message: firebaseError.message,
      name: firebaseError.name,
    };
  }
}
