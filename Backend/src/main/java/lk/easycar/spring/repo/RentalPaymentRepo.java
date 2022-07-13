package lk.easycar.spring.repo;

import lk.easycar.spring.entity.RentalPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RentalPaymentRepo extends JpaRepository<RentalPayment,String> {

//    List<RentalPayment> findByOrderByFee_idDesc(String fee_id);

    @Query(value = "select rp.fee_id from RentalPayment rp order by rp.fee_id desc LIMIT 1", nativeQuery=true)
    String getLastPaymentID();
}
