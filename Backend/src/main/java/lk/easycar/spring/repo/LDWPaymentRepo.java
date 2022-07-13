package lk.easycar.spring.repo;

import lk.easycar.spring.entity.CarFleet;
import lk.easycar.spring.entity.LDWPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LDWPaymentRepo extends JpaRepository<LDWPayment, String> {

    /* works fine
    @Query(value = "select ldw.fee from LDWPayment ldw where ldw.fleet=?1")
    double getLDWPaymentByFleet_id(CarFleet fleet);*/

    LDWPayment getLDWPaymentByFleet(CarFleet fleet);
}
