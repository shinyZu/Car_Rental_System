package lk.easycar.spring.repo;

import lk.easycar.spring.dto.Custom;
import lk.easycar.spring.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface CarRepo extends JpaRepository<Car, String> {

    int countCarsByCurrentStatus(String status);

    @Query(value = "select r.rental_id, cr.reg_no, cr.currentStatus, d.license_no, c.contact_no, r.pickUp_date, r.pickUp_time, r.pickUp_venue, r.return_date, r.return_time, r.return_venue, r.requestStatus " +
            "from Customer c inner join RentalRequest r on c.nic_no = r.customer_nic " +
            "inner join RentalDetail rd on rd.rental_id = r.rental_id " +
            "inner join Car cr on rd.reg_no = cr.reg_no " +
            "inner join Driver d on rd.driver_licenseNo = d.license_no " +
            "where cr.reg_no = ?1", nativeQuery = true)
    List<Custom> getCarSchedule(String reg_no);

    @Query(value = "select r.rental_id, cr.reg_no, cr.currentStatus, d.license_no, c.contact_no, r.pickUp_date, r.pickUp_time, r.pickUp_venue, r.return_date, r.return_time, r.return_venue, r.requestStatus " +
            "from Customer c inner join RentalRequest r on c.nic_no = r.customer_nic " +
            "inner join RentalDetail rd on rd.rental_id = r.rental_id " +
            "inner join Car cr on rd.reg_no = cr.reg_no " +
            "inner join Driver d on rd.driver_licenseNo = d.license_no " +
            "where r.pickUp_date = ?1 and r.requestStatus=?2", nativeQuery = true)
    List<Custom> getCarsByDate(LocalDate date, String status);

    List<Car> getCarsByNoOfPassengersEquals(int count);

    List<Car> getCarsByTransmissionTypeEquals(String type);

    @Query(value = "select c from Car c where c.brand like '%:brand%'"/*, nativeQuery=true*/)
    List<Car> getCarsByBrand(@Param("brand") String brand);

    @Query(value = "select * from Car c where fleet_id =?1", nativeQuery=true)
    List<Car> getCarsByFleet(String fleet_id);

}
