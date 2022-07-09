package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
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
    private LocalTime pickUp_time;
    private String pickUp_venue;
    private LocalDate return_date;
    private LocalTime return_time;
    private String return_venue;
    private String requestStatus; // when placing the rental --> Accepted, Denied, Pending
    private double totalPaymentForRental;
    private double amountToReturn; // To customer , balance from LDW

    // @ManyToOne(cascade = CascadeType.ALL) // Multiple representations of the same Entity
    // Because an attempt is made to assign an already persistent object or detached object value to a property of a new transient object.
    // The transient object that caused the last save or merge to report the error.
    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH}) //
    @JoinColumn(name = "customer_nic", referencedColumnName = "nic_no")
    private Customer customer;

    @ManyToOne/*(cascade = {CascadeType.REFRESH,CascadeType.DETACH})*/
    @JoinColumn(name = "admin_id", referencedColumnName = "admin_id")
    private Admin admin;

    @OneToMany(mappedBy = "rental", cascade = CascadeType.ALL)
    private List<RentalDetail> rentalDetails = new ArrayList<>();

}
