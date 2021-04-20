import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateControlledEtatFichierComponent } from './generate-controlled-etat-fichier.component';

describe('GenerateControlledEtatFichierComponent', () => {
  let component: GenerateControlledEtatFichierComponent;
  let fixture: ComponentFixture<GenerateControlledEtatFichierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateControlledEtatFichierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateControlledEtatFichierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
