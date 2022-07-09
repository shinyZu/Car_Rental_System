package lk.easycar.spring.controller;

import lk.easycar.spring.dto.RentalDetailDTO;
import lk.easycar.spring.dto.RentalRequestDTO;
import lk.easycar.spring.service.RentalDetailService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
@RequestMapping("api/v1/rental_detail")
public class RentalDetailController {

    @Autowired
    RentalDetailService rentalDetailService;

    @PutMapping(params = {"changeDriverTo"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil changeAssignedDriver(@RequestBody RentalDetailDTO dto, @RequestParam("changeDriverTo") String newDriver) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Driver Changed Successfully", rentalDetailService.changeAssignedDriver(dto,newDriver));
    }
}
