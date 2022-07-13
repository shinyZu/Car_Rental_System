package lk.easycar.spring.repo;

import lk.easycar.spring.config.JPAConfig;
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
class CarRepoTest {

    @Autowired
    CarRepo carRepo;

    @Test
    void countCarsByCurrentStatus() {
        int count = carRepo.countCarsByCurrentStatus("Reserved");
        System.out.println(count);
    }
}