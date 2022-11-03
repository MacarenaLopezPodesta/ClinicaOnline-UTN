import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Especialista } from '../clases/especialista';
import { Historia } from '../clases/historia';
import { Turnos } from '../clases/turnos';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  listado: any[] = [];
  constructor(private firestore: AngularFirestore) {
    this.getTurnos().subscribe(turno => {
      this.listado = turno;
    })
   }

   getTurnos = (): Observable<any[]> => {
    return this.firestore.collection('turnos').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => d.payload.doc.data()) as Turnos[];
      })
    );
  }

  getHistoria = (): Observable<any[]> => {
    return this.firestore.collection('historia').snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => d.payload.doc.data()) as Historia[];
      })
    );
  }

  async saveTurno(res: Turnos) {
    let entidad = { 'id':res.id, 'fecha': res.fecha, 'hora': res.hora, 'paciente': res.paciente, 'pacienteNombre': res.pacienteNombre, 'especialista': res.especialista, 'especialistaNombre': res.especialistaNombre, 'especialidad': res.especialidad, 'estado': res.estado, 'encuesta': res.encuesta, 'resenia': res.resenia, 'comentarioPaciente': res.comentarioPaciente,'diagnosticoPaciente': res.diagnosticoPaciente,'claves': res.claves}
    return await this.firestore.collection('turnos').add(entidad);
  }

  async saveHistoria(res: Historia) {
    let entidad = { 'id':res.id, 'altura': res.altura, 'peso': res.peso, 'presion': res.presion, 'temperatura': res.temperatura,'fecha':res.fecha, 'clave':res.clave,'valor':res.valor, 'clave1':res.clave1,'valor1':res.valor1, 'clave2':res.clave2,'valor2':res.valor2, 'especialista':res.especialista }
    return await this.firestore.collection('historia').add(entidad);
  }

  actualizarEstado ( res: Turnos ) {
    return this.firestore.collection('turnos').doc(res.id).update ( {...res} );
  }

  getTurnosPaciente ( paciente? : any ) {
    return this.firestore.collection('turnos').ref.where( "paciente", "==", paciente ).get().then( snapshots => snapshots.docs.map( doc => {
              const ret : any = doc.data();
              ret.id = doc.id;
              return ret;
            } ) ); 
  }

  getTurnosEspecialista ( especialista? : any ) {
    return  this.firestore.collection('turnos').ref.where( "especialista", "==", especialista ).get().then( snapshots => snapshots.docs.map( doc => {
              const ret : any = doc.data();
              ret.id = doc.id;
              return ret;
            } ) );
  }

  getHistoriaPaciente ( paciente? : any ) {
    return  this.firestore.collection('historia').ref.where( "id", "==", paciente ).get().then( snapshots => snapshots.docs.map( doc => {
              const ret : any = doc.data();
              ret.id = doc.id;
              return ret;
            } ) );
  }


  
  getTurnosEspecialistaPac ( especialista? : any ) {
    return  this.firestore.collection('turnos').ref.where( "especialista", "==", especialista )
    .get().then( snapshots => snapshots.docs.map( doc => {
              const ret : any = doc.data();
              ret.id = doc.id;
              return ret;
            } ) );
  }
}
