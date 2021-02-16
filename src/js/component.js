import { Todo } from "../classes";
import { todoList } from '../index';

// Referencias en HTML
const divTodoList            = document.querySelector('.todo-list');
const txtInputNewTodo        = document.querySelector('.new-todo');
const btnEliminarCompletados = document.querySelector('.clear-completed');
const ulFiltro               = document.querySelector('.filters');
const liFiltro               = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`;

    const div     = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );
}

// Eventos
txtInputNewTodo.addEventListener( 'keyup', ( event ) => {

    if( event.keyCode === 13 && txtInputNewTodo.value.length > 0 ) {

        const nuevoTodo = new Todo( txtInputNewTodo.value );
        todoList.nuevoTodo( nuevoTodo );
        crearTodoHtml( nuevoTodo );
        txtInputNewTodo.value = '';
    }

});

divTodoList.addEventListener( 'click', ( event ) => {

    const nombreElemento = event.target.localName; // input, button, label
    const todoElemento   = event.target.parentElement.parentElement;
    const idTodoElement  = todoElemento.getAttribute('data-id');

    if( nombreElemento.includes('input') ) {
        todoList.marcarCompletado( idTodoElement );
        todoElemento.classList.toggle('completed' );
    }

    if( nombreElemento.includes('button') ) {
        todoList.eliminarTodo( idTodoElement );
        divTodoList.removeChild( todoElemento );
    }
});

btnEliminarCompletados.addEventListener( 'click', ( ) => {
    
    todoList.eliminarCompletados(); // Elimina todos completados en el array

    // Eliminar todos completados en HTML
    for ( let i = divTodoList.children.length-1; i >= 0; i-- ) {
        
        const elemento = divTodoList.children[i];

        if( elemento.classList.contains('completed') ) {
            divTodoList.removeChild( elemento );
        }
    }
});

ulFiltro.addEventListener( 'click', ( event ) => {

    const filtro = event.target.text; // Pendientes, Completados, undefined 

    if( !filtro ) {
        return;
    }

    liFiltro.forEach( element => element.classList.remove('selected') );
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch ( filtro ) {
            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add('hidden');
                }
                break;

            case 'Completados':
                if( !completado ) {
                    elemento.classList.add('hidden');
                }
                break;

            default:
                break;
        }
    }
});
