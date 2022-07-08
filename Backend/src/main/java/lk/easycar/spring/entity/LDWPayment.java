package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class LDWPayment {

    @Id
    String fee_id;
    double fee;
    Date dateOfPayment;

    @OneToOne
    @JoinColumn(name = "fleet_id", referencedColumnName = "fleet_id")
    private CarFleet fleet;
}
