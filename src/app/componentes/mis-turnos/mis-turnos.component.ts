import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Turnos } from 'src/app/clases/turnos';
import { UserService } from 'src/app/servicios/user.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { getAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  public listadoTurnos: Turnos[] = [];
  turnoSeleccionado?: Turnos;
  turno: Turnos;
  usuarioPaciente:boolean=false;
  usuario: any;
  usuarioLog: any;
  constructor(public serv: TurnosService,public sesion: UserService) { 
    this.turno = new Turnos();
  }

  ngOnInit(): void {
    const auth = getAuth();
    if (auth.currentUser != null) {
      this.usuarioLog = auth.currentUser;
      this.usuario = this.sesion.traerUsuario(this.usuarioLog);
      console.log(this.usuario);
    }
    if (this.usuario.paciente) {
      console.log(this.usuario.paciente);
      this.usuarioPaciente = true;
      
    }
    
   
  }

  tomarTurnoParaDetalles(Nuevo: Turnos) {
    this.turno = Nuevo;
  }


}
