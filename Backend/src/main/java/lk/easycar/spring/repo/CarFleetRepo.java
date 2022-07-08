package lk.easycar.spring.repo;

import lk.easycar.spring.entity.CarFleet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarFleetRepo extends JpaRepository<CarFleet, String> {
}
