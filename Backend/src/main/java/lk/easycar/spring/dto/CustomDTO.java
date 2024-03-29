package lk.easycar.spring.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CustomDTO {

    private String rental_id;
    private String license_no;
    private String currentStatus;
    private int contact_no;
    private String reg_no;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate pickUp_date;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime pickUp_time;

    private String pickUp_venue;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate return_date;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime return_time;

    private String return_venue;
    private String requestStatus;

    private String year;
    private String month;
    private String week;
    private String day;
    private String income;

    private String nic_no;
    private double km_atPickUp;
    private double km_atReturn;
    private double totalPaymentForRental;

    private String driverStatus;
    private double fee;

    private String brand;
    private String description;
    private String transmissionType;
    private String fuelType;
    private String color;


    public CustomDTO(String year, String income) {
        this.year = year;
        this.income = income;
    }

    public CustomDTO(String year, String month, String income) {
        this.year = year;
        this.month = month;
        this.income = income;
    }

    public CustomDTO(String year, String month, String week, String income) {
        this.year = year;
        this.month = month;
        this.week = week;
        this.income = income;
    }

    public CustomDTO(String year, String month, String week, String day, String income) {
        this.year = year;
        this.month = month;
        this.week = week;
        this.day = day;
        this.income = income;
    }

    public CustomDTO(String rental_id, String license_no, String reg_no, String nic_no, double km_atPickUp) {
        this.rental_id = rental_id;
        this.license_no = license_no;
        this.reg_no = reg_no;
        this.nic_no = nic_no;
        this.km_atPickUp = km_atPickUp;
    }

    public CustomDTO(String rental_id, String license_no, String reg_no, String nic_no, double km_atPickUp, double km_atReturn) {
        this.rental_id = rental_id;
        this.license_no = license_no;
        this.reg_no = reg_no;
        this.nic_no = nic_no;
        this.km_atPickUp = km_atPickUp;
        this.km_atReturn = km_atReturn;
    }

    public CustomDTO(String rental_id, String license_no, int contact_no, String reg_no, LocalDate pickUp_date, LocalTime pickUp_time, String pickUp_venue, LocalDate return_date, LocalTime return_time, String return_venue) {
        this.rental_id = rental_id;
        this.license_no = license_no;
        this.contact_no = contact_no;
        this.reg_no = reg_no;
        this.pickUp_date = pickUp_date;
        this.pickUp_time = pickUp_time;
        this.pickUp_venue = pickUp_venue;
        this.return_date = return_date;
        this.return_time = return_time;
        this.return_venue = return_venue;
    }

    public CustomDTO(String rental_id, String license_no, String currentStatus, int contact_no, String reg_no, LocalDate pickUp_date, LocalTime pickUp_time, String pickUp_venue, LocalDate return_date, LocalTime return_time, String return_venue, String requestStatus) {
        this.rental_id = rental_id;
        this.license_no = license_no;
        this.currentStatus = currentStatus;
        this.contact_no = contact_no;
        this.reg_no = reg_no;
        this.pickUp_date = pickUp_date;
        this.pickUp_time = pickUp_time;
        this.pickUp_venue = pickUp_venue;
        this.return_date = return_date;
        this.return_time = return_time;
        this.return_venue = return_venue;
        this.requestStatus = requestStatus;
    }

    //getWorkSchedule
    public CustomDTO(String rental_id, String license_no, String currentStatus, int contact_no, String reg_no, LocalDate pickUp_date, LocalTime pickUp_time, String pickUp_venue, LocalDate return_date, LocalTime return_time, String return_venue, String requestStatus, String driverStatus, String brand) {
        this.rental_id = rental_id;
        this.license_no = license_no;
        this.currentStatus = currentStatus;
        this.contact_no = contact_no;
        this.reg_no = reg_no;
        this.pickUp_date = pickUp_date;
        this.pickUp_time = pickUp_time;
        this.pickUp_venue = pickUp_venue;
        this.return_date = return_date;
        this.return_time = return_time;
        this.return_venue = return_venue;
        this.requestStatus = requestStatus;
        this.driverStatus = driverStatus;
        this.brand = brand;
    }

    /* public CustomDTO(String rental_id, String license_no, String currentStatus, int contact_no, LocalDate pickUp_date, LocalTime pickUp_time, String pickUp_venue, LocalDate return_date, LocalTime return_time, String return_venue, String requestStatus) {
        this.rental_id = rental_id;
        this.license_no = license_no;
        this.currentStatus = currentStatus;
        this.contact_no = contact_no;
        this.pickUp_date = pickUp_date;
        this.pickUp_time = pickUp_time;
        this.pickUp_venue = pickUp_venue;
        this.return_date = return_date;
        this.return_time = return_time;
        this.return_venue = return_venue;
        this.requestStatus = requestStatus;
    }*/

    public CustomDTO(String rental_id, String license_no, String reg_no, LocalDate pickUp_date, LocalTime pickUp_time, String pickUp_venue, LocalDate return_date, LocalTime return_time, String return_venue, String requestStatus, String nic_no, double km_atPickUp, double km_atReturn, double totalPaymentForRental) {
        this.rental_id = rental_id;
        this.license_no = license_no;
        this.reg_no = reg_no;
        this.pickUp_date = pickUp_date;
        this.pickUp_time = pickUp_time;
        this.pickUp_venue = pickUp_venue;
        this.return_date = return_date;
        this.return_time = return_time;
        this.return_venue = return_venue;
        this.requestStatus = requestStatus;
        this.nic_no = nic_no;
        this.km_atPickUp = km_atPickUp;
        this.km_atReturn = km_atReturn;
        this.totalPaymentForRental = totalPaymentForRental;
    }

    public CustomDTO(String rental_id, String license_no, String reg_no, LocalDate pickUp_date, LocalTime pickUp_time, String pickUp_venue, LocalDate return_date, LocalTime return_time, String return_venue, String nic_no, double km_atPickUp, String driverStatus, double fee) {
        this.rental_id = rental_id;
        this.license_no = license_no;
        this.reg_no = reg_no;
        this.pickUp_date = pickUp_date;
        this.pickUp_time = pickUp_time;
        this.pickUp_venue = pickUp_venue;
        this.return_date = return_date;
        this.return_time = return_time;
        this.return_venue = return_venue;
        this.nic_no = nic_no;
        this.km_atPickUp = km_atPickUp;
        this.driverStatus = driverStatus;
        this.fee = fee;
    }

    public CustomDTO(String rental_id, int contact_no, String reg_no, LocalDate pickUp_date, LocalTime pickUp_time, String pickUp_venue, LocalDate return_date, LocalTime return_time, String return_venue, String requestStatus, String driverStatus, String brand) {
        this.rental_id = rental_id;
        this.contact_no = contact_no;
        this.reg_no = reg_no;
        this.pickUp_date = pickUp_date;
        this.pickUp_time = pickUp_time;
        this.pickUp_venue = pickUp_venue;
        this.return_date = return_date;
        this.return_time = return_time;
        this.return_venue = return_venue;
        this.requestStatus = requestStatus;
        this.driverStatus = driverStatus;
        this.brand = brand;
    }

    public CustomDTO(String rental_id, int contact_no, String reg_no, LocalDate pickUp_date, LocalTime pickUp_time, String pickUp_venue, LocalDate return_date, LocalTime return_time, String return_venue, String requestStatus, double totalPaymentForRental, String driverStatus, String brand) {
        this.rental_id = rental_id;
        this.contact_no = contact_no;
        this.reg_no = reg_no;
        this.pickUp_date = pickUp_date;
        this.pickUp_time = pickUp_time;
        this.pickUp_venue = pickUp_venue;
        this.return_date = return_date;
        this.return_time = return_time;
        this.return_venue = return_venue;
        this.requestStatus = requestStatus;
        this.totalPaymentForRental = totalPaymentForRental;
        this.driverStatus = driverStatus;
        this.brand = brand;
    }

    public CustomDTO(String reg_no, LocalDate return_date, double km_atPickUp, String brand, String description, String transmissionType, String fuelType, String color) {
        this.reg_no = reg_no;
        this.return_date = return_date;
        this.km_atPickUp = km_atPickUp;
        this.brand = brand;
        this.description = description;
        this.transmissionType = transmissionType;
        this.fuelType = fuelType;
        this.color = color;
    }
}
