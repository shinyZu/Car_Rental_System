package lk.easycar.spring.repo;

import lk.easycar.spring.config.JPAConfig;
import lk.easycar.spring.dto.RentalRequestDTO;
import lk.easycar.spring.entity.Customer;
import lk.easycar.spring.entity.RentalDetail;
import lk.easycar.spring.entity.RentalRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

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
    void getRequestStatusByRental_id() {
        String status = rentalRequestRepo.getRequestStatusByRental_id("RNTL-0001");
        System.out.println(status);
    }

    @Test
    void countActiveRentalsForTheDay() {
//        LocalDate parse = LocalDate.parse("2022-07-09");
//        System.out.println(parse);
//        String date = "2022-07-09";
        int active = rentalRequestRepo.countActiveRentalsForTheDay("Active",LocalDate.parse("2022-07-10"));
        System.out.println(active);
    }

    @Test
    void countTotalRentalsForTheDay() {
        int i = rentalRequestRepo.countTotalRentalsForTheDay(LocalDate.parse("2022-07-12"));
        System.out.println(i);
    }

    /*@Test
    void getRentalByRegNoAndRequestStatus() {
        RentalRequest rental = rentalRequestRepo.getRentalByRegNoAndRequestStatus("PB-5951", "Active");
        System.out.println(rental.getRentalDetails().get(0).getRental_id());
        System.out.println(rental.getRentalDetails().get(1).getRental_id());
    }*/

    @Test
    void getRentalRequestByCustomer() {
        RentalRequest request = rentalRequestRepo.getRentalRequestByCustomer("995922121v","Active");
        System.out.println(request.getRental_id());
        System.out.println(request.getRequestStatus());
        System.out.println(request.getRentalDetails().get(0).getReg_no());
        System.out.println(request.getRentalDetails().get(1).getReg_no());
    }

    @Test
    void getRentalDuration() {
        String duration = rentalRequestRepo.getRentalDuration("RNTL-0001");
        System.out.println(duration);
    }

    @Test
    void getCountOfActiveRentalsByCustomer() {
        int count = rentalRequestRepo.getCountOfActiveRentalsByCustomer("995922121v", "Active");
        System.out.println(count);
    }

    @Test
    void getAllPaymentsByDate() {
        List<RentalRequest> allPaymentsByDate = rentalRequestRepo.getAllPaymentsByDate(LocalDate.parse("2022-07-10"));
        for (RentalRequest request : allPaymentsByDate) {
            System.out.println(request.getTotalPaymentForRental());
        }
    }

}