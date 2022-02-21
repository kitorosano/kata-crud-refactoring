package co.com.sofka.crud.models;

import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class ListModel {
  @Id
  @GeneratedValue()
  private Long id;

  @Column(name = "name", length = 50, nullable = false)
  private String name;


  public ListModel() {
  }

  public ListModel(String name) {
    this.name = name;
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


  @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ListModel)) {
            return false;
        }
        ListModel listModel = (ListModel) o;
        return Objects.equals(id, listModel.id) && Objects.equals(name, listModel.name);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name);
  }


  @Override
  public String toString() {
    return "{" +
      " id='" + getId() + "'" +
      ", name='" + getName() + "'" +
      "}";
  }

}
