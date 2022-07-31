package lk.easycar.spring.service;

import lk.easycar.spring.dto.CustomDTO;
import lk.easycar.spring.dto.RentalRequestDTO;

import java.time.LocalDate;
import java.util.List;

public interface RentalRequestService {
    List<RentalRequestDTO> getAllRentals();

    List<CustomDTO> getAllRentalsRequests();

    String generateNextID();

    RentalRequestDTO searchRental(String rental_id);

    List<CustomDTO> searchRentalByIDAndRegNo(String rental_id, String reg_no);

    String getRentalDuration(String rental_id);

    RentalRequestDTO searchActiveRentalByCustomer(String nic_no);

    List<CustomDTO> getAllReturns();

    String getRequestStatus(String rental_id);

    int getNoOfActiveRentalsForTheDay(LocalDate date);

    int getNoOfTotalRentalsForTheDay(LocalDate date);

    double calculateTotalPaymentForRental(String rental_id);

    double calculateAmountToReturn(String rental_id);

    //    double calculateDailyIncome(LocalDate date);
    List<CustomDTO> calculateDailyIncome(LocalDate date);

    //    double calculateMonthlyIncome(int month);
    List<CustomDTO> calculateMonthlyIncome();


    //    double calculateWeeklyIncome(String date);
    List<CustomDTO> calculateWeeklyIncome();


    //    double calculateAnnualIncome(String date);
    List<CustomDTO> calculateAnnualIncome();

    List<CustomDTO> getCustomerBookings(String nic_no);

    boolean placeRentalRequest(RentalRequestDTO dto);

    RentalRequestDTO updateRental(RentalRequestDTO dto);

    void updateRequestStatus(RentalRequestDTO dto);

    void acceptRental(RentalRequestDTO dto);

    void denyRental(RentalRequestDTO dto);

    void deleteRental(String rental_id);
}
