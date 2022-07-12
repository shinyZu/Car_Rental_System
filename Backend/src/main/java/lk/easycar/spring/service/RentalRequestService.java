package lk.easycar.spring.service;

import lk.easycar.spring.dto.RentalRequestDTO;

import java.time.LocalDate;
import java.util.List;

public interface RentalRequestService {
    List<RentalRequestDTO> getAllRentals();

    RentalRequestDTO searchRental(String rental_id);

    String getRequestStatus(String rental_id);

    int getNoOfActiveRentalsForTheDay(LocalDate date);

    int getNoOfTotalRentalsForTheDay(LocalDate date);

    boolean placeRentalRequest(RentalRequestDTO dto);

    RentalRequestDTO updateRental(RentalRequestDTO dto);

    void updateRequestStatus(RentalRequestDTO dto);

    void acceptRental(RentalRequestDTO dto);

    void denyRental(RentalRequestDTO dto);

    void deleteRental(String rental_id);
}
