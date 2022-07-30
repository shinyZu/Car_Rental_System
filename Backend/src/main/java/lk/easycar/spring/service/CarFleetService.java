package lk.easycar.spring.service;

import lk.easycar.spring.dto.CarFleetDTO;

import java.util.List;

public interface CarFleetService {
    List<CarFleetDTO> getAllFleets();

    String generateNextID();

    CarFleetDTO searchCarFleet(String fleet_id);

    double getLDWFeeByDescription(String fleet, String reg_no);

    CarFleetDTO saveCarFleet(CarFleetDTO dto);

    CarFleetDTO updateCarFleet(CarFleetDTO dto);

    void deleteCarFleet(String fleet_id);
}
