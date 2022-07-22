package lk.easycar.spring.repo;

import lk.easycar.spring.dto.Custom;

import java.time.LocalDate;
import java.util.List;

public interface CustomRepo {

    List<Custom> getWorkScheduleByDuration(LocalDate date1, LocalDate date2);
}
