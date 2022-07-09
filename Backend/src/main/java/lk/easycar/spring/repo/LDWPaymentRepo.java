package lk.easycar.spring.repo;

import lk.easycar.spring.entity.LDWPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LDWPaymentRepo extends JpaRepository<LDWPayment, String> {
}
