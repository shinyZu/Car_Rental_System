package lk.easycar.spring.repo;

import lk.easycar.spring.entity.CarFleet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CarFleetRepo extends JpaRepository<CarFleet, String> {

    @Query(value = "select c.fleet_id from CarFleet c order by c.fleet_id desc LIMIT 1", nativeQuery=true)
    String getLastID();

    @Query(value = "select c.fleet_id from CarFleet c where c.description =?1", nativeQuery=true)
    String getCarFleetByDescription (String description);
}
