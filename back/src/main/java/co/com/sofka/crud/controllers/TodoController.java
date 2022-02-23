package co.com.sofka.crud.controllers;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.concurrent.atomic.LongAccumulator;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import co.com.sofka.crud.models.TodoModel;
import co.com.sofka.crud.models.TodoRequestModel;
import co.com.sofka.crud.services.TodoService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/todos")
public class TodoController {
  
  @Autowired
  private TodoService todoService;
  
  /*=========== CREATE ===========*/
  /**
  * Metodo para crear un nuevo objeto Todo, utilizando el modelo del body del request.
  * @param todo
  * @return Un response exitoroso con el nuevo objeto creado, o un response fallido.
  */
  @PostMapping(params = "listId")
  public ResponseEntity<?> createTodo(@RequestParam(value = "listId") Long listId, @RequestBody TodoRequestModel todo){
    try {
      return new ResponseEntity<>(todoService.saveNewTodo(listId, todo), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(e.getMessage(), HttpStatus.EXPECTATION_FAILED);
    }
  }
  
  /*=========== READ ===========*/
  /**
  * Metodo para obtener todos los objetos TODO de una Lista utilizando el parametro listId
  * @param listId
  * @return Un response exitoroso con la lista de los TODOs o aquellos filtrados por nombre o estado, o un response vacio. 
  */
  @GetMapping(params = "listId")
  public ResponseEntity<?> readTodos(@RequestParam(value = "listId") Long listId){
    try {
      Set<TodoRequestModel> todos = todoService.findTodos(listId);
      
      // if(todos.isEmpty())
      // return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      
      // return new ResponseEntity<>(listId,HttpStatus.OK);
      return new ResponseEntity<>(todos, HttpStatus.OK);
    }catch (Exception e){
      return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**TODO: 23/02/2022: getTodosByListIds; params: [IDs]; returns [set<TodoReturnModel>] */
  
  /**
  * Metodo para obtener un objeto TODO mediante su id
  * @param id
  * @return Un response exitoroso con el TODO, o un response vacio.
  *
  * @GetMapping("{id}")
  * public ResponseEntity<TodoModel> readTodo(@PathVariable(value = "id") Long id) {
  *   Optional<TodoModel> todo = todoService.getTodo(id);
    
  *   if (todo.isPresent()) {
  *     return new ResponseEntity<>(todo.get(), HttpStatus.OK);
  *   } else {
  *     return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  *   }
  * }
  */
  
  /*=========== UPDATE ===========*/
  
  /**
  * Metodo para modificar un objeto TODO mediante su id
  * @param id
  * @param todo
  * @return Un response exitoso con el TODO modificado, o un response vacio
  */
  @PutMapping("/{id}")
  public ResponseEntity<?> updateTodo(@PathVariable(value = "id") Long id, @RequestBody TodoModel todo){
    try {
      TodoModel todoData = todoService.editTodo(id, todo);
      
      return new ResponseEntity<>(todoData, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>("No existe el id para actualziar", HttpStatus.NOT_FOUND);
    }
  } 
  
  /*=========== DELETE ===========*/
  
  /**
  * Metodo para eliminar un TODO mediante su id
  * @param id
  * @return Un response exitoso con un mensaje si se ha eliminado correctamente, o un response fallido.
  */
  @DeleteMapping("/{id}")
  public ResponseEntity<String> deleteTodo(@PathVariable(value = "id") long id) {
    try {
      todoService.deleteTodo(id);
      return new ResponseEntity<>("TODO has been deleted sucessfully",HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
    }
  }
  
  /**
  * Metodo para eliminar todos los TODOs o filtrar por el parametro completed
  * @param completed
  * @return Un response exitoso con un mensaje si se han eliminado correctamente, o un response fallido.
  *
  * @DeleteMapping()
  * public ResponseEntity<String> deleteTodos(@RequestParam(value = "completed", required = false) Boolean completed) {
  *   try {
  *     todoService.deleteTodos(completed);
  *     return new ResponseEntity<>("TODOs deleted sucessfully",HttpStatus.NO_CONTENT);
  *   } catch (Exception e) {
  *     return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
  *   }
  * }
  */
}
