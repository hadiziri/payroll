import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesGeneratorComponent } from './files-generator.component';

describe('FilesGeneratorComponent', () => {
  let component: FilesGeneratorComponent;
  let fixture: ComponentFixture<FilesGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesGeneratorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
