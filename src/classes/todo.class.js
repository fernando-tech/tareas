export class Todo {

    static fromJson( {id, tarea, creado, completado} ) {

        const tmpTodo      = new Todo( tarea );
        tmpTodo.id         = id;
        tmpTodo.creado     =  creado;
        tmpTodo.completado =  completado;

        return tmpTodo;
    }

    constructor( tarea ) {

        this.tarea      = tarea;
        this.id         = new Date().getTime();
        this.creado     = new Date();
        this.completado = false;
    }

    infoTodo() {
        
        console.log(`${this.id} - ${this.tarea}`);
    }

}