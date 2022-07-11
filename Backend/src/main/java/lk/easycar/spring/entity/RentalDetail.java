package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
@IdClass(RentalCar_PK.class)
public class RentalDetail {

    @Id
    private String rental_id;
    @Id
    private String reg_no;

    @ManyToOne/*(cascade = CascadeType.ALL)*/ // Multiple representations of the same Entity
    @JoinColumn(name = "rental_id", referencedColumnName = "rental_id", insertable = false, updatable = false)
    private RentalRequest rental;

    @ManyToOne/*(cascade = CascadeType.ALL)*/ // Multiple representations of the same Entity
    @JoinColumn(name = "reg_no", referencedColumnName = "reg_no", insertable = false, updatable = false)
    private Car cars;

    private String driverStatus; // Requested, Not Requested

    @ManyToOne
    @JoinColumn(name = "driver_licenseNo", referencedColumnName = "license_no")
    private Driver driver;

    private double feeDeductedFromLDW;
    private double km_atPickUp;
    private double km_atReturn;
    private double km_travelled;

    public RentalDetail(String rental_id, String reg_no, double feeDeductedFromLDW, double km_atPickUp, double km_atReturn, double km_travelled) {
        this.rental_id = rental_id;
        this.reg_no = reg_no;
        this.feeDeductedFromLDW = feeDeductedFromLDW;
        this.km_atPickUp = km_atPickUp;
        this.km_atReturn = km_atReturn;
        this.km_travelled = km_travelled;
    }
}
