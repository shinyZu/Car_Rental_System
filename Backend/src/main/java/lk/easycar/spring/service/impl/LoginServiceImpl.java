package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.LoginDTO;
import lk.easycar.spring.repo.LoginRepo;
import lk.easycar.spring.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LoginServiceImpl implements LoginService {

    @Autowired
    private LoginRepo loginRepo;

    @Override
    public boolean login(LoginDTO dto) {
        if ((int) loginRepo.count() != 0) {
            if (loginRepo.existsById(dto.getEmail())) {
                if (loginRepo.getReferenceById(dto.getEmail()).getPassword().equals(dto.getPassword())) {
                    return true;

                } else {
                    throw new RuntimeException("Invalid Password...Please check your Password...");
                }

            } else {
                throw new RuntimeException("Invalid Email...Please check your Email...");
            }

        } else {
            throw new RuntimeException("No Users are Logged In");
        }


    }
}
