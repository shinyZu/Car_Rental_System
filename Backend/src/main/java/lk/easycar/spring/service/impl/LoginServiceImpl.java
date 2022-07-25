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
            if (loginRepo.existsById(dto.getEmail())) { // if already a User have logged in with a given email
                if (loginRepo.getReferenceById(dto.getEmail()).getPassword().equals(dto.getPassword())) { // if it is provided with the correct password for that email
                    if (loginRepo.getReferenceById(dto.getEmail()).getUserStatus().equals(dto.getUserStatus())) { // if it matches the user type
                        return true;

                    } else {
                        throw new RuntimeException("Invalid User..");
                    }
                }  else {
                    throw new RuntimeException("Invalid Password...Please check your Password...");
                }

            } else {
                throw new RuntimeException("Invalid Email...Please check your Email..."); // User with this email have not yet Logged in/Registered..Have to first Sign In
            }

        } else {
            throw new RuntimeException("No Users are Logged In");
        }


    }
}
