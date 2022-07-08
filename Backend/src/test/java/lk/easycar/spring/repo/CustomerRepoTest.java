package lk.easycar.spring.repo;

import lk.easycar.spring.config.JPAConfig;
import lk.easycar.spring.entity.Customer;
import lk.easycar.spring.entity.RentalRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@WebAppConfiguration
@ContextConfiguration(classes = {JPAConfig.class})
@ExtendWith(SpringExtension.class)
class CustomerRepoTest {

    @Autowired
    CustomerRepo customerRepo;

    @Test
    public void saveCustomer() {

        List<RentalRequest> rentalList = new ArrayList<>();
        rentalList.add(new RentalRequest());

        Customer customer1 = new Customer("995922126V", "1212121212", "kamal@gmail.com", "kamal123", "Galle", 0716455453, null);
        customerRepo.save(customer1);
    }

    @Test
    public void getAllCustomers(){
        List<Customer> all = customerRepo.getAllCustomers();
        String nic_no = all.get(0).getNic_no();
//        List<RentalRequest> rentals = all.get(0).getRentalRequestList();
        System.out.println(nic_no);
//        System.out.println(rentals.toString());
//        for (Customer customer : all) {
//            System.out.println(customer.toString());
//        }
    }

}