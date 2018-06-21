import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import { from } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly auth$: AngularFireAuth) {}

  public authState$() {
    return this.auth$.authState;
  }

  public signInWithEmailAndPassword(email: string, password: string) {
    return this.auth$.auth.signInWithEmailAndPassword(email, password);
  }

  public signOut() {
    return from(this.auth$.auth.signOut());
  }
}
