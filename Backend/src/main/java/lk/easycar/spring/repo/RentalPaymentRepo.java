package lk.easycar.spring.repo;

import lk.easycar.spring.entity.RentalPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalPaymentRepo extends JpaRepository<RentalPayment,String> {
}
