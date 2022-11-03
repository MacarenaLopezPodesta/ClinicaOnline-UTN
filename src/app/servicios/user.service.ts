import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Paciente } from '../clases/paciente';
import { Especialista } from '../clases/especialista';
import { Administrador } from '../clases/administrador';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  logueado:any = false;
  userLogueado:any = '';
  especialistas:Array<any> = [];
  administradores:Array<any> = [];
  pacientes:Array<any> = [];

  constructor(private auth:AngularFireAuth, private firestore:AngularFirestore, private storage:AngularFireStorage) 
  { 
    this.GetColeccion('especialistas').subscribe((lista)=>{
      this.especialistas = lista;
    });

    this.GetColeccion('pacientes').subscribe((lista)=>{
      this.pacientes = lista;
    });

    this.GetColeccion('administradores').subscribe((lista)=>{
      this.administradores = lista;
    });
  }
  actualizarEspecialista(res: Especialista) {
    return this.firestore.collection('especialistas').doc(res.id).update({ ...res });
  }
  async Login(user:any)
  { 
    this.userLogueado = user;

    return this.auth.signInWithEmailAndPassword(user.email, user.clave);
  }
  
  LogOut()
  {
    this.logueado = false;
    return this.auth.signOut();
  }

  Registro(user:any)
  {
    let retorno = this.auth.createUserWithEmailAndPassword(user.email , user.clave)
    .then(()=>{
      this.auth.authState.subscribe((data)=>{data?.sendEmailVerification();});
    });
    
    return retorno;
  }

  async savePaciente(res: Paciente) {
    let entidad = { 'id': res.id, 'nombre': res.nombre, 'apellido': res.apellido, 'edad': res.edad, 'dni': res.dni, 'obraSocial': res.obraSocial, 'mail': res.mail, 'foto1': res.foto1, 'foto2': res.foto2, 'paciente': res.paciente }
    return await this.firestore.collection('pacientes').doc(res.id).set(entidad);
  }

  async saveEspecialista(res: Especialista) {
    let entidad = { 'id': res.id, 'nombre': res.nombre, 'apellido': res.apellido, 'edad': res.edad, 'dni': res.dni, 'especialidad': res.especialidad, 'mail': res.mail, 'foto1': res.foto1, 'especialista': res.especialista, 'estado': false, 'horario': res.horario }
    return await this.firestore.collection('especialistas').doc(res.id).set(entidad);
  }
  async saveAdmin(res: Administrador) {
    let entidad = { 'id': res.id, 'nombre': res.nombre, 'apellido': res.apellido, 'edad': res.edad, 'dni': res.dni, 'mail': res.mail, 'foto1': res.foto1, 'admin': res.admin }
    return await this.firestore.collection('administradores').doc(res.id).set(entidad);
  }
 
  GetColeccion(coleccion:string)
  {
    return this.firestore.collection<any>(coleccion).valueChanges({idField: "id"});
  }

  SubirColeccion(datos:any, coleccion:string)
  {
    return this.firestore.collection(coleccion).add(datos);
  }

  EditarColeccion(id:string, datos:any, tipo:string)
  {
    return this.firestore.collection(tipo).doc(id).update(datos);
  }
  traerUsuario(res: any) {
    for (let i = 0; i < this.administradores.length; i++) {
      if (this.administradores[i].id == res.uid) {
        return this.administradores[i];
      }
    }

    for (let i = 0; i < this.pacientes.length; i++) {
      if (this.pacientes[i].id == res.uid) {
        return this.pacientes[i];
      }
    }

    for (let i = 0; i < this.especialistas.length; i++) {
      if (this.especialistas[i].id == res.uid) {
        return this.especialistas[i];
      }
    }
  }

  GetUsuarioActual()
  {
    let todos:any = [this.EsAdmin(), this.EsEspecialista(), this.EsPaciente()];

    if(todos[0])
    {
      this.userLogueado = todos[0]; 
    }
    else
    {
      if(todos[1])
      {
        this.userLogueado = todos[1]; 
      }
      else
      {
        this.userLogueado = todos[2]; 
      }
    }
  }

  EsAdmin()
  {

    for(let user of this.administradores)
    {
     
      if(user.mail == this.userLogueado.email)
      {
        
   
        return true;
        
      
      }
    }

    return false;
  }

  EsPaciente()
  {
    let encontro = false;

    for(let user of this.pacientes)
    {
    
      if(user.mail == this.userLogueado.email)
      {
        return true;
     
      }
    }

    return encontro;
  }

  EsEspecialista()
  {
    let encontro = false;

    for(let user of this.especialistas)
    {
      if(user.mail == this.userLogueado.email)
      {
        encontro = user;
        break;
      }
    }

    return encontro;
  }
}
