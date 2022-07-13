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

}
