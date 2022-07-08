package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.dto.DriverDTO;
import lk.easycar.spring.entity.Customer;
import lk.easycar.spring.entity.Driver;
import lk.easycar.spring.repo.DriverRepo;
import lk.easycar.spring.service.DriverService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DriverServiceImpl implements DriverService {

    @Autowired
    DriverRepo driverRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public List<DriverDTO> getAllDrivers() {
        return mapper.map(driverRepo.findAll(), new TypeToken<List<DriverDTO>>(){}.getType());
    }

    @Override
    public DriverDTO searchDriver(String license_no) {
        if (driverRepo.existsById(license_no)) {
            return mapper.map(driverRepo.findById(license_no), DriverDTO.class);
        } else {
            throw new RuntimeException("No Driver with NIC " + license_no);
        }
    }

    @Override
    public DriverDTO saveDriver(DriverDTO dto) {
        if (!driverRepo.existsById(dto.getNic_no())) {
            return mapper.map(driverRepo.save(mapper.map(dto, Driver.class)),DriverDTO.class);
        } else {
            throw new RuntimeException("Driver Already Exists...");
        }
    }

    @Override
    public DriverDTO updateDriver(DriverDTO dto) {
        if (driverRepo.existsById(dto.getLicense_no())) {
            return mapper.map(driverRepo.save(mapper.map(dto, Driver.class)),DriverDTO.class);
        } else {
            throw new RuntimeException("No Such Driver..Please check the License No...");
        }
    }

    @Override
    public void deleteDriver(String license_no) {
        if (driverRepo.existsById(license_no)) {
            driverRepo.deleteById(license_no);
        } else {
            throw new RuntimeException("No Such Driver..Please check the License No...");
        }
    }
}
