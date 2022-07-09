package lk.easycar.spring.repo;

import lk.easycar.spring.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DriverRepo extends JpaRepository<Driver, String> {

    @Query(value = "select d from Driver d where d.currentStatus=?1")
    List<Driver> getAllAvailableDrivers(String currentStatus);

    @Modifying
    @Query(value = "update Driver d set d.currentStatus=?2 where d.license_no=?1")
    void updateDriverStatus(String currentlyAssignedDriver, String status);
}
