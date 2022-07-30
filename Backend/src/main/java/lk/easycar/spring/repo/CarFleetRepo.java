package lk.easycar.spring.repo;

import lk.easycar.spring.entity.CarFleet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CarFleetRepo extends JpaRepository<CarFleet, String> {

    @Query(value = "select c.fleet_id from CarFleet c order by c.fleet_id desc LIMIT 1", nativeQuery=true)
    String getLastID();

    @Query(value = "select c.fleet_id from CarFleet c where c.description =?1", nativeQuery=true)
    String getCarFleetByDescription (String description);

    @Query(value = "select ldw.fee\n" +
            "from Car c inner join CarFleet cf\n" +
            "on c.fleet_id = cf.fleet_id\n" +
            "inner join LDWPayment ldw\n" +
            "on cf.fleet_id = ldw.fleet_id\n" +
            "where cf.description = ?1 and c.reg_no=?2", nativeQuery=true)
    double getLDWFeeByDescription(String fleet,String reg_no);
}
