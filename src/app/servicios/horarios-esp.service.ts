import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Horarios } from '../clases/horarios';

@Injectable({
  providedIn: 'root'
})
export class HorariosEspService {
  listado: any[] = [];

  constructor(private firestore: AngularFirestore) {
    this.getHorarios().subscribe(horarios => {
      this.listado = horarios;
    })
  }

  getHorarios = (): Observable<any[]> => {
    return this.firestore.collection('horariosEspecialistas').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => d.payload.doc.data()) as Horarios[];
      })
    );
  }

  async saveHorario(res: Horarios) {
    let entidad = {'especialidad': res.especialidad, 'especialista': res.especialista, 'dia': res.dia, 'horaDesde': res.horaDesde, 'horaHasta': res.horaHasta }
    return await this.firestore.collection('horariosEspecialistas').doc().set(entidad);
  }
}
