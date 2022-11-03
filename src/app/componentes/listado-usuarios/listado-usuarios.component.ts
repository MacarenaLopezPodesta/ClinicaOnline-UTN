import { Component, Input, OnInit, Output,EventEmitter  } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { UserService } from 'src/app/servicios/user.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  @Output() public especialistaSeleccionado : EventEmitter<any> = new EventEmitter<Especialista>();
  @Output() public pacienteSeleccionado : EventEmitter<any> = new EventEmitter<Paciente>();
  @Output() public pacienteDescarga : EventEmitter<any> = new EventEmitter<Paciente>();
  @Input() public listadoPacientes? : Paciente[];
  @Input() public listadoEsp? : Especialista[];
  constructor(public serv: UserService) { 
   this.listadoPacientes = [];
   this.listadoEsp = [];
   console.log(this.listadoEsp);
  }

  ngOnInit(): void {
   
  }

  eligeEspecialista ( esp : Especialista ) {
    this.especialistaSeleccionado.emit( esp );
  }

  eligePaciente ( pac : Paciente ) {
    this.pacienteSeleccionado.emit( pac );
  }

  descargaPaciente ( pac : Paciente ) {
    this.pacienteDescarga.emit( pac );
  }

}
