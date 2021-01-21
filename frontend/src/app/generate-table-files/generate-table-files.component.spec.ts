import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTableFilesComponent } from './generate-table-files.component';

describe('GenerateTableFilesComponent', () => {
  let component: GenerateTableFilesComponent;
  let fixture: ComponentFixture<GenerateTableFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateTableFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateTableFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
