package co.com.sofka.crud.models;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "Lists")
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class, 
  property = "id")
public class ListModel {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "name", length = 50, nullable = false)
  private String name;

  @OneToMany(orphanRemoval = true, cascade = CascadeType.ALL)
  @JoinColumn(name = "listId")
  // @JsonManagedReference
  private Set<TodoModel> todos = new HashSet<TodoModel>();

  public ListModel() { }

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


  public Set<TodoModel> getTodos() {
    return this.todos;
  }

  public void setTodos(Set<TodoModel> todos) {
    this.todos = todos;
  }



  @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof ListModel)) {
            return false;
        }
        ListModel listModel = (ListModel) o;
        return Objects.equals(id, listModel.id) && Objects.equals(name, listModel.name) && Objects.equals(todos, listModel.todos);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, name, todos);
  }


  @Override
  public String toString() {
    return "{" +
      " id='" + getId() + "'" +
      ", name='" + getName() + "'" +
      ", todos='" + getTodos() + "'" +
      "}";
  }


}
