package lk.easycar.spring.repo;

import lk.easycar.spring.dto.RentalDetailDTO;
import lk.easycar.spring.entity.Driver;
import lk.easycar.spring.entity.RentalCar_PK;
import lk.easycar.spring.entity.RentalDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RentalDetailRepo extends JpaRepository<RentalDetail, RentalCar_PK> {

    @Query(value = "select rd from RentalDetail rd where rd.rental_id=?1 and rd.reg_no=?2")
    RentalDetail getRentalDetail(String rental_id, String reg_no);

    @Modifying
    @Query(value = "update RentalDetail rd set rd.driver=?3 where rd.rental_id=?1 and rd.reg_no=?2")
    void changeAssignedDriver(String rental_id, String reg_no, Driver driver);

//    @Transactional
//    @Modifying
//    @Query(value = "update RentalDetail rd set rd.driver =:driver where rd.rental_id=:rental_id and rd.reg_no=:reg_no",nativeQuery=true)
//    void changeAssignedDriver(@Param("rental_id") String rental_id, @Param("reg_no") String reg_no, @Param("driver") Driver driver);

}
