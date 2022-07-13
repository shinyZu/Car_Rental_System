package lk.easycar.spring.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
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
    private String requestStatus; // when placing the rental --> Accepted, Denied, Pending, Active, Returned
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

    @OneToMany(mappedBy = "rental", cascade = CascadeType.ALL/*, fetch=FetchType.EAGER*/)
    private List<RentalDetail> rentalDetails = new ArrayList<>();

    public RentalRequest(String rental_id) {
        this.rental_id = rental_id;
    }

    public RentalRequest(String rental_id, String requestStatus) {
        this.rental_id = rental_id;
        this.requestStatus = requestStatus;
    }

    public RentalRequest(String rental_id, double totalPaymentForRental) {
        this.rental_id = rental_id;
        this.totalPaymentForRental = totalPaymentForRental;
    }

    public RentalRequest(String rental_id, LocalDate pickUp_date, LocalDate return_date) {
        this.rental_id = rental_id;
        this.pickUp_date = pickUp_date;
        this.return_date = return_date;
    }

    public RentalRequest(String rental_id, LocalDate pickUp_date, LocalTime pickUp_time, String pickUp_venue, LocalDate return_date, LocalTime return_time, String return_venue, String requestStatus) {
        this.rental_id = rental_id;
        this.pickUp_date = pickUp_date;
        this.pickUp_time = pickUp_time;
        this.pickUp_venue = pickUp_venue;
        this.return_date = return_date;
        this.return_time = return_time;
        this.return_venue = return_venue;
        this.requestStatus = requestStatus;
    }
}
