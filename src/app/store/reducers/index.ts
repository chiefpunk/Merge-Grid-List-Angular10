import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';

import { GridListState } from './../state/grid-list.state';
import * as fromGridList from './grid-list.reducer';

export interface AppState {
  gridList: GridListState;
}

export const reducers: ActionReducerMap<AppState> = {
  gridList: fromGridList.reducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
