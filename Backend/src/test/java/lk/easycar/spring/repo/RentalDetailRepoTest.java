package lk.easycar.spring.repo;

import lk.easycar.spring.config.JPAConfig;
import lk.easycar.spring.dto.RentalDetailDTO;
import lk.easycar.spring.entity.Driver;
import lk.easycar.spring.entity.RentalDetail;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@WebAppConfiguration
@ContextConfiguration(classes = {JPAConfig.class})
@ExtendWith(SpringExtension.class)
@Transactional
class RentalDetailRepoTest {

    @Autowired
    RentalDetailRepo rentalDetailRepo;

    @Test
    void getRentalDetailByRental_idAndReg_no() {
        RentalDetail detail = rentalDetailRepo.getRentalDetailByRental_idAndReg_no("RNTL-0001", "PB-5951");
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
        getRentalDetailByRental_idAndReg_no();
    }

    @Test
    void updateDetailsAfterReturn() {
//        getRentalDetail();
        int i = rentalDetailRepo.updateDetailsAfterReturn("RNTL-0001", "PB-5951", 1000.00, 8500.00, 500.00);
        System.out.println(i);
        getRentalDetail();
    }

    @Test
    void getRentalDetail() {
        List<RentalDetail> rentalDetails = rentalDetailRepo.getAllRentalDetailsByRental_id("RNTL-0001");
//        System.out.println(rentalDetail.toString()); // stack overflow error

        for (RentalDetail detail : rentalDetails) {
            System.out.println(detail.getRental_id());
            System.out.println(detail.getReg_no());
            System.out.println(detail.getFeeDeductedFromLDW());
            System.out.println(detail.getKm_atReturn());
            System.out.println(detail.getKm_travelled());
        }
    }

    @Test
    void getRental_idOfReg_no() {
        String rental_id = rentalDetailRepo.getRental_idOfActiveReg_no("PB-5951", "Active");
        System.out.println(rental_id);
    }
}
