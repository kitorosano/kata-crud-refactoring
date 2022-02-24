package co.com.sofka.crud.services;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.com.sofka.crud.models.ListModel;
import co.com.sofka.crud.models.TodoModel;
import co.com.sofka.crud.models.TodoRequestModel;
import co.com.sofka.crud.repositories.IListRepository;
import co.com.sofka.crud.repositories.ITodoRepository;

@Service
public class TodoService {

  @Autowired
  private ITodoRepository todoRepository;
  @Autowired
  private IListRepository listRepository;


  /*=========== SAVE ===========*/
  /** Saves a new register of TODO */
  public TodoRequestModel saveNewTodo(Long listId, TodoRequestModel todo){
    ListModel list = listRepository.findById(listId).orElseThrow();
    TodoModel newTodo = new TodoModel();

    newTodo.setName(todo.getName());
    newTodo.setCompleted(todo.getCompleted());

    todo.setId(todoRepository.save(newTodo).getId());
    todo.setListId(listId);
    
    list.getTodos().add(newTodo);
    listRepository.save(list);
    
    return todo;
  }


  /*=========== FIND ===========*/
  /** Finds all TODOs or finds all TODOs by listId */
  public Set<TodoRequestModel> findTodos(Long listId){

    return listRepository.findById(listId).orElseThrow()
                        .getTodos().stream()
                        .map(todo -> 
                          new TodoRequestModel(todo.getId(), todo.getName(), todo.getCompleted(), listId)
                        )
                        .collect(Collectors.toSet());

  }

  /** Get TODO by id */
  public Optional<TodoModel> getTodo(Long id){
    return todoRepository.findById(id);
  }


  /*=========== FIND & EDIT ===========*/
  /** Edit TODO by id, using new Model */
  public TodoRequestModel editTodo(Long id, TodoRequestModel todo){
    TodoModel toUpdateTodo = this.getTodo(id).orElseThrow();
      
    toUpdateTodo.setName(todo.getName());
    toUpdateTodo.setCompleted(todo.isCompleted());

    todoRepository.save(toUpdateTodo);

    todo.setId(id);
    return todo;
  }


  /*=========== DELETE ===========*/
  /** Deletes TODO by id */
  public void deleteTodo(Long id){
    todoRepository.delete(this.getTodo(id).orElseThrow());
  }

  /** Deletes all TODOs or those that are completed */
  public void deleteTodos(Boolean completed){ 
    // Find without filters, both null
    if(completed == null)
      todoRepository.deleteAll();

    // Find using both filters
    todoRepository.deleteByCompleted(completed);
  }
  
}
