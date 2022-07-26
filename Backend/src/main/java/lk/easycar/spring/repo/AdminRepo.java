package lk.easycar.spring.repo;

import lk.easycar.spring.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AdminRepo extends JpaRepository<Admin, String> {

    @Query(value = "select a.admin_id from Admin a order by a.admin_id desc LIMIT 1", nativeQuery=true)
    String getLastID();

    @Query(value="select count(a.contact_no) from Admin a where a.contact_no=?1",nativeQuery=true)
    int searchForAnyDuplicateContact(String contact_no);
}
