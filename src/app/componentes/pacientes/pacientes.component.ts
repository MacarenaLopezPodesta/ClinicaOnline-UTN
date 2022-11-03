import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
//import { display } from 'html2canvas/dist/types/css/property-descriptors/display';
import { UserService } from 'src/app/servicios/user.service';
@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css']
})
export class PacientesComponent implements OnInit {

  @Output() pacienteSeleccionadoEmitter:EventEmitter<any> = new EventEmitter();

  @Input() pacientes:any;

  selAnterior:string = '';

  constructor(public userService:UserService) 
  { 
  }

  ngOnInit(): void {}

  SeleccionarPaciente(seleccion:any)
  {
    this.pacienteSeleccionadoEmitter.emit(seleccion);

    let ref:any = document.getElementById(seleccion.id);

    if(this.selAnterior != '')
    {
      let refAnterior:any = document.getElementById(this.selAnterior);
      refAnterior.hidden = true;
    }

    this.selAnterior = seleccion.id;

    ref.hidden = false;
  }

}
