package co.com.sofka.crud.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import co.com.sofka.crud.models.TodoModel;

public interface ITodoRepository extends CrudRepository<TodoModel, Long> {
  /**
     * Metodo para eliminar todos los tutoriales completados.
     * @param completed
     */
  void deleteByCompleted(Boolean completed);

  /**
     * Metodo para buscar todos los TODOs por su groupListID
     * @param groupList
     * @return Una lista de todos los objetos TODO por su groupListID
     */
  List<TodoModel> findByGroupListId(String groupList);
  
}
