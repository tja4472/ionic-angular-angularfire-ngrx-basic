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

export const getSelectedTaskId = createSelector(
  getTaskState,
  fromTask.getSelectedId,
);

export const {
  selectIds: getTaskIds,
  selectEntities: getTaskEntities,
  selectAll: getAllTasks,
  selectTotal: getTotalTasks,
} = fromTask.adapter.getSelectors(getTaskState);

export const getSelectedTask = createSelector(
  getTaskEntities,
  getSelectedTaskId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  },
);
