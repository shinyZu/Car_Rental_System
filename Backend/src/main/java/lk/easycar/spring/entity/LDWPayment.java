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
public class LDWPayment {

    @Id
    private String fee_id;
    private double fee;

//    private LocalDate dateOfPayment;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fleet_id", referencedColumnName = "fleet_id")
    private CarFleet fleet;
}
