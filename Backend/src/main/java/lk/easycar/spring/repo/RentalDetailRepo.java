package lk.easycar.spring.repo;

import lk.easycar.spring.entity.RentalCar_PK;
import lk.easycar.spring.entity.RentalDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RentalDetailRepo extends JpaRepository<RentalDetail, RentalCar_PK> {
}
