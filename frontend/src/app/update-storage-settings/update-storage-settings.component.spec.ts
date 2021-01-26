import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStorageSettingsComponent } from './update-storage-settings.component';

describe('UpdateStorageSettingsComponent', () => {
  let component: UpdateStorageSettingsComponent;
  let fixture: ComponentFixture<UpdateStorageSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStorageSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStorageSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
