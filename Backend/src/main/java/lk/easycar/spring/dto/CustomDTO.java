package lk.easycar.spring.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CustomDTO {

    private String rental_id;
    private String license_no;
    private String customer_nic;
    private String reg_no;
    //    private RentalRequestDTO requestDTO;
    private LocalDate pickUp_date;
    private LocalTime pickUp_time;
    private String pickUp_venue;
    private LocalDate return_date;
    private LocalTime return_time;
    private String return_venue;
    private String requestStatus;


    public CustomDTO(String reg_no, String requestStatus) {
        this.reg_no = reg_no;
        this.requestStatus = requestStatus;
    }
}
