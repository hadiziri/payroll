import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileToPrintSettingsComponent } from './file-to-print-settings.component';

describe('FileToPrintSettingsComponent', () => {
  let component: FileToPrintSettingsComponent;
  let fixture: ComponentFixture<FileToPrintSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileToPrintSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileToPrintSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
