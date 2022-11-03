import { Especialidades } from "./especialidades";
import { Horarios } from "./horarios";
export class Especialista {
    nombre: string = '';
    apellido: string = '';
    edad: number = 0;
    dni: number = 0;
    mail: string = '';
    password: string = '';
    especialidad?: string[];
    foto1: string = '';
    especialista: boolean = true;
    estado:boolean = false;
    id: string = '';
    horario?: Horarios[];


    iniciarEspecialista(id:string,nombre:string,apellido:string,edad:number,dni:number,esp:string[],mail:string,foto1:string){
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.especialidad = esp;
        this.mail = mail;
        this.foto1 = foto1;
        this.estado = false;
        this.horario = [];
    }
}
