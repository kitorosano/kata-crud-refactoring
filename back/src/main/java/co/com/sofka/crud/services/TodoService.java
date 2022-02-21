package co.com.sofka.crud.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.com.sofka.crud.models.TodoModel;
import co.com.sofka.crud.repositories.ITodoRepository;

@Service
public class TodoService {

  @Autowired
  private ITodoRepository todoRepository;

  /*=========== SAVE ===========*/
  /** Saves a new register of TODO */
  public TodoModel saveTodo(TodoModel todo){
    // return todoRepository.save(new TodoModel(todo.getName(), false, todo.getGroupListId()));
    return todoRepository.save(new TodoModel(todo.getName(), false));
  }


  /*=========== FIND ===========*/
  /** Finds all TODOs or finds all TODOs by name or completed */
  public List<TodoModel> findTodos(String name, Boolean completed){

    // Find without filters, both null
    if(name == null && completed == null)
      return (List<TodoModel>) todoRepository.findAll();
    
    // Find if only name is not null
    if(name != null && completed == null)
      return todoRepository.findByNameContaining(name);

    // Find if only completed is not null
    if(name == null && completed != null)
      return todoRepository.findByCompleted(completed);

    // Find using both filters
    return todoRepository.findByNameContainingAndCompleted(name, completed);
  }

  /** Get TODO by id */
  public Optional<TodoModel> getTodo(Long id){
    return todoRepository.findById(id);
  }


  /*=========== FIND & EDIT ===========*/
  /** Edit TODO by id, using new Model */
  public TodoModel editTodo(Long id, TodoModel todo){
    TodoModel _todo = this.getTodo(id).orElseThrow();
      
    _todo.setName(todo.getName());
    _todo.setCompleted(todo.isCompleted());

    return todoRepository.save(_todo);
  }


  /*=========== DELETE ===========*/
  /** Deletes TODO by id */
  public void deleteTodo(Long id){
    todoRepository.delete(this.getTodo(id).get());
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
