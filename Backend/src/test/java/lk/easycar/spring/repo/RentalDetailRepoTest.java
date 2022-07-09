package lk.easycar.spring.repo;

import lk.easycar.spring.config.JPAConfig;
import lk.easycar.spring.entity.Driver;
import lk.easycar.spring.entity.RentalDetail;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

@WebAppConfiguration
@ContextConfiguration(classes = {JPAConfig.class})
@ExtendWith(SpringExtension.class)
@Transactional
class RentalDetailRepoTest {

    @Autowired
    RentalDetailRepo rentalDetailRepo;

    @Test
    void getAllDetails() {
        RentalDetail detail = rentalDetailRepo.getRentalDetail("RNTL-0001", "PB-5951");
//        System.out.println(detail.getReg_no());
//        System.out.println(detail.getRental_id());
        detail.getDriver().setCurrentStatus("Occupied");
        System.out.println(detail.getDriver());
//        for (RentalDetail rentalDetail : rentalDetails) {
//            System.out.println(rentalDetail.toString());
//        }
    }

    @Test
    void changeAssignedDriver() {
        rentalDetailRepo.changeAssignedDriver("RNTL-0001", "PB-5951", new Driver("DL-1000002"));
        getAllDetails();
    }
}
