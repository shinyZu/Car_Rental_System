package lk.easycar.spring.repo;

import lk.easycar.spring.config.JPAConfig;
import lk.easycar.spring.dto.Custom;
import lk.easycar.spring.entity.Car;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@WebAppConfiguration
@ContextConfiguration(classes = {JPAConfig.class})
@ExtendWith(SpringExtension.class)
@Transactional
class CarRepoTest {

    @Autowired
    CarRepo carRepo;

    @Test
    void countCarsByCurrentStatus() {
        int count = carRepo.countCarsByCurrentStatus("Reserved");
        System.out.println(count);
    }

    @Test
    void getCarSchedule() {
        List<Custom> list = carRepo.getCarSchedule("PB-5951");
        for (Custom workSchedule : list) {
            System.out.println(workSchedule.getRental_id());
            System.out.println(workSchedule.getLicense_no());
            System.out.println(workSchedule.getCurrentStatus());
            System.out.println(workSchedule.getContact_no());
            System.out.println(workSchedule.getReg_no());
            System.out.println(workSchedule.getPickUp_date());
            System.out.println(workSchedule.getPickUp_time());
            System.out.println(workSchedule.getPickUp_venue());
            System.out.println(workSchedule.getReturn_date());
            System.out.println(workSchedule.getReturn_time());
            System.out.println(workSchedule.getReturn_venue());
            System.out.println(workSchedule.getRequestStatus());
        }
    }

    @Test
    void getCarsByDate() {
        List<Custom> list = carRepo.getCarsByDate(LocalDate.parse("2022-07-10"), "Available");
        for (Custom workSchedule : list) {
            System.out.println(workSchedule.getRental_id());
            System.out.println(workSchedule.getLicense_no());
            System.out.println(workSchedule.getCurrentStatus());
            System.out.println(workSchedule.getContact_no());
            System.out.println(workSchedule.getReg_no());
            System.out.println(workSchedule.getPickUp_date());
            System.out.println(workSchedule.getPickUp_time());
            System.out.println(workSchedule.getPickUp_venue());
            System.out.println(workSchedule.getReturn_date());
            System.out.println(workSchedule.getReturn_time());
            System.out.println(workSchedule.getReturn_venue());
            System.out.println(workSchedule.getRequestStatus());
        }
    }

    @Test
    void getCarsByNoOfPassengersEquals() {
        List<Car> carList = carRepo.getCarsByNoOfPassengersEquals(4);
        for (Car car : carList) {
            System.out.println(car.getReg_no());
            System.out.println(car.getNoOfPassengers());
        }
    }

    @Test
    void getCarsByTransmissionTypeEquals() {
        List<Car> manual = carRepo.getCarsByTransmissionTypeEquals("Auto");
        for (Car car : manual) {
            System.out.println(car.getTransmissionType());
        }
    }
}