package lk.easycar.spring.repo;

import lk.easycar.spring.entity.Driver;
import lk.easycar.spring.entity.RentalCar_PK;
import lk.easycar.spring.entity.RentalDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RentalDetailRepo extends JpaRepository<RentalDetail, RentalCar_PK> {

    @Query(value = "select rd from RentalDetail rd where rd.rental_id=?1")
    List<RentalDetail> getAllRentalDetailsByRental_id(String rental_id);

    @Query(value = "select rd from RentalDetail rd where rd.rental_id=?1 and rd.reg_no=?2")
    RentalDetail getRentalDetailByRental_idAndReg_no(String rental_id, String reg_no);

    @Modifying
    @Query(value = "update RentalDetail rd set rd.driver=?3 where rd.rental_id=?1 and rd.reg_no=?2")
    void changeAssignedDriver(String rental_id, String reg_no, Driver driver);

//    @Transactional
//    @Modifying
//    @Query(value = "update RentalDetail rd set rd.driver =:driver where rd.rental_id=:rental_id and rd.reg_no=:reg_no",nativeQuery=true)
//    void changeAssignedDriver(@Param("rental_id") String rental_id, @Param("reg_no") String reg_no, @Param("driver") Driver driver);

    @Modifying
    @Query(value = "update RentalDetail rd set rd.feeDeductedFromLDW=?3, rd.km_atReturn=?4, rd.km_travelled=?5 where rd.rental_id=?1 and rd.reg_no=?2")
    int updateDetailsAfterReturn(String rental_id, String reg_no, double feeDeductedFromLDW, double km_atReturn, double km_travelled);

    @Query(value="select rd.rental_id from RentalRequest r inner join RentalDetail rd on r.rental_id=rd.rental_id where rd.reg_no=?1 and r.requestStatus=?2",nativeQuery=true)
    String getRental_idOfActiveReg_no(String reg_no, String requestStatus);

    @Query(value = "select km_atReturn \n" +
            "from RentalDetail\n" +
            "where reg_no= ?1\n" +
            "order by rental_id DESC LIMIT 1;",nativeQuery=true)
    String getMileage(String reg_no);
}
