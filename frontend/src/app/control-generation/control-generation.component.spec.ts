import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlGenerationComponent } from './control-generation.component';

describe('ControlGenerationComponent', () => {
  let component: ControlGenerationComponent;
  let fixture: ComponentFixture<ControlGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlGenerationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
