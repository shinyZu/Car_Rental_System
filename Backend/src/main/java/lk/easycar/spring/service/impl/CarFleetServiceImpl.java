package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.dto.CarFleetDTO;
import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.entity.Car;
import lk.easycar.spring.entity.CarFleet;
import lk.easycar.spring.entity.Customer;
import lk.easycar.spring.repo.CarFleetRepo;
import lk.easycar.spring.service.CarFleetService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CarFleetServiceImpl implements CarFleetService {

    @Autowired
    private CarFleetRepo carFleetRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<CarFleetDTO> getAllFleets() {
        return mapper.map(carFleetRepo.findAll(), new TypeToken<List<CarFleetDTO>>() {
        }.getType());
    }

    @Override
    public CarFleetDTO searchCarFleet(String fleet_id) {
        if (carFleetRepo.existsById(fleet_id)) {
            return mapper.map(carFleetRepo.findById(fleet_id), CarFleetDTO.class);
        } else {
            throw new RuntimeException("No Any Car Fleet with with ID " + fleet_id);
        }
    }

    @Override
    public CarFleetDTO saveCarFleet(CarFleetDTO dto) {
        if (!carFleetRepo.existsById(dto.getFleet_id())) {
            return mapper.map(carFleetRepo.save(mapper.map(dto, CarFleet.class)), CarFleetDTO.class);
        } else {
            throw new RuntimeException("Car Fleet "+ dto.getDescription() +" Already Exists...");
        }
    }

    @Override
    public CarFleetDTO updateCarFleet(CarFleetDTO dto) {
        if (carFleetRepo.existsById(dto.getFleet_id())) {
            return mapper.map(carFleetRepo.save(mapper.map(dto, CarFleet.class)),CarFleetDTO.class);
        } else {
            throw new RuntimeException("No Such Car Fleet..Please check the Fleet ID...");
        }
    }

    @Override
    public void deleteCarFleet(String fleet_id) {
        if (carFleetRepo.existsById(fleet_id)) {
            carFleetRepo.deleteById(fleet_id);
        } else {
            throw new RuntimeException("No Such Car Fleet..Please check the Fleet ID...");
        }
    }

}
