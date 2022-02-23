package co.com.sofka.crud.models;

import java.util.Objects;

public class TodoRequestModel {
  private Long id;
  private String name;
  private Boolean completed;
  private Long listId;

  public TodoRequestModel() {
  }

  public TodoRequestModel(String name, Boolean completed) {
    this.name = name;
    this.completed = completed;
  }

  public TodoRequestModel(Long id, String name, Boolean completed, Long listId) {
    this.id = id;
    this.name = name;
    this.completed = completed;
    this.listId = listId;
  }


  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public Boolean isCompleted() {
    return this.completed;
  }

  public Boolean getCompleted() {
    return this.completed;
  }

  public void setCompleted(Boolean completed) {
    this.completed = completed;
  }

  public Long getListId() {
    return this.listId;
  }

  public void setListId(Long listId) {
    this.listId = listId;
  }


  @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof TodoRequestModel)) {
            return false;
        }
        TodoRequestModel todoReturnModel = (TodoRequestModel) o;
        return Objects.equals(id, todoReturnModel.id) && Objects.equals(name, todoReturnModel.name) && Objects.equals(completed, todoReturnModel.completed) && Objects.equals(listId, todoReturnModel.listId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, completed, listId);
  }


  @Override
  public String toString() {
    return "{" +
      " id='" + getId() + "'" +
      ", name='" + getName() + "'" +
      ", completed='" + isCompleted() + "'" +
      ", listId='" + getListId() + "'" +
      "}";
  }



}
