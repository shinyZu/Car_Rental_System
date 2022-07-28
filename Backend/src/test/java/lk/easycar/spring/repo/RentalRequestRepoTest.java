package lk.easycar.spring.repo;

import lk.easycar.spring.config.JPAConfig;
import lk.easycar.spring.dto.Custom;
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
import java.time.Month;
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
        String duration = rentalRequestRepo.getRentalDuration("RNTL-0004");
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

    @Test
    void getMonthlyIncome() {
        List<RentalRequest> monthlyIncome = rentalRequestRepo.getAllPaymentsByMonth(7);
        for (RentalRequest request : monthlyIncome) {
            System.out.println(request.getTotalPaymentForRental());
        }
    }

    @Test
    void getAllPaymentsForWeek() {
        List<RentalRequest> allPaymentsForWeek = rentalRequestRepo.getAllPaymentsForWeek(LocalDate.parse("2022-07-10"), LocalDate.parse("2022-07-17"));
        for (RentalRequest request : allPaymentsForWeek) {
            System.out.println(request.getTotalPaymentForRental());
        }
    }

    @Test
    void getAllPaymentsForYear() {
        List<RentalRequest> allPaymentsForYear = rentalRequestRepo.getAllPaymentsForYear(2021);
        for (RentalRequest request : allPaymentsForYear) {
            System.out.println(request.getTotalPaymentForRental());
        }
    }

    @Test
    void calculateDailyIncome() {
        List<Custom> dailyIncome = rentalRequestRepo.calculateDailyIncome(LocalDate.parse("2021-06-27"));
        for (Custom custom : dailyIncome) {
            System.out.println(custom.getYear());
            System.out.println(custom.getMonth());
            System.out.println(custom.getWeek());
            System.out.println(custom.getDay());
            System.out.println(custom.getIncome());

        }
    }

    @Test
    void calculateWeeklyIncome() {
        List<Custom> weeklyIncome = rentalRequestRepo.calculateWeeklyIncome();
        for (Custom custom : weeklyIncome) {
            System.out.println(custom.getYear());
            System.out.println(custom.getMonth());
            System.out.println(custom.getWeek());
            System.out.println(custom.getIncome());
        }
    }

    @Test
    void calculateMonthlyIncome() {
        List<Custom> monthlyIncome = rentalRequestRepo.calculateMonthlyIncome();
        for (Custom custom : monthlyIncome) {
            System.out.println(custom.getYear());
            System.out.println(custom.getMonth());
            System.out.println(custom.getIncome());
        }
    }

    @Test
    void calculateAnnualIncome() {
        List<Custom> annualIncome = rentalRequestRepo.calculateAnnualIncome();
        for (Custom custom : annualIncome) {
            System.out.println(custom.getYear());
            System.out.println(custom.getIncome());
        }
    }

    @Test
    void getAllRentalsRequests() {
        List<Custom> requests = rentalRequestRepo.getAllRentalsRequests();
        for (Custom request : requests) {
            System.out.println(request.getTotalPaymentForRental());
            System.out.println(request.getKm_atPickUp());
            System.out.println(request.getKm_atReturn());
        }
    }

    @Test
    void getAllReturns() {
        List<Custom> active = rentalRequestRepo.getAllReturns("Active");
        System.out.println(active);
        System.out.println(active.get(0).getNic_no());
        for (Custom request : active) {
            System.out.println(request.getRental_id());
            System.out.println(request.getNic_no());
            System.out.println(request.getKm_atPickUp());
//            System.out.println(request.getKm_atReturn());
        }
    }

    @Test
    void searchRentalByIDAndRegNo() {
        List<Custom> active = rentalRequestRepo.searchRentalByIDAndRegNo("RNTL-0004","PB-5954");
    }
}