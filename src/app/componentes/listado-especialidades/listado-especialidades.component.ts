import { Component, OnInit, Output ,EventEmitter} from '@angular/core';
import { Especialidades } from 'src/app/clases/especialidades';
import { EspecialidadesService } from 'src/app/servicios/especialidades.service';
@Component({
  selector: 'app-listado-especialidades',
  templateUrl: './listado-especialidades.component.html',
  styleUrls: ['./listado-especialidades.component.css']
})
export class ListadoEspecialidadesComponent implements OnInit {

  public listadoEspecialidades : Especialidades[] = [];
  @Output() onSeleccionEspecialidad : EventEmitter<Especialidades> = new EventEmitter<Especialidades>();


  constructor(public serv: EspecialidadesService) {
    this.serv.getEspecialidades().subscribe(esp => {
      this.listadoEspecialidades = esp;
      console.log( this.listadoEspecialidades);
    });
   }

  ngOnInit(): void {
  }

  eligeEspecialidad ( esp : any ) {
    this.onSeleccionEspecialidad.emit( esp );
  }

}
