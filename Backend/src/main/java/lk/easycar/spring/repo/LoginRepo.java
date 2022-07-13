package lk.easycar.spring.repo;

import lk.easycar.spring.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface LoginRepo extends JpaRepository<Login,String> {

    @Query(value="select count(l.email) from Login l where l.email=?1",nativeQuery=true)
    int searchForAnyDuplicateEmail(String email);
}
