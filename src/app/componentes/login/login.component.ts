import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/servicios/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  form !: FormGroup;
  spinner:boolean = false;

  constructor(private userService: UserService, private router: Router, private fb:FormBuilder) {
    this.userService.logueado = false;

    this.form = this.fb.group({
      'email':['', [Validators.required, Validators.email]],
      'clave':['', Validators.required]
    });
  }

  ngOnInit(): void {}

  async Login()
  {
    this.userService.Login({email: this.form.value.email, clave: this.form.value.clave})
    .then((res:any)=>{
      if(!res.user.emailVerified)
      {
        if(this.userService.EsPaciente())
        {
           this.router.navigate(['home']);
          this.spinner = true;
         
          setTimeout(() => {
            this.spinner = false;  
            this.userService.logueado = true;
          }, 2000);
          
        }
          if(this.userService.EsAdmin())
        {
           this.router.navigate(['home']);
          this.spinner = true;
          
          setTimeout(() => {
            this.spinner = false;  
            this.userService.logueado = true;
          }, 2000);
          
        }
         
        let user:any = this.userService.EsEspecialista();
        if(user.habilitado || !user)
        {
          this.spinner = true;
          this.router.navigate(['home']);
          setTimeout(() => {
            this.spinner = false;  
            this.userService.logueado = true;
          }, 2000);

        }
        
      }
      

      setTimeout(() => {
        if(this.userService.logueado)
        {
          let date = new Date();

          let userLog = { 
            email: this.form.value.email,
            fecha: date.toLocaleString('es-ES',{dateStyle:'full'}) + ', ' + date.getHours() + ':' + date.getMinutes(),
            sort: Date.now()
          }

          this.userService.SubirColeccion(userLog, 'logs');
          this.userService.GetUsuarioActual();
          this.router.navigateByUrl('home');
        }
      }, 2000);
    }).catch((error)=>{
      if(error.code == 'auth/wrong-password' || error.code == 'auth/user-not-found')
      {
        Swal.fire({
          title: 'Error',
          text: 'Correo o contraseña son incorrectos.',
          icon: 'error',
          timer: 2000,
          toast: true,
          backdrop: false,
          position: 'bottom',
          grow: 'row',
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
      else if(error.code == 'auth/missing-email' || error.code == 'auth/internal-error' || this.form.value.email == "" || this.form.value.clave == "")
      {
        Swal.fire({
          title: 'Error',
          text: 'No pueden quedar campos vacíos.',
          icon: 'error',
          timer: 2000,
          toast: true,
          backdrop: false,
          position: 'bottom',
          grow: 'row',
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
      else if(error.code == 'auth/invalid-email')
      {
        Swal.fire({
          title: 'Error',
          text: 'Correo no válido.',
          icon: 'error',
          timer: 2000,
          toast: true,
          backdrop: false,
          position: 'bottom',
          grow: 'row',
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
      else if(error.code == 'auth/too-many-requests')
      {
        Swal.fire({
          title: 'Error',
          text: 'Demasiados intentos fallidos. Reintente más tarde.',
          icon: 'warning',
          timer: 2000,
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
        Swal.fire({
          title: 'Error',
          text: 'Credenciales incorrectas.',
          icon: 'error',
          timer: 2000,
          toast: true,
          backdrop: false,
          position: 'bottom',
          grow: 'row',
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
      console.log(error);
    });
  }

  InicioAutomatico(email:any, clave:any)
  {
    this.form.value.email = email;
    this.form.value.clave = clave;
    
    this.Login();
  } 

}
