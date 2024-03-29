package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Car {

    @Id
    private String reg_no;
    private String brand;
    private String color;

    @ManyToOne/*(cascade = CascadeType.ALL)*/
    @JoinColumn(name = "fleet_id", referencedColumnName = "fleet_id")
    private CarFleet fleet;

    private String fuelType;
    private String transmissionType;
    private int noOfPassengers;
    private double dailyRate;
    private double monthlyRate;
    private double price_extraKM;
    private double freeKM_day;
    private double freeKM_month;
    private String currentStatus; // Available(if not requested), Unavailable(if Damaged), Reserved(if requested), Under Maintenance

    public Car(String reg_no) {
        this.reg_no = reg_no;
    }
}
