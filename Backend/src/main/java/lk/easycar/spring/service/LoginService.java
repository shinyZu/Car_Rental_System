package lk.easycar.spring.service;

import lk.easycar.spring.dto.LoginDTO;

public interface LoginService {
    boolean login(LoginDTO dto);
}
