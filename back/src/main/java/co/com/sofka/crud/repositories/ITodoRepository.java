package co.com.sofka.crud.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import co.com.sofka.crud.models.TodoModel;

public interface ITodoRepository extends CrudRepository<TodoModel, Long> {

  /**
     * Metodo para buscar todos los tutoriales por su nombre
     * @param name
     * @return Una lista de todos los objetos tutoriales por su nombre
     */
	List<TodoModel> findByNameContaining(String name);

  /**
     * Metodo para buscar todos los tutoriales por su estado completado.
     * @param completed
     * @return Una lista de todos los objetos tutoriales cuyo estado compltado coincida
     */
  List<TodoModel> findByCompleted(Boolean completed);

  /**
     * Metodo para buscar todos los tutoriales por su nombre y estado completado.
     * @param name
     * @param completed
     * @return Una lista de todos los objetos tutoriales cuyo nombre estado published sea verdadero
     */
  List<TodoModel> findByNameContainingAndCompleted(String name, Boolean completed);

  /**
     * Metodo para eliminar todos los tutoriales completados.
     * @param completed
     */
  void deleteByCompleted(Boolean completed);
  
}
