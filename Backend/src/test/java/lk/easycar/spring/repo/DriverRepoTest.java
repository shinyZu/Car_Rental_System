package lk.easycar.spring.repo;

import lk.easycar.spring.config.JPAConfig;
import lk.easycar.spring.entity.Driver;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@WebAppConfiguration
@ContextConfiguration(classes = {JPAConfig.class})
@ExtendWith(SpringExtension.class)
class DriverRepoTest {

    @Autowired
    DriverRepo driverRepo;

    @Test
    void getAllAvailableDrivers() {

        List<Driver> availableDrivers = driverRepo.getAllAvailableDrivers("Available");
        System.out.println(availableDrivers.get(0).toString());
        System.out.println(availableDrivers.get(1).toString());
//        System.out.println(availableDrivers.get(0).getLicense_no());
//        System.out.println(availableDrivers.get(0).getCurrentStatus());
    }
}