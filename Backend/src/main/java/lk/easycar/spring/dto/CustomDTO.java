package lk.easycar.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;

//@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CustomDTO {

    private String rental_id;
    private String license_no;
    private String customer_nic;
    //    private RentalRequestDTO requestDTO;
    private LocalDate pickUp_date;
    private LocalTime pickUp_time;
    private String pickUp_venue;
    private LocalDate return_date;
    private LocalTime return_time;
    private String return_venue;
    private String requestStatus;

    public CustomDTO(String rental_id, String requestStatus) {
        this.rental_id = rental_id;
        this.requestStatus = requestStatus;
    }
}
