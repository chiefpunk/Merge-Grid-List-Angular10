import { GridSetting } from './../../models/grid-setting.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl, Validators, FormBuilder, FormGroup} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import * as fromGridList from '../../store/reducers/grid-list.reducer';
import * as GridListActions from '../../store/actions/grid-list.actions';
import { Observable, Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-grid-list-setting',
  templateUrl: './grid-list-setting.component.html',
  styleUrls: ['./grid-list-setting.component.scss']
})
export class GridListSettingComponent implements OnInit, OnDestroy {

  settingForm: FormGroup;
  currentSetting: GridSetting;
  currentSetting$: Observable<GridSetting>;
  currentSettingSubscription: Subscription;

  constructor( private fb: FormBuilder,
               private store: Store<AppState>,
               private dialogRef: MatDialogRef<GridListSettingComponent>) { }

  ngOnInit(): void {
    this.createForm();

    this.currentSetting$ = this.store.select(fromGridList.selectGridListSetting);
    this.currentSettingSubscription = this.currentSetting$.subscribe(currentSetting => {
      if (currentSetting) {
        this.currentSetting = currentSetting;
        this.updateFormValues(this.currentSetting);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.currentSettingSubscription) {
      this.currentSettingSubscription.unsubscribe();
    }
  }

  createForm(): void {
    this.settingForm = this.fb.group({
      cols: new FormControl(0, [Validators.required]),
      rows: new FormControl(0, [Validators.required]),
      widthRatio: new FormControl(1, [Validators.required]),
      heightRatio: new FormControl(1, [Validators.required]),
    });
  }

  submitForm($event: any, formData: any): void {
    if (this.settingForm.valid) {

      this.store.dispatch(GridListActions.generateLists({
        setting: {
          cols: this.settingForm.get('cols').value,
          rows: this.settingForm.get('rows').value,
          widthRatio: this.settingForm.get('widthRatio').value,
          heightRatio: this.settingForm.get('heightRatio').value,
        }
      }));

      this.dialogRef.close();
    }
  }

  updateFormValues(setting: GridSetting): void {
    this.settingForm.patchValue({
      cols: setting.cols,
      rows: setting.rows,
      widthRatio: setting.widthRatio,
      heightRatio: setting.heightRatio,
    });
  }

}
