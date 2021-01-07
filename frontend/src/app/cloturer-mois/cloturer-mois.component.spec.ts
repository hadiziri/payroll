import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloturerMoisComponent } from './cloturer-mois.component';

describe('CloturerMoisComponent', () => {
  let component: CloturerMoisComponent;
  let fixture: ComponentFixture<CloturerMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloturerMoisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloturerMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
