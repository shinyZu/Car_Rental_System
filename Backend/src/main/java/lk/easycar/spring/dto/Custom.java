package lk.easycar.spring.dto;

import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;

public interface Custom {
    String getRentalID();

    String getLicenseNo();

    String getCustomerNIC();

    LocalDate getPickUp_date();

    LocalTime getPickUp_time();

    String getPickUp_venue();

    LocalDate getReturn_date();

    LocalTime getReturn_time();

    String getReturn_venue();

    String getRequestStatus();


}
