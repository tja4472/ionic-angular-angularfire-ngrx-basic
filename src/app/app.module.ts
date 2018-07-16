import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { MY_FIREBASE_APP_CONFIG } from './my-firebase-app-config';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
// import { AppEffects } from './app.effects';
import { AuthEffects } from './auth/auth.effect';
import { AuthService } from './auth/auth.service';
import { TaskEffects } from './task/task.effects';
import { TaskService } from './task/task.service';
import { TaskDataService } from './task/task.data.service';

import { ViewTaskPageComponent } from './task/containers/view-task-page.component';
import { SelectedTaskPageComponent } from './task/containers/selected-task-page.component';
import { TaskDetailFormComponent } from './task/components/task-detail-form/task-detail-form.component';

@NgModule({
  declarations: [AppComponent, ViewTaskPageComponent, SelectedTaskPageComponent, TaskDetailFormComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(MY_FIREBASE_APP_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AuthEffects, TaskEffects]),
  ],
  providers: [
    AuthService,
    TaskDataService,
    TaskService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
