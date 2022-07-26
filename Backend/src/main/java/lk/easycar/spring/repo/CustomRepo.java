package lk.easycar.spring.repo;

import lk.easycar.spring.dto.Custom;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface CustomRepo {

    List<Custom> getWorkScheduleByDuration(LocalDate date1, LocalDate date2);





}
