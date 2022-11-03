import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Historia } from 'src/app/clases/historia';
import { Turnos } from 'src/app/clases/turnos';
import { TurnosService } from 'src/app/servicios/turnos.service';
import Swal from 'sweetalert2';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { StorageService } from 'src/app/servicios/storage.service';


@Component({
  selector: 'app-turnos-especialistas',
  templateUrl: './turnos-especialistas.component.html',
  styleUrls: ['./turnos-especialistas.component.css']
})
export class TurnosEspecialistasComponent implements OnInit {

  public listadoTurnos: Turnos[] = [];
  turnoSeleccionado?: Turnos;
  formulario: FormGroup;
  turno: Turnos;
  turnoView: boolean = false;
  turnoEstado: boolean = false;
  comentario: string = '';
  resenia: string = '';
  diagnostico: any;
  estadoResenia: boolean = false;
  historia: Historia;
  claves: string[] = [];

  constructor(public serv: TurnosService, public storage: StorageService, public fb: FormBuilder, public afAuth: AngularFireAuth) {
    this.formulario = this.fb.group({
      'altura': ['', [Validators.required, Validators.min(40), Validators.max(220)]],
      'peso': ['', [Validators.required, Validators.min(3), Validators.max(320)]],
      'presion': ['', [Validators.required, Validators.minLength(4), Validators.maxLength(5)]],
      'temperatura': ['', [Validators.required, Validators.min(34), Validators.max(42)]],
      'clave': ['', [Validators.required]],
      'valor': ['', [Validators.required]],
      'clave1': ['', [Validators.required]],
      'valor1': ['', [Validators.required]],
      'clave2': ['', [Validators.required]],
      'valor2': ['', [Validators.required]]
    })

    this.turno = new Turnos();
    this.historia = new Historia();
  }

  ngOnInit(): void {
  }

  tomarTurnoParaDetalles(Nuevo: Turnos) {
    this.turnoView = false;
    this.turnoEstado = false;
    this.turno = Nuevo;
    this.resenia = this.turno.resenia;
    if (this.turno.estado == 'PENDIENTE') {
      this.turnoView = true;
    }
    if (this.turno.estado == 'ACEPTADO') {
      this.turnoEstado = true;
    }
    if (!this.turno.resenia) {
      this.estadoResenia = true;
    }
  }

  cancelarTurno() {
    if (!this.comentario) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Debe ingresar un comentario!'
      })
    } else {
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


  rechazarTurno() {
    this.turno.estado = 'RECHAZADO';
    this.serv.actualizarEstado(this.turno!);
    Swal.fire({
      icon: 'success',
      title: 'El turno fue RECHAZADO',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  aceptarTurno() {
    this.turno.estado = 'ACEPTADO';
    this.serv.actualizarEstado(this.turno!);
    Swal.fire({
      icon: 'success',
      title: 'El turno fue ACEPTADO',
      showConfirmButton: false,
      timer: 1500,
    });
  }

  finalizarTurno() {
    if (!this.comentario) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Debe ingresar un comentario!'
      })
    } else {
      this.turno.estado = 'REALIZADO';
      this.turno.diagnosticoPaciente = this.comentario;
      this.serv.actualizarEstado(this.turno!);
      Swal.fire({
        icon: 'success',
        title: 'El turno fue FINALIZADO',
        showConfirmButton: false,
        timer: 1500,
      });

    }
  }

  guardarHistoria() {
    try {
      const altura = this.formulario.value.altura;
      const peso = this.formulario.value.peso;
      const presion = this.formulario.value.presion;
      const temperatura = this.formulario.value.temperatura;
      const clave = this.formulario.value.clave;
      const valor = this.formulario.value.valor;
      const clave1 = this.formulario.value.clave1;
      const valor1 = this.formulario.value.valor1;
      const clave2 = this.formulario.value.clave2;
      const valor2 = this.formulario.value.valor2;
      const especialista = this.turno.especialista;
      let res = new Date();
      const fecha = res.getDate() + "/" + (res.getMonth() + 1) + "/" + res.getFullYear();

      if (
        !altura ||
        !peso ||
        !presion ||
        !temperatura
      ) {
        Swal.fire({
          icon: 'warning',
          title: 'Debe ingresar todos los datos',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {

        this.historia.id = this.turno.paciente;
        this.historia.altura = altura;
        this.historia.peso = peso;
        this.historia.presion = presion;
        this.historia.temperatura = temperatura;
        this.historia.clave = clave;
        this.historia.valor = valor;
        this.historia.clave1 = clave1;
        this.historia.valor1 = valor1;
        this.historia.clave2 = clave2;
        this.historia.valor2 = valor2;
        this.historia.fecha = fecha;
        this.historia.especialista = especialista;

        this.serv.saveHistoria(this.historia);

        //Agrego los atributos dinamicos al turno
        if (clave != "") {
          this.claves.push(clave)
        }
        if (clave1 != "") {
          this.claves.push(clave1)
        }
        if (clave2 != "") {
          this.claves.push(clave2)
        }
        this.turno.claves = this.claves;
        this.serv.actualizarEstado(this.turno!);

        Swal.fire({
          icon: 'success',
          title: 'La historia fue cargada con exito',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Se produjo un error!'
      })

    }

  }

}
