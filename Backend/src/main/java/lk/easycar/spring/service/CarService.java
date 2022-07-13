package lk.easycar.spring.service;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.dto.Custom;
import lk.easycar.spring.dto.CustomDTO;

import java.util.List;

public interface CarService {
    List<CarDTO> getAllCars();

    CarDTO searchCar(String reg_no);

    int getNoOfCarsByStatus(String status);

    List<CustomDTO> getCarSchedule(String reg_no);

    List<CustomDTO> getCarsByDate(CustomDTO dto);

    List<CarDTO> sortCarsByNoOfPassengers(int noOfPassengers);

    List<CarDTO> sortCarsByTransmissionType(String type);

    CarDTO saveCar(CarDTO dto);

    CarDTO updateCar(CarDTO dto);

    void updateCarStatus(CarDTO dto);

    void deleteCar(String reg_no);
}
