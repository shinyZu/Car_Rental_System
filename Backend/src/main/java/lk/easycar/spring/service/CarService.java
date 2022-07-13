package lk.easycar.spring.service;

import lk.easycar.spring.dto.CarDTO;

import java.util.List;

public interface CarService {
    List<CarDTO> getAllCars();

    CarDTO searchCar(String reg_no);

    int getNoOfCarsByStatus(String status);

    CarDTO saveCar(CarDTO dto);

    CarDTO updateCar(CarDTO dto);

    void updateCarStatus(CarDTO dto);

    void deleteCar(String reg_no);
}
