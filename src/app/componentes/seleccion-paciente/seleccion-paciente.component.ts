import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { UserService } from 'src/app/servicios/user.service';
@Component({
  selector: 'app-seleccion-paciente',
  templateUrl: './seleccion-paciente.component.html',
  styleUrls: ['./seleccion-paciente.component.css']
})
export class SeleccionPacienteComponent implements OnInit {

  public listado : Paciente[] = [];
  @Output() onSeleccionPaciente : EventEmitter<Paciente> = new EventEmitter<Paciente>();


  constructor(public serv: UserService) {
    this.serv.GetColeccion('pacientes').subscribe((pac)=>{
      this.listado = pac;
    })
   
   }

  ngOnInit(): void {
  }

  eligePaciente( pac : any ) {
    this.onSeleccionPaciente.emit( pac );
  
  }

}
