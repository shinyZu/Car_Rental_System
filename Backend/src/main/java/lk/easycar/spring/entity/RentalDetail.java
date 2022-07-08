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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rental_id", referencedColumnName = "rental_id", insertable = false, updatable = false)
    private RentalRequest rental;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reg_no", referencedColumnName = "reg_no", insertable = false, updatable = false)
    private Car cars;

    private String driverStatus;

    @ManyToOne
    @JoinColumn(name = "license_no", referencedColumnName = "license_no")
    private Driver driver;

    private double feeDeductedFromLDW;
    private double km_atPickUp;
    private double km_atReturn;
    private double km_travelled;

}
