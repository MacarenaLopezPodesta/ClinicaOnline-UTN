import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Turnos } from 'src/app/clases/turnos';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { UserService } from 'src/app/servicios/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listado-turnos',
  templateUrl: './listado-turnos.component.html',
  styleUrls: ['./listado-turnos.component.css']
})
export class ListadoTurnosComponent implements OnInit {

  @Output() public turnoSeleccionado: EventEmitter<any> = new EventEmitter<Turnos>();
  @Input() public listadoTurnos?: Turnos[];
  public listadoFiltrado : Turnos[] = [];
  public usuarioLog:any;
  public usuario:any;


  constructor(public serv: TurnosService,public servUser:UserService,private router:Router) {
  }

  async ngOnInit(){
    const auth = getAuth();
    if (auth.currentUser != null) {
      this.usuarioLog = auth.currentUser;
      this.usuario = this.servUser.traerUsuario(this.usuarioLog);
    }
  
    if(this.usuario.admin){
      this.serv.getTurnos().subscribe(turno => {
        this.listadoTurnos = turno;
      });
    }
    if(this.usuario.paciente){
      this.listadoTurnos = await this.serv.getTurnosPaciente(this.usuario.id);
    }
    if(this.usuario.especialista){
      this.listadoTurnos = await this.serv.getTurnosEspecialista(this.usuario.id);
    }

  }
  VerComentario(turno:any)
  {
    Swal.fire(
      'Reseña:',
      `${turno.comentarioPaciente}`
    )
  }
  Encuesta()
  {
    Swal.fire({
      title: `NO TERMINE ESTO`,
      icon: 'error',
      timer: 4000,
      toast: true,
      backdrop: false,
      position: 'bottom',
      grow: 'row',
      timerProgressBar: true,
      showConfirmButton: false
    });
  }
  CambiarEstado(turno:any, estado:string)
  {
    if(estado != 'Aceptado')
    {
      this.Calificar(turno).then((res)=>{
        
        if(estado != '')
        {
          res.estado = estado;
        }
        
        this.servUser.EditarColeccion(turno.id, res, 'turnos').then(()=>{
          if(estado == 'Finalizado')
          {
            this.router.navigateByUrl('historiaClinica');
          }
        });
      });

    }
    else
    {
      Swal.fire({
        title: `¿Quiere aceptar este turno?`,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if(result.isConfirmed) 
        {
          this.servUser.EditarColeccion(turno.id, {estado: estado}, 'turnos');

          Swal.fire({
            title: `Se aceptó el turno.`,
            icon: 'success',
            timer: 4000,
            toast: true,
            backdrop: false,
            position: 'bottom',
            grow: 'row',
            timerProgressBar: true,
            showConfirmButton: false
          });
        }
      })
    }
  }
  async Calificar(turno:any)
  {
    let datos:any;

    const { value: text } = await Swal.fire({
      title: 'Deja un comentario:',
      input: 'textarea',
      icon: 'warning',
      confirmButtonText: 'Continuar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar'
    })

    if(text != '')
    {
      if(!this.usuario.paciente)
      {
        datos = {comentario: text};
      }
      else
      {
        datos = {comentarioPaciente: text};
      }

      return datos;
    }
    else
    {
      Swal.fire(
        'Error',
        'Tiene que escribir un comentario.',
        'error'
      )

      return false;
    }
  }

 


  eligeTurno(turno: Turnos) {
    this.turnoSeleccionado.emit(turno);
  }

}
