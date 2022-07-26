package lk.easycar.spring.repo;

import com.sun.org.apache.xalan.internal.xsltc.trax.XSLTCSource;
import lk.easycar.spring.config.JPAConfig;
import lk.easycar.spring.entity.CarFleet;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.web.WebAppConfiguration;

import static org.junit.jupiter.api.Assertions.*;

@WebAppConfiguration
@ContextConfiguration(classes = {JPAConfig.class})
@ExtendWith(SpringExtension.class)
class CarFleetRepoTest {

    @Autowired
    CarFleetRepo carFleetRepo;

    @Test
    void getCarFleetByDescription() {
        String fleet = carFleetRepo.getCarFleetByDescription("Geneasral");
        System.out.println(fleet);
    }
}