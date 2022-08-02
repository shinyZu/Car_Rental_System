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

    @GetMapping(path = "/{rental_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllRentalDetailsByRentalID(@PathVariable("rental_id") String rental_id){
        return new ResponseUtil(HttpServletResponse.SC_OK, "OK", rentalDetailService.getAllRentalDetailsByRentalID(rental_id));
    }

    @GetMapping(path = "mileage", params = {"reg_no"},produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getMileage(@RequestParam("reg_no") String reg_no){
        return new ResponseUtil(HttpServletResponse.SC_OK, "Mileage", rentalDetailService.getMileage(reg_no));
    }

    @PutMapping(params = {"changeDriverTo"}, consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil changeAssignedDriver(@RequestBody RentalDetailDTO dto, @RequestParam("changeDriverTo") String newDriver) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Driver Changed Successfully", rentalDetailService.changeAssignedDriver(dto,newDriver));
    }

    @PutMapping(path = "return", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateDetailsAfterReturn(@RequestBody RentalDetailDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Rental Details Updated Successfully", rentalDetailService.updateDetailsAfterReturn(dto)==1 ? "Success" : "Fail");
    }

    @DeleteMapping(path = "delete_detail", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteRental(@RequestBody RentalDetailDTO dto) {
        rentalDetailService.deleteRentalDetail(dto);
        return new ResponseUtil(HttpServletResponse.SC_OK, "Rental Detail Deleted Successfully", null);
    }
}
