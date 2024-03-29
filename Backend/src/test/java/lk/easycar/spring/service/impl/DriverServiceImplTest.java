package lk.easycar.spring.service.impl;

import lk.easycar.spring.config.JPAConfig;
import lk.easycar.spring.service.DriverService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@WebAppConfiguration
@ContextConfiguration(classes = {JPAConfig.class})
@ExtendWith(SpringExtension.class)
@Transactional
class DriverServiceImplTest {

//    @Autowired
//    DriverService driverService;

    @Test
    void getAllDrivers() {
    }
}