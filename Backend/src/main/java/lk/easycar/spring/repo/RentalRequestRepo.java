package lk.easycar.spring.repo;

import lk.easycar.spring.dto.RentalRequestDTO;
import lk.easycar.spring.entity.RentalRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface RentalRequestRepo extends JpaRepository<RentalRequest, String> {

    @Query(value = "select r from RentalRequest r")
    List<RentalRequest> getAllRequests();

    @Query(value = "select r.rental_id, r.pickUp_date, r.return_date from RentalRequest r where r.rental_id=?1")
    RentalRequest getRentalDuration(String rental_id);

    @Query(value = "select r.requestStatus from RentalRequest r where r.rental_id=?1")
    String getRequestStatusByRental_id(String rental_id);

    @Modifying
    @Query(value = "update RentalRequest r set r.requestStatus=?2 where r.rental_id=?1")
    void updateRequestStatus(String rental_id, String requestStatus);

//    @Query(value="select count(r.rental_id) from RentalRequest r where r.pickUp_date=?2 or r.requestStatus=?1")
//    int countActiveRentalsForTheDay(String status, LocalDate date);

    // Includes the rentals that were activated today & also that were activated before & still active/ongoing
    @Query(value = "select count(r.rental_id) from RentalRequest r where r.requestStatus=?1 and r.pickUp_date <=?2")
    int countActiveRentalsForTheDay(String status, LocalDate date);

    @Query(value = "select count(r.rental_id) from RentalRequest r where r.pickUp_date=?1")
    int countTotalRentalsForTheDay(LocalDate date);

//    @Query(value="select r from RentalRequest r inner join RentalDetail rd on r.rental_id = rd.rental_id where r.requestStatus=?2 and rd.reg_no=?1")
//    @Query(value="select * from RentalRequest r inner join RentalDetail rd on r.rental_id=rd.rental_id where rd.reg_no=?1 and r.requestStatus=?2", nativeQuery=true)
//    RentalRequest getRentalByRegNoAndRequestStatus(String reg_no, String requestStatus);

    @Query(value = "select r from RentalRequest r inner join Customer c on r.customer = c.nic_no where c.nic_no=?1 and r.requestStatus=?2"/*,nativeQuery=true*/)
    RentalRequest getRentalRequestByCustomer(String nic_no, String status);
}
