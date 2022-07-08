package lk.easycar.spring.repo;

import lk.easycar.spring.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepo extends JpaRepository<Customer,String> {

    @Query(value = "select u from Customer u")
    List<Customer> getAllCustomers();

}
