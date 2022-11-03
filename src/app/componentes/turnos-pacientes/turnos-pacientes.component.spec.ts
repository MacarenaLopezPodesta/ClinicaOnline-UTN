import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosPacientesComponent } from './turnos-pacientes.component';

describe('TurnosPacientesComponent', () => {
  let component: TurnosPacientesComponent;
  let fixture: ComponentFixture<TurnosPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosPacientesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnosPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
