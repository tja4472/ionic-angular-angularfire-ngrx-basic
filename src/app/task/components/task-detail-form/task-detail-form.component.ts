import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromTasks from '../../../reducers';
import { Task } from '../../task.model';

@Component({
  selector: 'app-task-detail-form',
  templateUrl: './task-detail-form.component.html',
})
export class TaskDetailFormComponent implements OnChanges {
  //
  @Input() task: Task;

  @Output() submitted = new EventEmitter<Task>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: '',
    });
  }

  ngOnChanges() {
    this.rebuildForm();
  }

  rebuildForm() {
    console.log('rebuildForm>', this.task);
    this.form.reset({
      name: this.task.name,
    });
  }

  revert() {
    console.log('revert');
    this.rebuildForm();
  }

  onSubmit() {
    console.log('onSubmit');
    this.task = this.prepareSaveHero();
    // this.heroService.updateHero(this.hero).subscribe(/* error handling */);
    // this.rebuildForm();
    this.submitted.emit(this.task);
  }

  prepareSaveHero(): Task {
    const formModel = this.form.value;

    const saveHero: Task = {
      id: this.task.id,
      name: formModel.name as string,
      sysDateCreated: this.task.sysDateCreated,
      sysDateUpdated: this.task.sysDateUpdated,
    };

    return saveHero;
  }
}
