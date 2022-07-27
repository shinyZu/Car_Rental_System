package lk.easycar.spring.dto;

import lk.easycar.spring.entity.CarFleet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CarDTO {
    private String reg_no;
    private String brand;
    private String color;
    private CarFleet fleet;
    private String fuelType;
    private String transmissionType;
    private int noOfPassengers;
    private double dailyRate;
    private double monthlyRate;
    private double price_extraKM;
    private double freeKM_day;
    private double freeKM_month;
    private String currentStatus;




}
