package lk.easycar.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lk.easycar.spring.entity.CarFleet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class LDWPaymentDTO {
    private String fee_id;
    private double fee;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfPayment;

    private CarFleet fleet;

}
