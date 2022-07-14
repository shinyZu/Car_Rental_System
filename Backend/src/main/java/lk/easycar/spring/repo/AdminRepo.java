package lk.easycar.spring.repo;

import lk.easycar.spring.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AdminRepo extends JpaRepository<Admin, String> {

    @Query(value = "select a.admin_id from Admin a order by a.admin_id desc LIMIT 1", nativeQuery=true)
    String getLastID();


}
