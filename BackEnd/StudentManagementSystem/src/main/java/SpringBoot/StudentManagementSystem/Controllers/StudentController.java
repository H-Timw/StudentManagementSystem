package SpringBoot.StudentManagementSystem.Controllers;

import SpringBoot.StudentManagementSystem.Models.ResponseObject;
import SpringBoot.StudentManagementSystem.Models.Student;
import SpringBoot.StudentManagementSystem.Repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1/Students")
public class StudentController {
    //DI Dependency Injection
    @Autowired
    private StudentRepository repository;

    @CrossOrigin
    @GetMapping("")
    public String welcome() {
        return "<html><body>"
                + "<h1>WELCOME</h1>"
                + "</body></html>";
    }

    @GetMapping("/student")
    ResponseEntity<?> findStudent(
            @RequestParam(value = "id", required = false) Long idNumber,
            @RequestParam(value = "name", required = false) String nameStudent
    ) {
        Optional<Student> foundStudent = null;
        List<Student> foundStudents = null;
        if (idNumber != null) {
            foundStudent = repository.findById(idNumber);
        }
        if (nameStudent != null) {
            foundStudents = repository.findByNameStudent(nameStudent.trim());
        }
        if (nameStudent == null && idNumber != null) {
            if (foundStudent.isPresent()) {
                return ResponseEntity.status(HttpStatus.FOUND).body(
                        new ResponseObject("Found", "Query student Successfully", foundStudent)
                );
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("Not Found", "Can find student with id = " + idNumber, "")
                );
            }
        }
        if (idNumber == null && nameStudent != null) {
            if (foundStudents.size() > 0) {
                StringBuilder dataResponse = new StringBuilder();
                for (Student student : foundStudents) {
                    dataResponse.append(student);
                }
                return ResponseEntity.status(HttpStatus.FOUND).body(
                        new ResponseObject("Found", "Found with student name: " + nameStudent, dataResponse)
                );
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        new ResponseObject("Not Found", "Can find student with id = " + " and name " + nameStudent, "")
                );
            }
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ResponseObject("Not Found", "Can find student with id = " + idNumber + " and name " + nameStudent, "")
        );
    }
    @CrossOrigin
    @GetMapping("/all")
    List<Student> getAllStudent() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    ResponseEntity<ResponseObject> findByID(@PathVariable(value = "id") Long id) {
        if (id > 0) {
            Student foundStudent = repository.findByIdNumber(id);
            return foundStudent != null ?
                    ResponseEntity.status(HttpStatus.FOUND).body(
                            new ResponseObject("Found", "Query student Successfully", foundStudent)
                    )
                    : ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("Not Found", "Can find student with id = " + id, "")
            );
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("Not Found", "Can find student with id = " + id, ""));
        }
    }

    //insert new student with POST Method - remember to send it as json file
    @PostMapping("/insert")
    ResponseEntity<ResponseObject> insertStudent(@RequestBody Student newStudent) {

        //need check 2 student not have same name/id or some other condition
        List<Student> foundStudents = repository.findByNameStudent(newStudent.getNameStudent().trim());
        if (foundStudents.size() > 0) {
            return ResponseEntity.status(HttpStatus.FOUND).body(
                    new ResponseObject("Insert Not Success", "Student Already Exist", "")
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Insert student Successfully", newStudent)
        );
    }
}
