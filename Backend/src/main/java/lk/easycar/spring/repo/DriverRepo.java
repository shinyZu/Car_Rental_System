package lk.easycar.spring.repo;

import lk.easycar.spring.dto.Custom;
import lk.easycar.spring.dto.CustomDTO;
import lk.easycar.spring.entity.Driver;
import lk.easycar.spring.entity.RentalRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.jws.WebParam;
import java.util.List;
public interface DriverRepo extends JpaRepository<Driver, String> {

    @Query(value = "select d from Driver d where d.currentStatus=?1")
    List<Driver> getAllAvailableDrivers(String currentStatus);

    @Modifying
    @Query(value = "update Driver d set d.currentStatus=?2 where d.license_no=?1")
    void updateDriverStatus(String currentlyAssignedDriver, String status);

    /*@Query(value = "select count(d.license_no) from Driver d where d.currentStatus=?1")
    int getNoOfAvailableDrivers(String available);*/

    int countDriversByCurrentStatus(String status);

    @Query(value = "select r.rental_id, c.contact_no, d.license_no, r.pickUp_date, r.pickUp_time, r.pickUp_venue, r.return_date, r.return_time, r.return_venue, r.requestStatus " +
            "from Driver d " +
            "inner join RentalDetail rd  on d.license_no = rd.driver " +
            "inner join RentalRequest r on r.rental_id = rd.rental_id " +
            "inner join Customer c on c.nic_no = r.customer " +
            "where d.license_no=?1")
    List<CustomDTO> getWorkSchedule(String license_no);




}
