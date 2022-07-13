package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.Custom;
import lk.easycar.spring.dto.CustomDTO;
import lk.easycar.spring.dto.DriverDTO;
import lk.easycar.spring.entity.Driver;
import lk.easycar.spring.entity.Login;
import lk.easycar.spring.repo.DriverRepo;
import lk.easycar.spring.repo.LoginRepo;
import lk.easycar.spring.service.DriverService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class DriverServiceImpl implements DriverService {

    @Autowired
    DriverRepo driverRepo;

    @Autowired
    ModelMapper mapper;

    @Autowired
    private LoginRepo loginRepo;

    @Override
    public List<DriverDTO> getAllDrivers() {
        return mapper.map(driverRepo.findAll(), new TypeToken<List<DriverDTO>>() {
        }.getType());
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
    public int getNoOfDriversByStatus(String status) {
        return (int) driverRepo.countDriversByCurrentStatus(status);
    }

    @Override
    public List<CustomDTO> getWorkSchedule(String license_no) {
        ArrayList<CustomDTO> schedule = new ArrayList<>();
        for (Custom custom : driverRepo.getWorkSchedule(license_no)) {
            schedule.add(new CustomDTO(
                    custom.getRental_id(),
                    custom.getLicense_no(),
                    custom.getCurrentStatus(),
                    custom.getContact_no(),
                    custom.getReg_no(),
                    custom.getPickUp_date(),
                    custom.getPickUp_time(),
                    custom.getPickUp_venue(),
                    custom.getReturn_date(),
                    custom.getReturn_time(),
                    custom.getReturn_venue(),
                    custom.getRequestStatus()
            ));
        }
        return schedule;
    }

    @Override
    public List<CustomDTO> getWorkScheduleByDuration(CustomDTO dto) {
        ArrayList<CustomDTO> schedule = new ArrayList<>();
        for (Custom custom : driverRepo.getWorkScheduleByDuration(dto.getPickUp_date(),dto.getReturn_date())) {
            schedule.add(new CustomDTO(
                    custom.getRental_id(),
                    custom.getLicense_no(),
                    custom.getCurrentStatus(),
                    custom.getContact_no(),
                    custom.getReg_no(),
                    custom.getPickUp_date(),
                    custom.getPickUp_time(),
                    custom.getPickUp_venue(),
                    custom.getReturn_date(),
                    custom.getReturn_time(),
                    custom.getReturn_venue(),
                    custom.getRequestStatus()
            ));
        }
        return schedule;
    }

    @Override
    public DriverDTO saveDriver(DriverDTO dto) {
        if (!driverRepo.existsById(dto.getNic_no())) {
            int count = loginRepo.searchForAnyDuplicateEmail(dto.getEmail());

            if (count == 0) { // if there is no any users with the same email/ if no any duplicate emails
                loginRepo.save(new Login(dto.getEmail(), dto.getPassword(), "Driver"));
                return mapper.map(driverRepo.save(mapper.map(dto, Driver.class)), DriverDTO.class);
            } else {
                throw new RuntimeException("A User with email " + dto.getEmail() + " already exists...");
            }
        } else {
            throw new RuntimeException("Driver Already Exists...");
        }
    }

    @Override
    public DriverDTO updateDriver(DriverDTO dto) {
        /*if (driverRepo.existsById(dto.getLicense_no())) {
            return mapper.map(driverRepo.save(mapper.map(dto, Driver.class)),DriverDTO.class);
        } else {
            throw new RuntimeException("No Such Driver..Please check the License No...");
        }*/

        if (driverRepo.existsById(dto.getLicense_no())) {

            if (dto.getEmail().equals(driverRepo.getReferenceById(dto.getLicense_no()).getEmail())) { // if Drivers are NOT changing their email
                return mapper.map(driverRepo.save(mapper.map(dto, Driver.class)), DriverDTO.class);

            } else { // if Drivers are gonna change their email
                int count = loginRepo.searchForAnyDuplicateEmail(dto.getEmail());

                if (count == 0) { // if there is no any users with the same email/ if no any duplicate emails
                    loginRepo.deleteById(driverRepo.getReferenceById(dto.getLicense_no()).getEmail());
                    loginRepo.save(new Login(dto.getEmail(), dto.getPassword(), "Driver"));
                    return mapper.map(driverRepo.save(mapper.map(dto, Driver.class)), DriverDTO.class);

                } else {
                    throw new RuntimeException("A User with email " + dto.getEmail() + " already exists...");
                }
            }
        } else {
            throw new RuntimeException("No Such Driver..Please check the License No...");
        }
    }

    @Override
    public void deleteDriver(String license_no) {
        if (driverRepo.existsById(license_no)) {
            loginRepo.deleteById(driverRepo.getReferenceById(license_no).getEmail());
            driverRepo.deleteById(license_no);
        } else {
            throw new RuntimeException("No Such Driver..Please check the License No...");
        }
    }
}
