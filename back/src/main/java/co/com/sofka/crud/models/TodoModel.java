package co.com.sofka.crud.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Todos")
public class TodoModel {
  
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "name", length = 50, nullable = false)
  private String name;
  
  @Column(name = "completed", nullable = false)
  private Boolean completed;

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

}
