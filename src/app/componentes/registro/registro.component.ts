import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';


import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Router } from '@angular/router';
import { Especialidades } from 'src/app/clases/especialidades';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { StorageService } from 'src/app/servicios/storage.service';
import { UserService } from 'src/app/servicios/user.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { EspecialidadesService } from 'src/app/servicios/especialidades.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  especialidadFlag : boolean = false;
  paciente: Paciente
  especialista: Especialista
  formulario: FormGroup;
  formularioAux: FormGroup;
  imagenes: any[] = [];
  inicio?: boolean;
  auth?: boolean;
  validado: boolean = false;
  borrar=-1;
  imagenDosUrl: any;
  imagenUnoUrl: any;
  especialidades?: Especialidades[];
  listadoEspecialidades?: string[] = [];
  captcha: string | undefined;


  constructor(public storage: StorageService, public fb: FormBuilder, public router: Router, public afAuth: AngularFireAuth, public servUser: UserService, public servEsp: EspecialidadesService) {
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
    this.paciente = new Paciente();
    this.especialista = new Especialista();

    this.servEsp.getEspecialidades().subscribe(esp => {
      this.especialidades = esp;
    });

  }

  ngOnInit(): void {
    this.auth = false;
    this.inicio = false;

    this.servEsp.getEspecialidades().subscribe(esp => {
      this.especialidades = esp;
    })

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

  async subirArchivo2(event: any) {
    const email = this.formulario.value.mail;
    const file = event.target.files[0];
    const imagenUnoNombre = email + "_2";
    if (file) {
      const tareaImagenUno = this.storage.subirImagen(imagenUnoNombre, file);
      tareaImagenUno.then((termino) => termino.ref.getDownloadURL().then((URL) => {
        this.imagenDosUrl = URL;
      }))
    }
  }




  guardarPaciente() {
    try {
      const foto1 = this.imagenUnoUrl;
      const foto2 = this.imagenDosUrl;
      const obraSocial = this.formulario.value.obraSocial;
      const dni = this.formulario.value.dni;
      const nombre = this.formulario.value.nombre;
      const apellido = this.formulario.value.apellido;
      const mail = this.formulario.value.mail;
      const edad = this.formulario.value.edad;
      const password = this.formulario.value.password;

      if (
        !nombre ||
        !apellido ||
        (!(edad < 120 && edad >= 18)) ||
        (!(dni < 99999999 && dni >= 1000000)) ||
        !obraSocial ||
        !mail ||
        !password ||
        !foto1 ||
        !foto2
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
              this.paciente.iniciarPaciente(uid!, nombre, apellido, edad, dni, obraSocial, mail, foto1, foto2);
              this.servUser.savePaciente(this.paciente);
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
  borrarSeleccion(esp:string)
  {
     
    this.listadoEspecialidades?.forEach((item, index) => {
      if(item == esp) {
          // Si el elemento coincide, actualizar variable
          this.borrar = index;
          // No hay posibilidad de usar break para cancelar
          // En todo caso, si son muchos elementos, conviene mejor usar un ciclo for
      }
    });
     this.listadoEspecialidades?.splice(this.borrar,1);
  }
  guardarEspecialista() {
    try {
      const foto1 = this.imagenUnoUrl;
      const especialidad = this.formularioAux.value.especialidad;
      const dni = this.formularioAux.value.dni;
      const nombre = this.formularioAux.value.nombre;
      const apellido = this.formularioAux.value.apellido;
      const mail = this.formularioAux.value.mail;
      const edad = this.formularioAux.value.edad;
      const password = this.formularioAux.value.password;
      alert(especialidad);
      if (especialidad.length > 3) this.listadoEspecialidades?.push(especialidad);
   
      if (this.listadoEspecialidades?.length === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Debe ingresar una especialidad'
        })
      } else {
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
                this.especialista.iniciarEspecialista(uid!, nombre, apellido, edad, dni, this.listadoEspecialidades!, mail, foto1);
                this.servUser.saveEspecialista(this.especialista);
                this.servEsp.encontrarEspecialidad(this.especialista.especialidad);
                
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
  }

  setPaciente() {
    this.auth = false;
    this.inicio = true;
    this.validado = false;
    this.reiniciarValores();
  }

  setEspecialista() {
    this.auth = true;
    this.inicio = true;
    this.validado = false;
    this.reiniciarValores();
  }

  setSalir() {
    this.auth = false;
    this.inicio = false;
    this.validado = false;
    this.reiniciarValores();
  }


  elegirEspecialidad(esp: Especialidades) {

    let existe2 = true;
    this.listadoEspecialidades?.forEach(item => {
      if (item == esp.nombre) {
        existe2 = false;
      }
    })
    if (existe2) this.listadoEspecialidades?.push(esp.nombre);
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
