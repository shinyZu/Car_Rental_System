package lk.easycar.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lk.easycar.spring.entity.Car;
import lk.easycar.spring.entity.RentalRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class RentalPaymentDTO {
    private String fee_id;
    private double fee;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateOfPayment;

    private RentalRequest rental;
    private Car cars;
}
