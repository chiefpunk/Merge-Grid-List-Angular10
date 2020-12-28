import { GridListState, Rect } from 'src/app/store/state/grid-list.state';
import { GridSetting } from 'src/app/models/grid-setting.interface';
import { GridTileModel } from 'src/app/models/grid-tile.model';
import { TileStatus } from 'src/app/models/grid-tile.interface';

/**
 * Generate tile list under the settings given
 *
 * @param setting GridSetting
 */
export const generateList = (setting: GridSetting) => {
  const { cols, rows} = setting;
  const tiles: GridTileModel[] = [];
  for (let i = 0; i < rows; i ++ ) {
    for (let j = 0; j < cols; j ++ ) { 
      const newTile = new GridTileModel({
        cols: 1,
        rows: 1,
        color: 'lightgreen',
        text: `Tile (${i}, ${j})`,
        status: TileStatus.DEFAULT,
      })
      .setXPosition(j)
      .setYPosition(i);

      tiles.push(newTile);
    }
  }

  return tiles;
};

/**
 * Merge selection
 * If it's possible to merge, returns merged rect, otherwise returns null
 *
 * @param state GridListState
 * @param selectedTiles array of selected tile indexes
 */
export const mergeSelection = (state: GridListState, selectedTiles: number[]): Rect | null => {
  const { tiles } = state;
  selectedTiles.sort((a, b) => a - b);

  if (selectedTiles.length <= 1) { return null; }

  const firstTile = tiles[selectedTiles[0]];
  const x = firstTile.left;
  const y = firstTile.top;
  let w = firstTile.cols;
  let h = firstTile.rows;
  let totalArea = 0;


  for (const idx of selectedTiles) {
    const {left, top, cols, rows} = tiles[idx];

    if ((x <= left && x + w >= left) && (top >= y && top <= y + h)) {
      // exceeds horizontally
      if (left + cols > x + w) {
        // calcs how much it overlaps horizontally from the top left corner
        const overlapWidth = x + w - left;

        if (overlapWidth > 0) {
          w += (cols - overlapWidth);
        } else {
          w += cols;
        }
      }

      // exceeds vertically
      if (top + rows > y + h) {
        // calcs how much it overlaps vertically from the top left corner
        const overlapHeight = y + h - top;

        if (overlapHeight > 0) {
          h += (rows - overlapHeight);
        } else {
          h += rows;
        }
      }
    }

    totalArea += cols * rows;
  }

  // Selected tiles are all adjacent and can be merged
  if ( w * h === totalArea ) {
    return {
      x, y, w, h
    };
  }

  return null;
};

/**
 * Expand selection when tile is selected
 *
 * @param state GridListState
 * @param tileIndex selected tile index
 */
export const expandSelection = (state: GridListState, tileIndex: number) => {
  const { selectedTiles, tiles, selectedRect } = state;
  const tile = tiles[tileIndex];

  if (selectedTiles.length === 0) {
    state.selectedTiles = [tileIndex];
    state.selectedRect = {
      x: tile.left,
      y: tile.top,
      w: tile.cols,
      h: tile.rows,
    };
    state.isMergePossible = false;
  } else {
    state.selectedTiles.push(tileIndex);

    const mergedRect = mergeSelection(state, [...state.selectedTiles]);

    state.isMergePossible = mergedRect !== null;
    state.selectedRect = mergedRect ?? { x: 0, y: 0, w: 0, h: 0};
  }
};

/**
 * Shrink selection when tile is deselected
 *
 * @param state GridListState
 * @param tileIndex deselected tile index
 */
export const shrinkSelection = (state: GridListState, tileIndex: number) => {
  const {selectedTiles} = state;

  if (selectedTiles.length <= 0) {
    throw new Error('At least one tile should be selected');
  }

  state.selectedTiles = state.selectedTiles.filter(idx => tileIndex !== idx);

  const mergedRect = mergeSelection(state, [...state.selectedTiles]);

  state.isMergePossible = mergedRect !== null;
  state.selectedRect = mergedRect ?? { x: 0, y: 0, w: 0, h: 0};
};

/**
 * Merge selected tiles
 *
 * @param state GridListState
 */
export const mergeSelectedTiles = (state: GridListState) => {
  const { tiles, selectedRect } = state;

  // Sort by index
  const selectedTiles = [ ...state.selectedTiles];
  selectedTiles.sort((a, b) => a - b);

  if (selectedTiles.length <= 1) {
    throw new Error('Error: insufficient selected items');
  }

  // Get actual tile id
  const selectedTileIds = selectedTiles.map(idx => tiles[idx].id);

  // Don't remove the first tile
  selectedTileIds.shift();

  // Update first item's cols and rows
  state.tiles[selectedTiles[0]].setSize(selectedRect.w, selectedRect.h);
  state.tiles[selectedTiles[0]].setTileStatus(TileStatus.DEFAULT);

  // Remove others from the original list
  state.tiles = state.tiles.filter(tile => !selectedTileIds.includes(tile.id));

  // Reset
  state.isMergePossible = false;
  state.selectedTiles = [];
  state.selectedRect = { x: 0, y: 0, w: 0, h: 0};
};
