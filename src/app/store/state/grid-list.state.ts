import { GridSetting } from 'src/app/models/grid-setting.interface';
import { GridTileModel } from 'src/app/models/grid-tile.model';

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
export interface GridListState {
  tiles: GridTileModel[];
  setting: GridSetting;
  isMergePossible: boolean;
  selectedRect: Rect;
  selectedTiles: number[];
}

export const initialState: GridListState = {
  tiles: [],
  setting: {
    cols: 4,
    rows: 4,
    widthRatio: 1,
    heightRatio: 1
  },
  isMergePossible: false,
  selectedTiles: [],
  selectedRect: {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  }
};
