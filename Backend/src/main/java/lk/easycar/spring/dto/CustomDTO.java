package lk.easycar.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    private String currentStatus;
    private int contact_no;
    private String reg_no;

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


    public CustomDTO(String rental_id, String license_no, String currentStatus, int contact_no, LocalDate pickUp_date, LocalTime pickUp_time, String pickUp_venue, LocalDate return_date, LocalTime return_time, String return_venue, String requestStatus) {
        this.rental_id = rental_id;
        this.license_no = license_no;
        this.currentStatus = currentStatus;
        this.contact_no = contact_no;
        this.pickUp_date = pickUp_date;
        this.pickUp_time = pickUp_time;
        this.pickUp_venue = pickUp_venue;
        this.return_date = return_date;
        this.return_time = return_time;
        this.return_venue = return_venue;
        this.requestStatus = requestStatus;
    }
}
