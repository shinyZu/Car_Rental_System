package lk.easycar.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lk.easycar.spring.entity.Admin;
import lk.easycar.spring.entity.Customer;
import lk.easycar.spring.entity.RentalDetail;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class RentalRequestDTO {

    private String rental_id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate pickUp_date;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime pickUp_time;

    private String pickUp_venue;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate return_date;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime return_time;

    private String return_venue;
    private String requestStatus;
    private double totalPaymentForRental;
    private double amountToReturn; // To customer , balance from LDW
    private Customer customer;
    private Admin admin;
    private List<RentalDetailDTO> rentalDetails = new ArrayList<>();

    public RentalRequestDTO(String rental_id, LocalDate pickUp_date, LocalTime pickUp_time, String pickUp_venue, LocalDate return_date, LocalTime return_time, String return_venue, String requestStatus) {
        this.rental_id = rental_id;
        this.pickUp_date = pickUp_date;
        this.pickUp_time = pickUp_time;
        this.pickUp_venue = pickUp_venue;
        this.return_date = return_date;
        this.return_time = return_time;
        this.return_venue = return_venue;
        this.requestStatus = requestStatus;
    }
}
