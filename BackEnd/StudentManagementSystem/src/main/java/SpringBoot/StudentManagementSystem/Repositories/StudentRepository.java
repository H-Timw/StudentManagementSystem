package SpringBoot.StudentManagementSystem.Repositories;

import SpringBoot.StudentManagementSystem.Models.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findByNameStudent(String nameStudent);
    Student findByIdNumber(Long id);

}
