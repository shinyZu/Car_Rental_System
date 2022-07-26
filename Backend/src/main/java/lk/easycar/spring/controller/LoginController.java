package lk.easycar.spring.controller;

import lk.easycar.spring.dto.LoginDTO;
import lk.easycar.spring.service.LoginService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
@RequestMapping("api/v1/login")
public class LoginController {

    @Autowired
    LoginService loginService;

    @PostMapping(path = "user_login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil login(@RequestBody LoginDTO dto) {
        System.out.println(dto);
        return new ResponseUtil(HttpServletResponse.SC_OK, "Login Status", loginService.login(dto) ? "Login Success" : "Login Fail");
    }


}
