package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class RentalRequest {

    @Id
    private String rental_id;
    private LocalDate pickUp_date;
    private LocalDate pickUp_time;
    private String pickUp_venue;
    private LocalDate return_date;
    private LocalDate return_time;
    private String return_venue;
    private String requestStatus;
    private double totalPaymentForRental;
    private double amountToReturn; // To customer , balance from LDW

    @ManyToOne
    @JoinColumn(name = "customer_nic", referencedColumnName = "nic_no")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "admin_id", referencedColumnName = "admin_id")
    private Admin admin;

    @OneToMany(mappedBy = "rental", cascade = CascadeType.ALL)
    private List<RentalDetail> rentalDetails = new ArrayList<>();

}
