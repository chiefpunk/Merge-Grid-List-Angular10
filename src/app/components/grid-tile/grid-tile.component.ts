import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { GridTileModel } from 'src/app/models/grid-tile.model';
import { GridTile } from 'src/app/models/grid-tile.interface';

@Component({
  selector: 'app-grid-tile',
  templateUrl: './grid-tile.component.html',
  styleUrls: ['./grid-tile.component.scss']
})
export class GridTileComponent implements OnInit {
  @Input() tile: GridTile = new GridTileModel();
  @Output() tileClick = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick($event: MouseEvent): void {
    this.tileClick.emit($event);
  }

}
