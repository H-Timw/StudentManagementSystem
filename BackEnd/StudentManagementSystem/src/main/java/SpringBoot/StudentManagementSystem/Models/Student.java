package SpringBoot.StudentManagementSystem.Models;

import jakarta.persistence.*;

@Entity
@Table(name = "students")
public class Student {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name = "id_number")
  private Long idNumber;
  @Column(name = "contact_number")

  private String contactNumber;
  @Column(name = "name_student")

  private String nameStudent;
  @Column(name = "class_id")

  private String classId;
  @Column(name = "gender_student")

  private String genderStudent;
  @Column(name = "mark_student")

  private Double markStudent;


  public Long getIdNumber() {
    return idNumber;
  }

  public void setIdNumber(Long idNumber) {
    this.idNumber = idNumber;
  }

  public String getContactNumber() {
    return contactNumber;
  }

  public void setContactNumber(String contactNumber) {
    this.contactNumber = contactNumber;
  }

  public String getNameStudent() {
    return nameStudent;
  }

  public void setNameStudent(String nameStudent) {
    this.nameStudent = nameStudent;
  }

  public String getClassId() {
    return classId;
  }

  public void setClassId(String classID) {
    this.classId = classId;
  }

  public String getGenderStudent() {
    return genderStudent;
  }

  public void setGenderStudent(String genderStudent) {
    this.genderStudent = genderStudent;
  }

  public Double getMarkStudent() {
    return markStudent;
  }

  public void setMarkStudent(Double markStudent) {
    this.markStudent = markStudent;
  }

  @Override
  public String toString() {
    return "Student{" +
            "idNumber=" + idNumber +
            ", contactNumber='" + contactNumber + '\'' +
            ", nameStudent='" + nameStudent + '\'' +
            ", classId='" + classId + '\'' +
            ", genderStudent='" + genderStudent + '\'' +
            ", markStudent=" + markStudent +
            '}';
  }
}
