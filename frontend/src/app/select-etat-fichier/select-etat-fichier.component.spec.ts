import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEtatFichierComponent } from './select-etat-fichier.component';

describe('SelectEtatFichierComponent', () => {
  let component: SelectEtatFichierComponent;
  let fixture: ComponentFixture<SelectEtatFichierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectEtatFichierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectEtatFichierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
