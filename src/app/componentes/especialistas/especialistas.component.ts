import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/servicios/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-especialistas',
  templateUrl: './especialistas.component.html',
  styleUrls: ['./especialistas.component.css']
})
export class EspecialistasComponent implements OnInit {

  constructor(public userService:UserService) 
  { }

  ngOnInit(): void {}

  CambiarEstado(user:any)
  {
    if(user.habilitado)
    {
      user.habilitado = false;

      Swal.fire({
        title: 'Cambios guardados',
        text: 'El especialista fué deshabilitado.',
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
    else
    {
      user.habilitado = true;

      Swal.fire({
        title: 'Cambios guardados',
        text: 'El especialista fué habilitado.',
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

    this.userService.EditarColeccion(user.id, user, 'especialistas');
  }

}
