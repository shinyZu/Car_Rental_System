package lk.easycar.spring.repo;

import lk.easycar.spring.config.JPAConfig;
import lk.easycar.spring.entity.RentalPayment;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@WebAppConfiguration
@ContextConfiguration(classes = {JPAConfig.class})
@ExtendWith(SpringExtension.class)
@Transactional
class RentalPaymentRepoTest {

    @Autowired
    RentalPaymentRepo rentalPaymentRepo;

    /*@Test
    void findByOrOrderByFee_idDesc() {
        List<RentalPayment> order = rentalPaymentRepo.findByOrderByFee_idDesc("RF-0001");
    }*/

    @Test
    void getLastPaymentID() {
        String lastPaymentID = rentalPaymentRepo.getLastPaymentID();
        System.out.println(lastPaymentID);
    }

    @Test
    void getAllRentalPayments() {
        List<Double> allRentalPayments = rentalPaymentRepo.getAllRentalPayments("RNTL-0001");
        System.out.println(allRentalPayments.get(0));
        System.out.println(allRentalPayments.get(1));
    }


}