package lk.easycar.spring.controller;

import lk.easycar.spring.dto.AdminDTO;
import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.service.AdminService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
@RequestMapping("api/v1/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllAdmins (){
        return new ResponseUtil(HttpServletResponse.SC_OK, "OK", adminService.getAllAdmins());
    }

    @GetMapping(path = "/{admin_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchAdmin (@PathVariable("admin_id") String admin_id){
        return new ResponseUtil(HttpServletResponse.SC_OK, "Search Done", adminService.searchAdmin(admin_id));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveAdmin (@ModelAttribute AdminDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_CREATED, "Admin Saved Successfully..!", adminService.saveAdmin(dto));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateAdmin (@RequestBody AdminDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Admin Updated Successfully",  adminService.updateAdmin(dto));
    }

    @DeleteMapping(params = {"admin_id"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteAdmin (@RequestParam("admin_id") String admin_id) {
        adminService.deleteAdmin(admin_id);
        return new ResponseUtil(HttpServletResponse.SC_OK, "Admin Deleted Successfully", null);
    }
}
