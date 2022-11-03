import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosEspecialistasComponent } from './turnos-especialistas.component';

describe('TurnosEspecialistasComponent', () => {
  let component: TurnosEspecialistasComponent;
  let fixture: ComponentFixture<TurnosEspecialistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TurnosEspecialistasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnosEspecialistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
