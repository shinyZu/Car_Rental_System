package lk.easycar.spring.repo;

import lk.easycar.spring.dto.Custom;
import lk.easycar.spring.dto.CustomDTO;
import lk.easycar.spring.entity.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
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

    @Query(value = "select r.rental_id,  cr.reg_no, d.license_no, d.currentStatus, c.contact_no, r.pickUp_date, r.pickUp_time, r.pickUp_venue, r.return_date, r.return_time, r.return_venue, r.requestStatus " +
            "from Customer c inner join RentalRequest r on c.nic_no = r.customer_nic " +
            "inner join RentalDetail rd on rd.rental_id = r.rental_id " +
            "inner join Car cr on rd.reg_no = cr.reg_no " +
            "inner join Driver d on rd.driver_licenseNo = d.license_no " +
            "where d.license_no=?1", nativeQuery = true)
    List<Custom> getWorkSchedule(String license_no);

    @Query(value = "select r.rental_id, cr.reg_no, d.license_no, d.currentStatus, c.contact_no, r.pickUp_date, r.pickUp_time, r.pickUp_venue, r.return_date, r.return_time, r.return_venue, r.requestStatus " +
            "from Customer c inner join RentalRequest r on c.nic_no = r.customer_nic " +
            "inner join RentalDetail rd on rd.rental_id = r.rental_id " +
            "inner join Car cr on rd.reg_no = cr.reg_no " +
            "inner join Driver d on rd.driver_licenseNo = d.license_no " +
            "where r.pickUp_date between ?1 and ?2", nativeQuery = true)
    List<Custom> getWorkScheduleByDuration(LocalDate date1, LocalDate date2);

    @Query(value="select count(d.contact_no) from Driver d where d.contact_no=?1",nativeQuery=true)
    int searchForAnyDuplicateContact(String contact_no);
}
