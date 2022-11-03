import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signOut } from "firebase/auth";
import { UserService } from 'src/app/servicios/user.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

 
  accion: any;
  public auth: boolean = false;
  public authAdmin: boolean = false;
  paciente=false;
  especialista=false;
  public usuarioLog:any;
  public usuario:any;
  public usuarioNav:any;
  constructor(public router: Router, public afAuth: AngularFireAuth, public userS:UserService) { }

  ngOnInit(): void {
   
    this.usuario = this.afAuth.onAuthStateChanged(user => {
      if (!user) {
        this.auth = false;
        this.accion = 'Ingresar'
      } else {
        this.auth = true;
        if(this.userS.EsAdmin()){
           this.authAdmin=true;
        }
        if(this.userS.EsPaciente()){
          this.paciente=true;
       }
       if(this.userS.EsEspecialista()){
        this.especialista=true;
     }
        this.accion = 'Cerrar sesión'
      }
    }
    )
  }

  async sesion() {
    this.router.navigate(['']);
  }

  async cerrarSesion() {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem('perfilAdmin')
      this.auth = false;
      this.authAdmin=false;
      this.limpiar();
      this.router.navigate(['']);
    }).catch((error) => {

    });
  }

  limpiar(){
    /*this.servSesion.sesionAdmin = false;
    this.servSesion.sesionEspecialista = false;
    this.servSesion.sesionPaciente = false;*/
  }

}
