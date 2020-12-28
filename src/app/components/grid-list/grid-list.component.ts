import { GridSetting } from './../../models/grid-setting.interface';
import { GridTileModel } from './../../models/grid-tile.model';
import { TileStatus, GridTile } from './../../models/grid-tile.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import * as fromGridList from 'src/app/store/reducers/grid-list.reducer';
import * as GridListActions from 'src/app/store/actions/grid-list.actions';

@Component({
  selector: 'app-grid-list',
  templateUrl: './grid-list.component.html',
  styleUrls: ['./grid-list.component.scss']
})
export class GridListComponent implements OnInit, OnDestroy {

  tiles: GridTileModel[];
  currentSettings: GridSetting;

  currentSettings$: Observable<GridSetting>;
  tilesUpdated$: Observable<GridTileModel[]>;

  tilesUpdatedSubscription: Subscription;
  сurrentSettingsSubscription: Subscription;

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {
    this.tilesUpdated$ = this.store.select(fromGridList.selectGridListTiles);
    this.currentSettings$ = this.store.select(fromGridList.selectGridListSetting);

    this.сurrentSettingsSubscription = this.currentSettings$.subscribe(settings => {
      if (settings) {
        this.currentSettings = settings;
      }
    });

    this.tilesUpdatedSubscription = this.tilesUpdated$.subscribe(updatedTiles => {
      if (updatedTiles) {
        this.tiles = updatedTiles;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.tilesUpdatedSubscription) {
      this.tilesUpdatedSubscription.unsubscribe();
    }

    if (this.сurrentSettingsSubscription) {
      this.сurrentSettingsSubscription.unsubscribe();
    }
  }

  addTile(): void {

  }

  onTileClicked(tile: GridTileModel, event: MouseEvent): void {
    if (event.metaKey) {
      this.store.dispatch(tile.status === TileStatus.SELECTED ?
        GridListActions.deselectTile({ id: tile.id})
        :
        GridListActions.selectTile({ id: tile.id}));
    }
  }

  get rowHeight(): string {
    const {widthRatio, heightRatio} = this.currentSettings;

    return `${widthRatio}:${heightRatio}`;
  }

}
