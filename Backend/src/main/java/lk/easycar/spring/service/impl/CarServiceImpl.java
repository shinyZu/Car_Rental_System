package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.entity.Car;
import lk.easycar.spring.entity.Customer;
import lk.easycar.spring.repo.CarRepo;
import lk.easycar.spring.service.CarService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepo carRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<CarDTO> getAllCars() {
        return mapper.map(carRepo.findAll(), new TypeToken<List<CarDTO>>() {
        }.getType());
    }

    @Override
    public CarDTO searchCar(String reg_no) {
        if (carRepo.existsById(reg_no)) {
            return mapper.map(carRepo.findById(reg_no), CarDTO.class);
        } else {
            throw new RuntimeException("No Car with Reg_No " + reg_no);
        }
    }

    @Override
    public CarDTO saveCar(CarDTO dto) {
        if (!carRepo.existsById(dto.getReg_no())) {
            return mapper.map(carRepo.save(mapper.map(dto, Car.class)), CarDTO.class);
        } else {
            throw new RuntimeException("Car with Reg_No "+ dto.getReg_no() +" Already Exists...");
        }
    }

    @Override
    public CarDTO updateCar(CarDTO dto) {
        if (carRepo.existsById(dto.getReg_no())) {
            return mapper.map(carRepo.save(mapper.map(dto, Car.class)), CarDTO.class);
        } else {
            throw new RuntimeException("No Such Car..Please check the Reg_No...");
        }
    }

    @Override
    public void deleteCar(String reg_no) {
        if (carRepo.existsById(reg_no)) {
            carRepo.deleteById(reg_no);
        } else {
            throw new RuntimeException("No Such Car..Please check the Reg_No...");
        }
    }
}
