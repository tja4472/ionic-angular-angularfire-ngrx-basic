import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Task } from './task.model';

export enum TaskActionTypes {
  DATABASE_LISTEN_FOR_DATA_START = '[Task] (Database) Listen For Data - Start',
  DATABASE_LISTEN_FOR_DATA_START_ERROR = '[Task] (Database) Listen For Data - Start - Error',
  DATABASE_LISTEN_FOR_DATA_STOP = '[Task] (Database) Listen For Data - Stop',
  DELETE_ITEM = '[Task] Delete Item',
  LOAD_SUCCESS = '[Task] Load Success',
  SELECT_ITEM = '[Task] Select Item',
  UPSERT_ITEM = '[Task] Upsert item',
  UPSERT_ITEM_ERROR = '[Task] Upsert Item - Error ',
  UPSERT_ITEM_SUCCESS = '[Task] Upsert Item - Success',

  // ==================
  LoadTasks = '[Task] Load Tasks',
  AddTask = '[Task] Add Task',
  UpsertTask = '[Task] Upsert Task',
  AddTasks = '[Task] Add Tasks',
  UpsertTasks = '[Task] Upsert Tasks',
  UpdateTask = '[Task] Update Task',
  UpdateTasks = '[Task] Update Tasks',
  DeleteTask = '[Task] Delete Task',
  DeleteTasks = '[Task] Delete Tasks',
  ClearTasks = '[Task] Clear Tasks',
}

export class DatabaseListenForDataStart implements Action {
  public readonly type = TaskActionTypes.DATABASE_LISTEN_FOR_DATA_START;

  constructor(
    public payload: {
      userId: string;
    },
  ) {}
}

export class DatabaseListenForDataStartError implements Action {
  public readonly type = TaskActionTypes.DATABASE_LISTEN_FOR_DATA_START_ERROR;

  constructor(
    public payload: {
      error: {
        code: string;
        message: string;
        name: string;
      };
    },
  ) {}
}

export class DatabaseListenForDataStop implements Action {
  public readonly type = TaskActionTypes.DATABASE_LISTEN_FOR_DATA_STOP;
}

export class DeleteItem implements Action {
  public readonly type = TaskActionTypes.DELETE_ITEM;

  constructor(public payload: { id: string; userId: string }) {}
}

export class LoadSuccess implements Action {
  public readonly type = TaskActionTypes.LOAD_SUCCESS;

  constructor(public payload: { items: Task[] }) {}
}

export class SelectItem implements Action {
  public readonly type = TaskActionTypes.SELECT_ITEM;

  constructor(public payload: { id: string }) {}
}

export class UpsertItem implements Action {
  public readonly type = TaskActionTypes.UPSERT_ITEM;

  constructor(public payload: { item: Task; userId: string }) {}
}

export class UpsertItemError implements Action {
  public readonly type = TaskActionTypes.UPSERT_ITEM_ERROR;

  constructor(
    public payload: {
      error: {
        code: string;
        message: string;
        name: string;
      };
    },
  ) {}
}

export class UpsertItemSuccess implements Action {
  public readonly type = TaskActionTypes.UPSERT_ITEM_SUCCESS;
}
// ==================


export class LoadTasks implements Action {
  readonly type = TaskActionTypes.LoadTasks;

  constructor(public payload: { tasks: Task[] }) {}
}

export class AddTask implements Action {
  readonly type = TaskActionTypes.AddTask;

  constructor(public payload: { task: Task }) {}
}

export class UpsertTask implements Action {
  readonly type = TaskActionTypes.UpsertTask;

  constructor(public payload: { task: Task }) {}
}

export class AddTasks implements Action {
  readonly type = TaskActionTypes.AddTasks;

  constructor(public payload: { tasks: Task[] }) {}
}

export class UpsertTasks implements Action {
  readonly type = TaskActionTypes.UpsertTasks;

  constructor(public payload: { tasks: Task[] }) {}
}

export class UpdateTask implements Action {
  readonly type = TaskActionTypes.UpdateTask;

  constructor(public payload: { task: Update<Task> }) {}
}

export class UpdateTasks implements Action {
  readonly type = TaskActionTypes.UpdateTasks;

  constructor(public payload: { tasks: Update<Task>[] }) {}
}

export class DeleteTask implements Action {
  readonly type = TaskActionTypes.DeleteTask;

  constructor(public payload: { id: string }) {}
}

export class DeleteTasks implements Action {
  readonly type = TaskActionTypes.DeleteTasks;

  constructor(public payload: { ids: string[] }) {}
}

export class ClearTasks implements Action {
  readonly type = TaskActionTypes.ClearTasks;
}

export type TaskActions =
  | DatabaseListenForDataStart
  | DatabaseListenForDataStartError
  | DatabaseListenForDataStop
  | LoadSuccess
  | SelectItem
  // ==================
  | LoadTasks
  | AddTask
  | UpsertTask
  | AddTasks
  | UpsertTasks
  | UpdateTask
  | UpdateTasks
  | DeleteTask
  | DeleteTasks
  | ClearTasks;
