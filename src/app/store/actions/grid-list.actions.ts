import { createAction, props } from '@ngrx/store';
import { GridSetting } from 'src/app/models/grid-setting.interface';

export const generateLists = createAction(
  '[GridList] Generate GridLists',
  props<{ setting: GridSetting}>()
);

export const selectTile = createAction(
  '[GridList] Select GridTile',
  props<{ id: string}>()
);

export const deselectTile = createAction(
  '[GridList] Deselect GridTile',
  props<{ id: string}>()
);

export const mergeTiles = createAction(
  '[GridList] Merge Tiles',
);

export const setMergePossible = createAction(
  '[GridList] Set isMergePossible',
  props<{isPossible: boolean}>(),
);
