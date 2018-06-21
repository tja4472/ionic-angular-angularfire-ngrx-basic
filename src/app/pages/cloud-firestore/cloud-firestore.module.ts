import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CloudFirestorePage } from './cloud-firestore.page';

const routes: Routes = [
  {
    path: '',
    component: CloudFirestorePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    // FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CloudFirestorePage]
})
export class CloudFirestorePageModule {}
