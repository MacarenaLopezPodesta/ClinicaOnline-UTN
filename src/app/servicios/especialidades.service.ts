import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Especialidades } from '../clases/especialidades';
@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  listadoEspecialidades: Especialidades[] = [];

  constructor(private firestore: AngularFirestore) {
    this.getEspecialidades().subscribe(esp => {
      this.listadoEspecialidades = esp;
    })
   }

   getEspecialidades = (): Observable<any[]> => {
    return this.firestore.collection('especialidades').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => d.payload.doc.data()) as Especialidades[];
      })
    );
    
  }
  encontrarEspecialidad(res: any)
  {

    for(let user of this.listadoEspecialidades)
    {
      if(user.nombre == res.nombre)
      {
        this.saveEspecialidades(res);
        return true;
      }
    }

    return false;
  }
  async saveEspecialidades(res: Especialidades) {
    let entidad = {'id':res.id, 'nombre': res.nombre}
    return await this.firestore.collection('especialidades').doc(res.id).set(entidad);
  }
}