package lk.easycar.spring.repo;

import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerRepo extends JpaRepository<Customer,String> {

    @Query(value = "select u from Customer u")
    List<Customer> getAllCustomers();

    @Query(value="select count(c.contact_no) from Customer c where c.contact_no=?1",nativeQuery=true)
    int searchForAnyDuplicateContact(String contact_no);

    @Query(value="select count(c.license_no) from Customer c where c.license_no=?1",nativeQuery=true)
    int searchForAnyDuplicateLicense(String license_no);

    Customer getCustomerByEmail(String email);
}
