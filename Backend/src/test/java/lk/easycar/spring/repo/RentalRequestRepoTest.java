package lk.easycar.spring.repo;

import lk.easycar.spring.config.JPAConfig;
import lk.easycar.spring.entity.RentalRequest;
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
class RentalRequestRepoTest {

    @Autowired
    RentalRequestRepo rentalRequestRepo;

    @Test
    void getAllRentalRequests() {
        List<RentalRequest> all = rentalRequestRepo.getAllRequests();
        for (RentalRequest rentalRequest : all) {
            System.out.println(rentalRequest.getRental_id());
            System.out.println(rentalRequest.getPickUp_date());
            System.out.println(rentalRequest.getReturn_date());
        }
    }

    @Test
    void getRentalDuration() {
        RentalRequest duration = rentalRequestRepo.getRentalDuration("RNTL-0001");
    }


    @Test
    void getRequestStatusByRental_id() {
        String status = rentalRequestRepo.getRequestStatusByRental_id("RNTL-0001");
        System.out.println(status);
    }
}