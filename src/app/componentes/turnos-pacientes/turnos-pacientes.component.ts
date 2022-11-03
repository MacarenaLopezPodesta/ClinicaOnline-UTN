import { Component, OnInit } from '@angular/core';
import { Turnos } from 'src/app/clases/turnos';
import { TurnosService } from 'src/app/servicios/turnos.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-turnos-pacientes',
  templateUrl: './turnos-pacientes.component.html',
  styleUrls: ['./turnos-pacientes.component.css']
})
export class TurnosPacientesComponent implements OnInit {

  public listadoTurnos: Turnos[] = [];
  turnoSeleccionado?: Turnos;
  turno: Turnos;
  comentario: string = '';
  resenia:string = '';
  encuesta:string = '';
  calificacion:string = '';
  estadoTurno: boolean = false;
  estadoResenia: boolean = false;

  constructor(public serv: TurnosService) {
    this.turno = new Turnos();
  }

  ngOnInit(): void {
  }

  tomarTurnoParaDetalles(Nuevo: Turnos) {
    this.turno = Nuevo;
    this.resenia = this.turno.resenia;
    if (this.resenia == '') {
      this.estadoResenia = false;
    } else {
      this.estadoResenia = true;
    }

    if (this.turno.estado == 'REALIZADO') {
      this.estadoTurno = true;
    } else {
      this.estadoTurno = false;
    }
  }

  cancelarTurno() {
    if(!this.comentario){
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Debe ingresar un comentario!'
      })
    }else{
    this.turno.estado = 'CANCELADO';
    this.turno.resenia = this.comentario;
    this.serv.actualizarEstado(this.turno!);
    Swal.fire({
      icon: 'success',
      title: 'El turno fue cancelado',
      showConfirmButton: false,
      timer: 1500,
    });
  
    }
  }

  calificarTurno() {
    if(!this.calificacion){
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Debe ingresar un comentario!'
      })
    }else{
    this.turno.comentarioPaciente = this.calificacion;
    this.serv.actualizarEstado(this.turno!);
    Swal.fire({
      icon: 'success',
      title: 'Gracias por su calificación',
      showConfirmButton: false,
      timer: 1500,
    });
  
    }
  }

encuestaTurno() {
    if(!this.encuesta){
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Debe valor en la encuesta!'
      })
    }else{
    this.turno.encuesta = this.encuesta;
    this.serv.actualizarEstado(this.turno!);
    Swal.fire({
      icon: 'success',
      title: 'Gracias por su encuesta',
      showConfirmButton: false,
      timer: 1500,
    });
  
    }
  }


  turnoact() {
    this.estadoTurno = true;
  }


}
