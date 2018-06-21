import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from '../auth/auth.reducer';
import * as fromTask from '../task/task.reducer';

export interface State {
  auth: fromAuth.AuthState;
  task: fromTask.State;
}

export const reducers: ActionReducerMap<State> = {
  auth: fromAuth.reducer,
  task: fromTask.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];

export const getTaskState = (state: State) => state.task;

export const selectAllTasks = createSelector(
  getTaskState,
  fromTask.selectAll,
);
