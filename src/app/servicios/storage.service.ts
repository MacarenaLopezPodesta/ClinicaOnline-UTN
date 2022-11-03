import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  storareRef = firebase.app().storage().ref();

  constructor(private storage: AngularFireStorage) { }

   subirImagen(nombre: string, datos: any) {
    return this.storage.upload(nombre, datos);
  }

  public referenciaCloudStorage(nombreArchivo: string) {
    return this.storage.ref(nombreArchivo);
  }
}
