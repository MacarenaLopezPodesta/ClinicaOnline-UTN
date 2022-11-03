import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { Administrador } from 'src/app/clases/administrador';
import { Especialidades } from 'src/app/clases/especialidades';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { StorageService } from 'src/app/servicios/storage.service';
import { UserService } from 'src/app/servicios/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-registro-administrador',
  templateUrl: './registro-administrador.component.html',
  styleUrls: ['./registro-administrador.component.css']
})
export class RegistroAdministradorComponent implements OnInit {


  administrador: Administrador
  formulario: FormGroup;
  formularioAux: FormGroup;
  formularioAdmin: FormGroup;
  imagenes: any[] = [];
  pac?: boolean;
  esp?: boolean;
  adm?: boolean;
  imagenDosUrl: any;
  imagenUnoUrl: any;
  captcha: string | undefined;
  validado: boolean = false;
  especialidades?: Especialidades[];
  listadoEspecialidades?: string[] = [];


  constructor(public storage: StorageService, public fb: FormBuilder, public router: Router, public afAuth: AngularFireAuth, public servUser: UserService) {
    this.formulario = this.fb.group({
      'nombre': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      'apellido': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(120)]],
      'dni': ['', [Validators.required, Validators.min(1000000), Validators.max(99999999)]],
      'obraSocial': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'mail': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      'foto1': new FormControl("", Validators.required),
      'foto2': new FormControl("", Validators.required),
      'especialidad': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
    })
    this.formularioAux = this.formulario;
    this.formularioAdmin = this.formulario;
    this.administrador = new Administrador();
  }

  ngOnInit(): void {
  
    this.adm = true;
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    this.validado = true;
  }


  async subirArchivo1(event: any) {
    const email = this.formulario.value.mail;
    const file = event.target.files[0];
    const imagenUnoNombre = email + "_1";
    if (file) {
      const tareaImagenUno = this.storage.subirImagen(imagenUnoNombre, file);
      tareaImagenUno.then((termino) => termino.ref.getDownloadURL().then((URL) => {
        this.imagenUnoUrl = URL;
      }))
    }
  }




  guardarAdmin() {
    try {
      const foto1 = this.imagenUnoUrl;
      const dni = this.formularioAdmin.value.dni;
      const nombre = this.formularioAdmin.value.nombre;
      const apellido = this.formularioAdmin.value.apellido;
      const mail = this.formularioAdmin.value.mail;
      const edad = this.formularioAdmin.value.edad;
      const password = this.formularioAdmin.value.password;

      if (
        !nombre ||
        !apellido ||
        (!(edad < 120 && edad >= 18)) ||
        (!(dni < 99999999 && dni >= 1000000)) ||
        !mail ||
        !password ||
        !foto1
      ) {
        Swal.fire({
          icon: 'warning',
          title: 'Debe ingresar todos los datos',
          showConfirmButton: false,
          timer: 1500,
        });

      } else {

        if (this.validado == false) {
          Swal.fire({
            icon: 'warning',
            title: 'Debe validar el captcha',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {

          if (this.validarEmail(mail) && this.validarContraseña(password)) {

            this.afAuth.createUserWithEmailAndPassword(mail, password).then(res => {
              const uid = res.user?.uid;
              this.administrador.iniciarAdmin(uid!, nombre, apellido, edad, dni, mail, foto1);
              this.servUser.saveAdmin(this.administrador);
              this.reiniciarValores();
              Swal.fire({
                icon: 'success',
                title: 'La cuenta fue creada con exito',
                showConfirmButton: false,
                timer: 1500,
              });

              setTimeout(() => {
                this.router.navigate(['/home']);
              }, 3000)

            }, err => {
              Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'El usuario o la contraseña son incorrectos!'
              })
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error...',
              text: 'El usuario o la contraseña son incorrectos!'
            })
          }
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'El usuario o la contraseña son incorrectos!'
      })
    }
  }


  reiniciarValores() {
    this.validado = false;
  }


  setAdmin() {
    this.adm = false;
    this.esp = true;
    this.pac = true;
    this.reiniciarValores();
  }


  validarEmail(email: string) {
    let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(email)) {
      return false;
    } else {
      return true;
    }
  }

  validarContraseña(contraseña: string) {
    if (contraseña.length >= 6) {
      return true;
    } else {
      return false;
    }
  }
}
