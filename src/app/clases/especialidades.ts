export class Especialidades {
    nombre: string = '';;
    img: string = '';
    id: string = '';

    iniciarEspecialidad(id:string,nombre:string){
        this.id = id;
        this.nombre = nombre;
    }
}
