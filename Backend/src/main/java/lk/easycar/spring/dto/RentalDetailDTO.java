package lk.easycar.spring.dto;

import lk.easycar.spring.entity.Car;
import lk.easycar.spring.entity.Driver;
import lk.easycar.spring.entity.RentalRequest;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class RentalDetailDTO {
    private String rental_id;
    private String reg_no;
    private String driverStatus;
    private Driver driver;
    private double feeDeductedFromLDW;
    private double km_atPickUp;
    private double km_atReturn;
    private double km_travelled;

    public RentalDetailDTO(String rental_id, String reg_no) {
        this.rental_id = rental_id;
        this.reg_no = reg_no;
    }

    public RentalDetailDTO(String rental_id, String reg_no, double feeDeductedFromLDW, double km_atReturn) {
        this.rental_id = rental_id;
        this.reg_no = reg_no;
        this.feeDeductedFromLDW = feeDeductedFromLDW;
        this.km_atReturn = km_atReturn;
    }
}
