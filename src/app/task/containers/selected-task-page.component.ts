import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromTasks from '../../reducers';
import { Task } from '../task.model';

@Component({
  selector: 'app-selected-task-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `



      <app-task-detail-form [task]="task$ | async"> </app-task-detail-form>

    `,
})
export class SelectedTaskPageComponent {
  public task$: Observable<Task>;

  constructor(private store: Store<fromTasks.State>) {
    this.task$ = store.pipe(select(fromTasks.getSelectedTask));
  }
}
