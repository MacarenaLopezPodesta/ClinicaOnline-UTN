export class Horarios {
    especialidad:string = '';
    especialista:string = '';
    dia: string = '';
    horaDesde: string = '';
    horaHasta: string = '';

    iniciarHorario(especialidad:string,especialista:string,dia:string,horaDesde:string,horaHasta:string){
        this.especialidad = especialidad;
        this.especialista = especialista;
        this.dia = dia;
        this.horaDesde = horaDesde;
        this.horaHasta = horaHasta;
    }
}
