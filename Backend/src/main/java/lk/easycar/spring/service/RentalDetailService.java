package lk.easycar.spring.service;

import lk.easycar.spring.dto.RentalDetailDTO;

public interface RentalDetailService {

    boolean changeAssignedDriver(RentalDetailDTO dto, String license_no);
}
