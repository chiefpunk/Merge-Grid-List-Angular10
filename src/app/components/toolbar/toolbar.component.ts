import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { GridListSettingComponent } from '../grid-list-setting/grid-list-setting.component';
import { AppState } from 'src/app/store/reducers';
import * as GridListActions from 'src/app/store/actions/grid-list.actions';
import * as fromGridList from 'src/app/store/reducers/grid-list.reducer';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  isMergePossible$: Observable<boolean>;

  constructor(public dialog: MatDialog,
              private store: Store<AppState>) {}


  ngOnInit(): void {
    this.isMergePossible$ = this.store.select(fromGridList.selectGridListIsMergePossible);
  }

  openGenerateDialog(): void {
    const dialogRef = this.dialog.open(GridListSettingComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  mergeTiles(): void {
    this.store.dispatch(GridListActions.mergeTiles());
  }

}
