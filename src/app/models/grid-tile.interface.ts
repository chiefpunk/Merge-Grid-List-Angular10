export interface GridTile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  status: TileStatus;
  background: string;
}

export enum TileStatus {
  DEFAULT,
  SELECTED,
  MERGED
}
