package lk.easycar.spring.repo;

import lk.easycar.spring.entity.RentalRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RentalRequestRepo extends JpaRepository<RentalRequest, String> {

    @Query(value = "select r from RentalRequest r")
    List<RentalRequest> getAllRequests();

    @Query(value = "select r.rental_id, r.pickUp_date, r.return_date from RentalRequest r where r.rental_id=?1")
    RentalRequest getRentalDuration(String rental_id);

    @Query(value = "select r.requestStatus from RentalRequest r where r.rental_id=?1")
    String getRequestStatusByRental_id(String rental_id);
}
