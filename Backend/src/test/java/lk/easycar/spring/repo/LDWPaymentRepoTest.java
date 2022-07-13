package lk.easycar.spring.repo;

import lk.easycar.spring.config.JPAConfig;
import lk.easycar.spring.entity.CarFleet;
import lk.easycar.spring.entity.LDWPayment;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@WebAppConfiguration
@ContextConfiguration(classes = {JPAConfig.class})
@ExtendWith(SpringExtension.class)
@Transactional
class LDWPaymentRepoTest {

    @Autowired
    LDWPaymentRepo ldwPaymentRepo;

    /*@Test
    void getLDWPaymentByFleet_id() { // works fine
        double fee = ldwPaymentRepo.getLDWPaymentByFleet_id(new CarFleet("FLT-001"));
        System.out.println(fee);
    }
*/
    @Test
    void getLDWPaymentByFleet() {
        LDWPayment ldwPayment = ldwPaymentRepo.getLDWPaymentByFleet(new CarFleet("FLT-001"));
        System.out.println(ldwPayment.getFee());
    }
}