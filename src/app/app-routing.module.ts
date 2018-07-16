import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewTaskPageComponent } from './task/containers/view-task-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  {
    path: 'cloud-firestore',
    loadChildren:
      './pages/cloud-firestore/cloud-firestore.module#CloudFirestorePageModule',
  },
  /*
  { path: 'task-detail/create', loadChildren: './pages/task-detail/task-detail.module#TaskDetailPageModule' },
  { path: 'task-detail/edit/:id', loadChildren: './pages/task-detail/task-detail.module#TaskDetailPageModule' },
  */

  { path: 'task-detail/:id', component: ViewTaskPageComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
