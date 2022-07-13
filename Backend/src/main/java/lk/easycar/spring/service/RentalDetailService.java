package lk.easycar.spring.service;

import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.dto.RentalDetailDTO;

import java.util.List;

public interface RentalDetailService {

    List<RentalDetailDTO> getAllRentalDetailsByRentalID(String rental_id);

    boolean changeAssignedDriver(RentalDetailDTO dto, String license_no);

    int updateDetailsAfterReturn(RentalDetailDTO dto);

    int deleteRentalDetail(RentalDetailDTO dto);
}
