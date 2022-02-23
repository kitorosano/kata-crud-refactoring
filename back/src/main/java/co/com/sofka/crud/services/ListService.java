package co.com.sofka.crud.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.com.sofka.crud.models.ListModel;
import co.com.sofka.crud.repositories.IListRepository;

@Service
public class ListService {
  
  @Autowired
  private IListRepository listRepository;  

  
  /*=========== SAVE ===========*/
  /** Saves a new register of List */
  public ListModel saveNewList(ListModel list){
    return listRepository.save(new ListModel(list.getName()));
  }


  /*=========== FIND ===========*/
  /** Finds all Lists */
  public List<ListModel> findLists(){
    // Find without filters
    return (List<ListModel>) listRepository.findAll();
  }

  /** Get List by id */
  public Optional<ListModel> getList(Long id){
    return listRepository.findById(id);
  }


  /*=========== FIND & EDIT ===========*/
  /** Edit List name*/
  public ListModel editList(Long id, ListModel list){
    ListModel _list = this.getList(id).orElseThrow();
      
    _list.setName(list.getName());

    return listRepository.save(_list);
  }


  /*=========== DELETE ===========*/
  /** Deletes List by id */
  public void deleteList(Long id){
    listRepository.delete(this.getList(id).get());
  }

  /** Deletes all Lists */
  public void deleteLists(){
      listRepository.deleteAll();
  }
}
