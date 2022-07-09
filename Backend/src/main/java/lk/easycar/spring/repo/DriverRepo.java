package lk.easycar.spring.repo;

import lk.easycar.spring.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DriverRepo extends JpaRepository<Driver, String> {

    @Query(value = "select d from Driver d where d.currentStatus=?1")
    List<Driver> getAllAvailableDrivers(String currentStatus);
}
