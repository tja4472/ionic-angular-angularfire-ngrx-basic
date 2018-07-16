import {
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable, merge, of } from 'rxjs';
import { map, tap, switchMap, filter, take } from 'rxjs/operators';

import * as fromTasks from '../../reducers';
import * as TaskActions from '../task.actions';
import { Task, newTask } from '../task.model';
import { getUserId } from '../../auth/auth.selector';
import { TaskDataService } from '../task.data.service';
// import { getUserId } from '../../auth/auth.reducer';

@Component({
  selector: 'app-view-task-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
    <ion-back-button defaultHref="/"></ion-back-button>
    </ion-buttons>
    <ion-title>
      Task Detail
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
<app-task-detail-form [task]="task$ | async"
(submitted)="onSubmitted($event)"
> </app-task-detail-form>
      </ion-content>
    `,
})
export class ViewTaskPageComponent implements OnDestroy, OnInit {
  public task$: Observable<Task>;
  actionsSubscription: Subscription;

  constructor(
    private store: Store<fromTasks.State>,
    private route: ActivatedRoute,
    private router: Router,
    private taskDataService: TaskDataService,
  ) {
    /* params may be deprecated in a future Angular version.
    this.actionsSubscription = route.params
      .pipe(map((params) => new TaskActions.SelectItem({ id: params.id })))
      .subscribe(store);
    */
    /*
    this.actionsSubscription = route.paramMap
      .pipe(
        map((params) => new TaskActions.SelectItem({ id: params.get('id') })),
      )
      .subscribe(store);
*/
    // this.aaa$ = store.pipe(select(fromTasks.getTaskEntities));
    // this.task$ = store.pipe(select(fromTasks.getSelectedTask));
    // https://brianflove.com/2017/11/01/ngrx-anti-patterns/
    /*
    this.task$ = route.paramMap.pipe(
      tap((params) => {
        console.log('params.get("id")>', params.get('id'));
        return store.dispatch(
          new TaskActions.SelectItem({ id: params.get('id') }),
        );
      }),
      switchMap(() => store.pipe(select(fromTasks.getSelectedTask))),
    );

    this.task$.subscribe((x) => {
      console.log('zzzz>', x);
      if (x === undefined ) {
        console.log('undefined');
      }
    });
    */
    /*
    const newTask$: Observable<Task> = route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      filter((id) => id === 'new'),
      map(() => {
        // const a = {...newTask(), name: 'ssss'};
        return newTask();
      }),
    );

    const existingTask$ = route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      filter((id) => id !== 'new'),
      tap((id) => {
        console.log('id>', id);
        return store.dispatch(new TaskActions.SelectItem({ id }));
      }),
      switchMap(() => store.pipe(select(fromTasks.getSelectedTask))),
    );

    this.task$ = merge(newTask$, existingTask$);
*/
  }

  ngOnInit() {
    console.log('ngOnInit');
    const newTask$: Observable<Task> = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      filter((id) => id === 'new'),
      map(() => {
        return newTask();
      }),
    );

    const existingTask$ = this.route.paramMap.pipe(
      map((paramMap) => paramMap.get('id')),
      filter((id) => id !== 'new'),
      tap((id) => {
        console.log('id>', id);
        return this.store.dispatch(new TaskActions.SelectItem({ id }));
      }),
      switchMap(() => this.store.pipe(select(fromTasks.getSelectedTask))),
    );

    this.task$ = merge(newTask$, existingTask$);
  }

  /**
   * https://angular.io/guide/router#activated-route-in-action
   * ngOnInit() {
  this.hero$ = this.route.paramMap.pipe(
    switchMap((params: ParamMap) =>
      this.service.getHero(params.get('id')))
  );
}
   */

  // Request — Reply
  // https://blog.nrwl.io/ngrx-patterns-and-techniques-f46126e2b1e5

  onSubmitted(task: Task) {
    this.store
      .pipe(
        select(getUserId),
        take(1),
      )
      .subscribe((userId) => {
        // this.store.dispatch(new TaskActions.UpsertItem({ item: task, userId }));
        this.taskDataService
          .upsertItem(task, userId)
          .then(() => {
            this.router.navigate([
              '/cloud-firestore',
              { id: task.id, foo: 'foo' },
            ]);
            // this.router.navigate(['/cloud-firestore']);
          })
          .catch((error) => {
            console.log('error>', error);
          });
      });
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    // this.actionsSubscription.unsubscribe();
  }
}
