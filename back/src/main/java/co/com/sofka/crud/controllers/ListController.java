package co.com.sofka.crud.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import co.com.sofka.crud.models.ListModel;
import co.com.sofka.crud.services.ListService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/lists")
public class ListController {
  
  @Autowired
  private ListService listService;
  
  /*=========== CREATE ===========*/
  /**
  * Metodo para crear un nuevo objeto List, utilizando el modelo del body del request.
  * @param list
  * @return Un response exitoroso con el nuevo objeto creado, o un response fallido.
  */
  @PostMapping()
  public ResponseEntity<?> createList(@RequestBody ListModel list){
    try {
      if(list.getName().isBlank()) return new ResponseEntity<>("EXPECTATION FAILED. Field 'name' must not be blank.\n", HttpStatus.EXPECTATION_FAILED);

      return new ResponseEntity<>(listService.saveNewList(list), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>("EXPECTATION FAILED.\n" + e.getMessage(), HttpStatus.EXPECTATION_FAILED);
    }
  }
  
  /*=========== READ ===========*/
  /**
  * Metodo para obtener todos los objetos List de una Lista
  * @return Un response exitoroso con todas las Listas, o un response vacio. 
  */
  @GetMapping()
  public ResponseEntity<?> readLists(){
    try {
      List<ListModel> lists = listService.findLists();
      
      if(lists.isEmpty())
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      
      
      return new ResponseEntity<>(lists, HttpStatus.OK);
    }catch (Exception e){
      return new ResponseEntity<>("INTERNAL SERVER ERROR. \n" + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  /**
  * Metodo para obtener un objeto List mediante su id
  * @param id
  * @return Un response exitoroso con el List, o un response vacio.
  *
  * @GetMapping("/{id}")
  * public ResponseEntity<ListModel> readList(@PathVariable(value = "id") Long id) {
  *   Optional<ListModel> list = listService.getList(id);
    
  *   if (list.isPresent()) {
  *     return new ResponseEntity<>(list.get(), HttpStatus.OK);
  *   } else {
  *     return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  *   }
  * }
  */
  
  /*=========== UPDATE ===========*/
  
  /**
  * Metodo para modificar un objeto List mediante su id
  * @param id
  * @param list
  * @return Un response exitoso con el List modificado, o un response vacio
  */
  @PutMapping("/{id}")
  public ResponseEntity<?> updateList(@PathVariable(value = "id") Long id, @RequestBody ListModel list){
    try {
      if(list.getName().isBlank()) return new ResponseEntity<>("EXPECTATION FAILED. Field 'name' must not be blank.\n", HttpStatus.EXPECTATION_FAILED);

      ListModel todoData = listService.editList(id, list);
      
      return new ResponseEntity<>(todoData, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>("NOT FOUND. \n", HttpStatus.NOT_FOUND);
    }
  } 
  
  /*=========== DELETE ===========*/
  
  /**
  * Metodo para eliminar un objeto List mediante su id
  * @param id
  * @return Un response exitoso con un mensaje si se ha eliminado correctamente, o un response fallido.
  */
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteList(@PathVariable(value = "id") long id) {
    try {
      listService.deleteList(id);
      return new ResponseEntity<>("List has been deleted sucessfully",HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>("EXPECTATION FAILED. \n" + e.getMessage(), HttpStatus.EXPECTATION_FAILED);
    }
  }
  
  /**
  * Metodo para eliminar todas las Listas
  * @return Un response exitoso con un mensaje si se han eliminado correctamente, o un response fallido.
  *
  * @DeleteMapping()
  * public ResponseEntity<String> deleteLists() {
  *   try {
  *     listService.deleteLists();
  *     return new ResponseEntity<>("Listas deleted sucessfully",HttpStatus.NO_CONTENT);
  *   } catch (Exception e) {
  *     return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
  *   }
  * }
  */
}