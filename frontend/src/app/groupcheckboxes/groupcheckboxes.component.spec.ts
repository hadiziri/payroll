import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupcheckboxesComponent } from './groupcheckboxes.component';

describe('GroupcheckboxesComponent', () => {
  let component: GroupcheckboxesComponent;
  let fixture: ComponentFixture<GroupcheckboxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupcheckboxesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupcheckboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
