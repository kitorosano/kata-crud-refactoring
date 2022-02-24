package co.com.sofka.crud.repositories;


import org.springframework.data.repository.CrudRepository;

import co.com.sofka.crud.models.TodoModel;

public interface ITodoRepository extends CrudRepository<TodoModel, Long> {
  /**
   * Metodo para eliminar todos los tutoriales completados.
   * @param completed
   */
  void deleteByCompleted(Boolean completed);  
}
