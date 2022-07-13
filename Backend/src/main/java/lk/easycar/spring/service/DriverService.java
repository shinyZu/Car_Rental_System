package lk.easycar.spring.service;

import lk.easycar.spring.dto.Custom;
import lk.easycar.spring.dto.CustomDTO;
import lk.easycar.spring.dto.DriverDTO;

import java.util.List;

public interface DriverService {
    List<DriverDTO> getAllDrivers();

    DriverDTO searchDriver(String license_no);

    int getNoOfDriversByStatus(String status);

    List<CustomDTO> getWorkSchedule(String license_no);

    List<CustomDTO> getWorkScheduleByDuration(CustomDTO dto);

    DriverDTO saveDriver(DriverDTO dto);

    DriverDTO updateDriver(DriverDTO dto);

    void deleteDriver(String license_no);
}
