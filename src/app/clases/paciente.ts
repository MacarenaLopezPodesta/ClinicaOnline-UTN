export class Paciente {
    nombre: string = '';
    apellido: string = '';
    edad: number = 0;
    dni: number = 0;
    obraSocial: string = '';
    mail: string = '';
    password: string = '';
    foto1: string = '';
    foto2: string = '';
    paciente: boolean = true;
    id: string = '';


    iniciarPaciente(id:string,nombre:string,apellido:string,edad:number,dni:number,obra:string,mail:string,foto1:string,foto2:string){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.obraSocial = obra;
        this.mail = mail;
        this.foto1 = foto1;
        this.foto2 = foto2;
    }
}
