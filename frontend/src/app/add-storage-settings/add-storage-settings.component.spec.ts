import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStorageSettingsComponent } from './add-storage-settings.component';

describe('AddStorageSettingsComponent', () => {
  let component: AddStorageSettingsComponent;
  let fixture: ComponentFixture<AddStorageSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStorageSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStorageSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
