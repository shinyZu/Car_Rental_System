package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class RentalPayment {

    @Id
    private String fee_id;
    private double fee;
//    private LocalDate dateOfPayment;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "rental_id", referencedColumnName = "rental_id")
    private RentalRequest rental;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reg_no", referencedColumnName = "reg_no")
    private Car cars;

    /*@ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "reg_no", referencedColumnName = "reg_no")
    private RentalDetail rentalDetail;*/


}
