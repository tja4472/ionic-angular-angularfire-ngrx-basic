import {
  Component,
  OnInit,
  AfterViewChecked,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { auth, User } from 'firebase';
import { BehaviorSubject, Observable, pipe, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task, newTask } from '../../task/task.model';
import { Store, select } from '@ngrx/store';

import * as FromRoot from '../../reducers';
import * as fromTasks from '../../reducers';

import {
  EmailAuthentication,
  ListenForAuth,
  SignOut,
} from '../../auth/auth.action';
import * as FromAuthSelector from '../../auth/auth.selector';
import { TaskService } from '../../task/task.service';
import { SelectItem } from '../../task/task.actions';

const DATA_COLLECTION = 'tasks';
const USERS_COLLECTION = 'users';

interface FirestoreDoc {
  id: string;
  name: string;
  sysDateCreated: string;
  sysDateUpdated: string;
}

interface FormModel {
  password: string;
  username: string;
}

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.page.html',
  styleUrls: ['./task-detail.page.scss'],
})
export class TaskDetailPage implements OnDestroy, OnInit, AfterViewInit {
  actionsSubscription: Subscription;
  // public authHasChecked$ = new BehaviorSubject(false);
  public authHasChecked$: Observable<boolean>;

  // public authIsAuthorized$ = new BehaviorSubject(false);
  public authIsAuthorized$: Observable<boolean>;

  public hasChecked: boolean;
  public signupForm: FormGroup;

  public data$: Observable<ReadonlyArray<Task>>;

  private userId: string;

  private formModel() {
    return this.signupForm.value as FormModel;
  }

  constructor(
    private route: ActivatedRoute,
    public afAuth: AngularFireAuth,
    public readonly afs: AngularFirestore,
    public formBuilder: FormBuilder,
    private readonly taskService: TaskService,
    private store: Store<FromRoot.State>,
  ) {
    //
    //  let todoId = this.route.snapshot.paramMap.get('id');
    //
    this.actionsSubscription = route.params
      .pipe(map((params) => new SelectItem({ id: params.id })))
      .subscribe(store);
    //////
    store.pipe(select(fromTasks.getSelectedTask)).subscribe((x) => {
      console.log('####task>', x);

    });

/*
// selected-book-page.component.ts
  this.book$ = store.pipe(select(fromBooks.getSelectedBook)) as Observable<
      Book
    >;


*/
// https://toddmotto.com/angular-parent-routing-params
// https://stackoverflow.com/questions/40967726/angular2-ngrx-store-with-route-parameters

/* All I really want is the task */


    //////
    this.createForm();

    this.authHasChecked$ = this.store.pipe(
      select(FromAuthSelector.getHasDoneFirstCheck),
    );
    this.authIsAuthorized$ = this.store.pipe(
      select(FromAuthSelector.getIsAuthenticated),
    );
    this.data$ = taskService.getData$();
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    // const xx = this.route.snapshot.paramMap.get('id');
    // console.log('form param>', xx);
  }

  public doCreateItem() {
    console.log('doCreateItem');
    const now = Date().toString();
    const item = {
      ...newTask(),
      name: 'Task:' + now,
    };

    this.taskService.upsertItem(item);

    /*
    const doc: FirestoreDoc = {
      id: this.afs.createId(),
      name: 'Task:' + now,
      sysDateCreated: now,
      sysDateUpdated: now,
    };

    this.firestoreCollection(this.userId)
      .doc(doc.id)
      .set(doc);
    */
  }

  public doDeleteItem(item: Task) {
    console.log('doDeleteItem');
    this.taskService.deleteItem(item);
    /*
    this.firestoreCollection(this.userId)
      .doc(item.id)
      .delete();
    */
  }

  public doUpdateItem(item: Task) {
    console.log('doUpdateItem');
    console.log('item>', item);
    const now = Date().toString();
    const itemUpdated = {
      ...item,
      name: 'Task(U):' + now,
    };

    this.taskService.upsertItem(itemUpdated);
    /*
    const now = Date().toString();
    const doc: FirestoreDoc = {
      id: item.id,
      name: 'Task(U):' + now,
      sysDateCreated: item.sysDateCreated,
      sysDateUpdated: now,
    };

    this.firestoreCollection(this.userId)
      .doc(item.id)
      .set(doc);
    */
  }

  public doListenForAuth() {
    console.log('doListenForAuth');

    /*
    if (!this.authHasChecked$.value) {
      this.listenForAuth();
    }
    */
    this.store.dispatch(new ListenForAuth());
  }

  public doListenForData() {
    console.log('doListenForData');
    this.taskService.ListenForDataStart();
    /*
    this.data$ = this.firestoreCollection(this.userId)
      .valueChanges()
      .pipe(
        map((items) =>
          items.map((item) => {
            return this.fromFirestoreDoc(item);
          }),
        ),
      );
    */
  }

  public doSignIn() {
    console.log('doSignIn');
    const formModel = this.formModel();
    console.log('username>', formModel.username);
    console.log('password>', formModel.password);

    /*
    this.afAuth.auth.signInWithEmailAndPassword(
      formModel.username,
      formModel.password,
    );
    */

    this.store.dispatch(
      new EmailAuthentication({
        password: formModel.password,
        userName: formModel.username,
      }),
    );
  }

  public doSignOut() {
    console.log('doSignOut');
    // this.afAuth.auth.signOut();
    this.store.dispatch(new SignOut());
  }

  private createForm(): void {
    this.signupForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      username: ['', Validators.required],
    });
  }

  private firestoreCollection(userId: string) {
    //
    return this.afs
      .collection(USERS_COLLECTION)
      .doc(userId)
      .collection<FirestoreDoc>(DATA_COLLECTION);
  }

  private fromFirestoreDoc(x: FirestoreDoc): Task {
    //
    const result: Task = {
      id: x.id,
      name: x.name,
      sysDateCreated: x.sysDateCreated,
      sysDateUpdated: x.sysDateUpdated,
    };

    return result;
  }

  /*
  private listenForAuth() {
    console.log('listenForAuth');

    this.afAuth.auth.onAuthStateChanged((firebaseUser: User) => {
      console.log('onAuthStateChanged>', firebaseUser);
      this.authHasChecked$.next(true);

      if (firebaseUser) {
        this.authIsAuthorized$.next(true);
        this.userId = firebaseUser.uid;
        // console.log('userId>', this.userId);
      } else {
        this.authIsAuthorized$.next(false);
        this.userId = null;
      }
    });
  }
  */

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
