package lk.easycar.spring.repo;

import lk.easycar.spring.config.JPAConfig;
import lk.easycar.spring.entity.Driver;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@WebAppConfiguration
@ContextConfiguration(classes = {JPAConfig.class})
@ExtendWith(SpringExtension.class)
@Transactional
class DriverRepoTest {

    @Autowired
    DriverRepo driverRepo;

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
}