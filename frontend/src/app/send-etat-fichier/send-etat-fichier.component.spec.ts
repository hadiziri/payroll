import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendEtatFichierComponent } from './send-etat-fichier.component';

describe('SendEtatFichierComponent', () => {
  let component: SendEtatFichierComponent;
  let fixture: ComponentFixture<SendEtatFichierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendEtatFichierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendEtatFichierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
