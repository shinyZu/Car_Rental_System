package lk.easycar.spring.dto;

import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;

public interface Custom {
    String getRental_id();

    String getLicense_no();

    String getCurrentStatus();

    int getContact_no();

    String getReg_no();

    LocalDate getPickUp_date();

    LocalTime getPickUp_time();

    String getPickUp_venue();

    LocalDate getReturn_date();

    LocalTime getReturn_time();

    String getReturn_venue();

    String getRequestStatus();

    String getYear();

    String getMonth();

    String getWeek();

    String getDay();

    String getIncome();

}
