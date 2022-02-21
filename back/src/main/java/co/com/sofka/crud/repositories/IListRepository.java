package co.com.sofka.crud.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import co.com.sofka.crud.models.ListModel;

public interface IListRepository extends CrudRepository<ListModel, Long> {

  List<ListModel> findByNameContaining(String name);
  
}
