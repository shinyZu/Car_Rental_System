package lk.easycar.spring.repo;

import lk.easycar.spring.dto.Custom;
import lk.easycar.spring.entity.RentalRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

public interface RentalRequestRepo extends JpaRepository<RentalRequest, String> {

    @Query(value = "select r from RentalRequest r")
    List<RentalRequest> getAllRequests();

//    @Query(value = "select r.rental_id, r.pickUp_date, r.return_date from RentalRequest r where r.rental_id=?1")
//    RentalRequest getRentalDuration(String rental_id);

    @Query(value = "select r.requestStatus from RentalRequest r where r.rental_id=?1")
    String getRequestStatusByRental_id(String rental_id);

    @Modifying
    @Query(value = "update RentalRequest r set r.requestStatus=?2 where r.rental_id=?1")
    void updateRequestStatus(String rental_id, String requestStatus);

//    @Query(value="select count(r.rental_id) from RentalRequest r where r.pickUp_date=?2 or r.requestStatus=?1")
//    int countActiveRentalsForTheDay(String status, LocalDate date);

    // Includes the rentals that were activated today & also that were activated before & still active/ongoing
//    @Query(value = "select count(r.rental_id) from RentalRequest r where r.requestStatus=?1 and r.pickUp_date <=?2")
    @Query(value = "select count(r.rental_id) from RentalRequest r where (r.pickUp_date <= ?2 or r.return_date <= ?2) and r.requestStatus =?1", nativeQuery = true)
    int countActiveRentalsForTheDay(String status, LocalDate date);

//    @Query(value = "select count(r.rental_id) from RentalRequest r where r.pickUp_date=?1")
    @Query(value = "select count(r.rental_id) from RentalRequest r where (r.pickUp_date=?1 or r.return_date=?1) and r.requestStatus in (\"Accepted\",\"Active\")", nativeQuery = true)
    int countTotalRentalsForTheDay(LocalDate date);

//    @Query(value="select r from RentalRequest r inner join RentalDetail rd on r.rental_id = rd.rental_id where r.requestStatus=?2 and rd.reg_no=?1")
//    @Query(value="select * from RentalRequest r inner join RentalDetail rd on r.rental_id=rd.rental_id where rd.reg_no=?1 and r.requestStatus=?2", nativeQuery=true)
//    RentalRequest getRentalByRegNoAndRequestStatus(String reg_no, String requestStatus);

    @Query(value = "select r from RentalRequest r inner join Customer c on r.customer = c.nic_no where c.nic_no=?1 and r.requestStatus=?2"/*,nativeQuery=true*/)
    RentalRequest getRentalRequestByCustomer(String nic_no, String status);

    @Query(value = "select (r.return_date- r.pickUp_date) from RentalRequest r where r.rental_id=?1", nativeQuery = true)
    String getRentalDuration(String rental_id);

    @Query(value = "select count(r.rental_id) from RentalRequest r where r.customer_nic=?1 and r.requestStatus=?2", nativeQuery = true)
    int getCountOfActiveRentalsByCustomer(String nic_no, String status);

    @Query(value="select * from RentalRequest r where r.return_date=?1",  nativeQuery = true)
    List<RentalRequest> getAllPaymentsByDate(LocalDate date);

    @Query(value="SELECT DAYNAME(return_date) AS Day ,\n" +
            "CAST((((day(return_date)-1) / 7) + 1) as Integer) AS Week,\n" +
            "MONTHNAME(return_date) AS Month,\n" +
            "YEAR(return_date) AS Year,\n" +
            "SUM(r.totalPaymentForRental) as Income\n" +
            "FROM RentalRequest r " +
            "WHERE r.return_date=?1\n" +
            "GROUP BY Week",  nativeQuery = true)
    List<Custom> calculateDailyIncome(LocalDate date);

    @Query(value="SELECT CAST((((day(return_date)-1) / 7) + 1) as Integer) AS Week,\n" +
            "MONTHNAME(return_date) AS Month,\n" +
            "YEAR(return_date) AS Year,\n" +
            "SUM(r.totalPaymentForRental) as Income\n" +
            "FROM RentalRequest r",  nativeQuery = true)
    List<Custom> calculateWeeklyIncome();

    @Query(value="SELECT MONTHNAME(return_date) AS Month,\n" +
            "YEAR(return_date) AS Year,\n" +
            "SUM(totalPaymentForRental) AS Income\n" +
            "FROM RentalRequest r\n" +
            "GROUP BY MONTHNAME(return_date)",  nativeQuery = true)
    List<Custom> calculateMonthlyIncome();

    @Query(value="SELECT YEAR(return_date) AS Year,\n" +
            "SUM(r.totalPaymentForRental) as Income\n" +
            "FROM RentalRequest r\n" +
            "GROUP BY YEAR(return_date)",  nativeQuery = true)
    List<Custom> calculateAnnualIncome();

    @Query(value="select * from RentalRequest r where month(r.return_date)=?1",  nativeQuery = true)
    List<RentalRequest> getAllPaymentsByMonth(int month);

    @Query(value="select * from RentalRequest r where r.return_date between ?1 and ?2",  nativeQuery = true)
    List<RentalRequest> getAllPaymentsForWeek(LocalDate date1, LocalDate date2);

    @Query(value="select * from RentalRequest r where year(r.return_date)= ?1",  nativeQuery = true)
    List<RentalRequest> getAllPaymentsForYear(int year);

    @Query(value = "select r.rental_id from RentalRequest r order by r.rental_id desc LIMIT 1", nativeQuery=true)
    String getLastID();

    @Query(value = "select r.rental_id, c.reg_no, cu.nic_no, r.requestStatus, \n" +
            "r.pickUp_date,r.pickUp_time,r.pickUp_venue,\n" +
            "r.return_date,r.return_time,r.return_venue, \n" +
            "d.license_no,\n" +
            "rd.km_atPickUp, rd.km_atReturn, \n" +
            "r.totalPaymentForRental\n" +
            "from RentalRequest r inner join RentalDetail rd\n" +
            "on r.rental_id = rd.rental_id\n" +
            "inner join Driver d\n" +
            "on rd.driver_licenseNo = d.license_no\n" +
            "inner join Car c\n" +
            "on rd.reg_no = c.reg_no\n" +
            "inner join Customer cu \n" +
            "on r.customer_nic = cu.nic_no", nativeQuery=true)
    List<Custom> getAllRentalsRequests();

    @Query(value = "select r.rental_id, c.reg_no, cu.nic_no, d.license_no, rd.km_atPickUp\n" +
            "from RentalRequest r inner join RentalDetail rd\n" +
            "on r.rental_id = rd.rental_id\n" +
            "inner join Driver d\n" +
            "on rd.driver_licenseNo = d.license_no\n" +
            "inner join Car c\n" +
            "on rd.reg_no = c.reg_no\n" +
            "inner join Customer cu \n" +
            "on r.customer_nic = cu.nic_no\n" +
            "where r.requestStatus =?1", nativeQuery=true)
    List<Custom> getAllReturns(String status);

    @Query(value = "select r.rental_id, c.reg_no, cu.nic_no, \n" +
            "r.pickUp_date,r.pickUp_time,r.pickUp_venue,\n" +
            "r.return_date,r.return_time,r.return_venue, \n" +
            "rd.driverStatus,d.license_no, \n" +
            "rd.km_atPickUp, ldw.fee\n" +
            "from RentalRequest r inner join RentalDetail rd\n" +
            "on r.rental_id = rd.rental_id\n" +
            "inner join Driver d\n" +
            "on rd.driver_licenseNo = d.license_no\n" +
            "inner join Car c\n" +
            "on rd.reg_no = c.reg_no\n" +
            "inner join Customer cu \n" +
            "on r.customer_nic = cu.nic_no\n" +
            "inner join CarFleet cf\n" +
            "on c.fleet_id = cf.fleet_id\n" +
            "inner join LDWPayment ldw\n" +
            "on cf.fleet_id = ldw.fleet_id\n" +
            "where c.reg_no = ?2 and r.rental_id = ?1", nativeQuery=true)
    List<Custom> searchRentalByIDAndRegNo(String rental_id, String reg_no);

    @Query(value = "select r.rental_id, c.reg_no, c.brand,\n" +
            "r.pickUp_date,r.pickUp_time,r.pickUp_venue,\n" +
            "r.return_date,r.return_time,r.return_venue,\n" +
            "r.requestStatus, \n" +
            "rd.driverStatus,d.contact_no, r.totalPaymentForRental\n" +
            "from RentalRequest r inner join RentalDetail rd\n" +
            "on r.rental_id = rd.rental_id\n" +
            "inner join Driver d\n" +
            "on rd.driver_licenseNo = d.license_no\n" +
            "inner join Car c\n" +
            "on rd.reg_no = c.reg_no\n" +
            "inner join Customer cu \n" +
            "on r.customer_nic = cu.nic_no\n" +
            "where cu.nic_no = ?1", nativeQuery=true)
    List<Custom> getCustomerBookings(String nic_no);


}
