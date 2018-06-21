import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
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
import { AngularFirestore } from 'angularfire2/firestore';

const DATA_COLLECTION = 'tasks';
const USERS_COLLECTION = 'users';

interface FirestoreDoc {
  id: string;
  name: string;
  sysDateCreated: string;
  sysDateUpdated: string;
}

@Injectable()
export class TaskDataService {
  constructor(public readonly afs: AngularFirestore) {}

  public getData$(userId: string): Observable<Task[]> {
    //
    return this.firestoreCollection(userId)
      .valueChanges()
      .pipe(
        map((items) =>
          items.map((item) => {
            return this.fromFirestoreDoc(item);
          }),
        ),
      );
  }

  public deleteItem(id: string, userId: string): void {
    this.firestoreCollection(userId)
      .doc(id)
      .delete();
  }

  public upsertItem(item: Task, userId: string): Promise<void> {
    //
    if (item.id === '') {
      return this.createItem(item, userId);
    } else {
      return this.updateItem(item, userId);
    }
  }

  private createItem(item: Task, userId: string): Promise<void> {
    //
    const doc = this.toFirestoreDoc(item);
    const dateNow = Date().toString();
    doc.id = this.afs.createId();
    const recordToSet: FirestoreDoc = {
      ...doc,
      sysDateCreated: dateNow,
      sysDateUpdated: dateNow,
    };

    return this.firestoreCollection(userId)
      .doc(recordToSet.id)
      .set(recordToSet);
  }

  private updateItem(item: Task, userId: string): Promise<void> {
    //
    const doc = this.toFirestoreDoc(item);
    const dateNow = Date().toString();
    const recordToUpdate: FirestoreDoc = {
      ...doc,
      sysDateUpdated: dateNow,
    };

    return this.firestoreCollection(userId)
      .doc(doc.id)
      .update(recordToUpdate);
  }

  private firestoreCollection(userId: string) {
    //
    return this.afs
      .collection(USERS_COLLECTION)
      .doc(userId)
      .collection<FirestoreDoc>(DATA_COLLECTION);
  }

  private toFirestoreDoc(item: Task) {
    //
    const result: FirestoreDoc = {
      id: item.id,
      name: item.name,
      sysDateCreated: item.sysDateCreated,
      sysDateUpdated: item.sysDateUpdated,
    };

    return result;
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
}
