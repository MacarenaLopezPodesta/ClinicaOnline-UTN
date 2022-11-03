export class Turnos {
    id:string = '';
    fecha:string = '';
    hora:string = '';
    paciente:any;
    pacienteNombre:any;
    especialista:any;
    especialistaNombre:any;
    especialidad:string = '';
    estado: string = '';
    encuesta:string = '';
    resenia:string = '';
    comentarioPaciente:string = '';
    diagnosticoPaciente:string = '';
    claves:string[] = [];



    iniciarTurnos(fecha:string,hora:string,paciente:any,pacienteNombre:any,especialista:any,especialistaNombre:any,especialidad:string){
        this.fecha = fecha;
        this.hora = hora;
        this.paciente = paciente;
        this.pacienteNombre = pacienteNombre;
        this.especialista = especialista;
        this.especialistaNombre = especialistaNombre;
        this.especialidad = especialidad;
        this.estado = 'PENDIENTE';
    }
}
