package lk.easycar.spring.repo;

import lk.easycar.spring.config.JPAConfig;
import lk.easycar.spring.dto.Custom;
import lk.easycar.spring.dto.CustomDTO;
import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.entity.Driver;
import lk.easycar.spring.entity.RentalRequest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@WebAppConfiguration
@ContextConfiguration(classes = {JPAConfig.class})
@ExtendWith(SpringExtension.class)
@Transactional
class DriverRepoTest {

    @Autowired
    DriverRepo driverRepo;

//    @Autowired
//    ModelMapper mapper;

    @Test
    void getAllAvailableDrivers() {
        List<Driver> availableDrivers = driverRepo.getAllAvailableDrivers("Available");
        for (Driver availableDriver : availableDrivers) {
            System.out.println(availableDriver);
        }
    }

    @Test
    void updateDriverStatus() {
        driverRepo.updateDriverStatus("DL-1000001", "Available");
        getAllAvailableDrivers();
    }

    /*@Test
    void getNoOfAvailableDrivers() {
        int noOfAvailableDrivers = driverRepo.getNoOfAvailableDrivers("Available");
        System.out.println(noOfAvailableDrivers);
    }*/

    @Test
    void countDriversByCurrentStatus() {
        int occupied = driverRepo.countDriversByCurrentStatus("sss");
        System.out.println(occupied);
    }




    @Test
    void getWorkSchedule() {
        List<Custom> list = driverRepo.getWorkSchedule("DL-1000001");
        for (Custom workSchedule : list) {
            System.out.println(workSchedule.getRental_id());
            System.out.println(workSchedule.getLicense_no());
            System.out.println(workSchedule.getCurrentStatus());
            System.out.println(workSchedule.getContact_no());
            System.out.println(workSchedule.getPickUp_date());
            System.out.println(workSchedule.getPickUp_time());
            System.out.println(workSchedule.getPickUp_venue());
            System.out.println(workSchedule.getReturn_date());
            System.out.println(workSchedule.getReturn_time());
            System.out.println(workSchedule.getReturn_venue());
            System.out.println(workSchedule.getRequestStatus());
        }
        /*System.out.println(workSchedule.getRental_id());
        System.out.println(workSchedule.getLicense_no());;
        System.out.println(workSchedule.getCurrentStatus());;
        System.out.println(workSchedule.getContact_no());;
        System.out.println(workSchedule.getPickUp_date());;
        System.out.println(workSchedule.getPickUp_time());
        System.out.println(workSchedule.getPickUp_venue());;
        System.out.println(workSchedule.getReturn_date());;
        System.out.println(workSchedule.getReturn_time());;
        System.out.println(workSchedule.getReturn_venue());;
        System.out.println(workSchedule.getRequestStatus());;*/
    }

    @Test
    void getWorkScheduleByDuration() {
        List<Custom> list = driverRepo.getWorkScheduleByDuration(LocalDate.parse("2022-07-08"), LocalDate.parse("2022-07-18"));
        for (Custom workSchedule : list) {
            System.out.println(workSchedule.getRental_id());
            System.out.println(workSchedule.getLicense_no());
            System.out.println(workSchedule.getCurrentStatus());
            System.out.println(workSchedule.getContact_no());
            System.out.println(workSchedule.getPickUp_date());
            System.out.println(workSchedule.getPickUp_time());
            System.out.println(workSchedule.getPickUp_venue());
            System.out.println(workSchedule.getReturn_date());
            System.out.println(workSchedule.getReturn_time());
            System.out.println(workSchedule.getReturn_venue());
            System.out.println(workSchedule.getRequestStatus());
        }
    }
}