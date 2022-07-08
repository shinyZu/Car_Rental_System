package lk.easycar.spring.service;

import lk.easycar.spring.dto.DriverDTO;

import java.util.List;

public interface DriverService {
    List<DriverDTO> getAllDrivers();

    DriverDTO searchDriver(String license_no);

    DriverDTO saveDriver(DriverDTO dto);

    DriverDTO updateDriver(DriverDTO dto);

    void deleteDriver(String license_no);
}
