import shortid from 'shortid';
import { GridTile, TileStatus } from './grid-tile.interface';

export class GridTileModel implements GridTile {
  id: string;
  color: string;
  cols: number;
  rows: number;
  text: string;
  status: TileStatus;

  left: number;
  top: number;

  constructor(t: Partial<GridTile> = {color: 'transparent', cols: 1, rows: 1, text: 'New tile', status: TileStatus.DEFAULT}) {
    Object.assign(this, t);
    this.id = shortid.generate();
  }

  get background(): string {
    if (this.status === TileStatus.DEFAULT) {
      return this.color;
    }

    if (this.status === TileStatus.SELECTED) {
      return 'lightcyan';
    }

    return this.color;
  }

  setTileStatus(status: TileStatus): void {
    this.status = status;
  }

  setSize(w: number, h: number): void {
    this.cols = w;
    this.rows = h;
  }

  setXPosition(x: number): GridTileModel {
    this.left = x;
    return this;
  }

  setYPosition(y: number): GridTileModel {
    this.top = y;
    return this;
  }
}
