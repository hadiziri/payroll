import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloturePaieComponent } from './cloture-paie.component';

describe('CloturePaieComponent', () => {
  let component: CloturePaieComponent;
  let fixture: ComponentFixture<CloturePaieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloturePaieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloturePaieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
