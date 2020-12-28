import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridListSettingComponent } from './grid-list-setting.component';

describe('GridListSettingComponent', () => {
  let component: GridListSettingComponent;
  let fixture: ComponentFixture<GridListSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridListSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridListSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
