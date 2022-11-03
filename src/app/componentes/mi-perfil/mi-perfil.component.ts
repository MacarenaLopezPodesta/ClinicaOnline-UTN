import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Historia } from 'src/app/clases/historia';
import { Horarios } from 'src/app/clases/horarios';
import { Turnos } from 'src/app/clases/turnos';
//import { GenerarPDFService } from 'src/app/services/generar-pdf.service';
import { HorariosEspService } from 'src/app/servicios/horarios-esp.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { UserService } from 'src/app/servicios/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  nombre: string = '';
  apellido: string = '';
  dni?: number;
  especialidad: string = '';
  mail: string = '';
  edad?: number;
  load: boolean = false;
  loadAtencion: boolean = false;
  loadHistoria: boolean = false;
  usuario: any;
  usuarioLog: any;

  horaDesde: string = '';
  horaHasta: string = '';
  historia:Historia[] = [];
  turnos:Turnos[] = [];
  dias: string[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  horarioDesde: string[] = ['8:00','8:30', '9:00','9:30', '10:00','10:30', '11:00','11:30', '12:00','12:30',  '13:00','13:30', '14:00','14:30', '15:00', '15:30','16:00','16:30', '17:00', '17:30','18:00','18:30'];
  horarioHasta: string[] = ['8:30', '9:00','9:30', '10:00','10:30', '11:00','11:30', '12:00','12:30',  '13:00','13:30', '14:00','14:30', '15:00', '15:30','16:00','16:30', '17:00', '17:30','18:00','18:30','19:00'];
  horarioDesdeSab: string[] = ['8:00','8:30', '9:00','9:30', '10:00','10:30', '11:00','11:30', '12:00','12:30',  '13:00','13:30'];
  horarioHastaSab: string[] = ['8:30', '9:00','9:30', '10:00','10:30', '11:00','11:30', '12:00','12:30',  '13:00','13:30', '14:00'];
  dia: string = '';
  objHorario: Horarios;
  diaSabado: boolean = false;
  mostrarHorario: boolean = false;

  constructor(public serv: UserService, public servHorario: HorariosEspService,public service:TurnosService) {
    this.objHorario = new Horarios();

  }

  async ngOnInit(){

    const auth = getAuth();
    if (auth.currentUser != null) {
      this.usuarioLog = auth.currentUser;
      this.usuario = this.serv.traerUsuario(this.usuarioLog);
    
    }
    if(this.usuario.paciente){
      this.historia = await this.service.getHistoriaPaciente(this.usuario.id);
    }
  
    if(this.usuario.especialista){
      this.turnos = await this.service.getTurnosEspecialista(this.usuario.id);
    }
  }

  configuracion() {
    this.loadAtencion = true;
  }

  getHistoria() {
    this.loadHistoria = true;
  }

  cerrarHistoria() {
    this.loadHistoria = false;
  }

  cerrarConfiguracion() {
    this.loadAtencion = false;
  }

  guardarHorario() {
    let inicio = parseInt(this.horaDesde); 
    let fin = parseInt(this.horaHasta); 
    if (!this.especialidad ||
      !this.dia ||
      !this.horaDesde ||
      !this.horaHasta) {
      Swal.fire({
        icon: 'warning',
        title: 'Debe ingresar todos los datos',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {

      if (inicio >= fin) {
        Swal.fire({
          icon: 'warning',
          title: 'Corrobore el horario de atención',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this.objHorario.iniciarHorario(this.especialidad, this.usuario.mail, this.dia, this.horaDesde, this.horaHasta);
        this.servHorario.saveHorario(this.objHorario);
        Swal.fire({
          icon: 'success',
          title: 'La configuración se realizo con exito',
          showConfirmButton: false,
          timer: 1500,
        });
        this.limpiarForm();
        this.cerrarConfiguracion();
      }
    }
  }

  async guardarHistoria(){
    const nombre = this.usuario.nombre + " " + this.usuario.apellido;
    const nombreDoc = this.usuario.mail + ".pdf";
   // this.pdfService.crearPDFHistoria( nombreDoc,nombre, this.historia );
    return
  }

  async guardarTurnos(){
    const nombre = this.usuario.nombre + " " + this.usuario.apellido;
    const nombreDoc = this.usuario.mail + ".pdf";
  //  this.pdfService.crearPDFTurnos( nombreDoc,nombre, this.turnos );
    return
  }


  limpiarForm(){
    this.dia='';
    this.especialidad='';
    this.horaDesde='';
    this.horaHasta='';
  }

}
