package lk.easycar.spring.controller;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.service.CarService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
@RequestMapping("api/v1/cars")
public class CarController {

    @Autowired
    private CarService carService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllCars(){
        return new ResponseUtil(HttpServletResponse.SC_OK, "OK", carService.getAllCars());
    }

    @GetMapping(path = "{reg_no}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchCar(@PathVariable("reg_no") String reg_no){
        return new ResponseUtil(HttpServletResponse.SC_OK, "Search Done", carService.searchCar(reg_no));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveCar(@RequestBody CarDTO dto) {
        System.out.println(dto.toString());
        return new ResponseUtil(HttpServletResponse.SC_CREATED, "Car Details Saved Successfully..!", carService.saveCar(dto));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateCar(@RequestBody CarDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Car Details Updated Successfully",  carService.updateCar(dto));
    }

    // Available, Unavailable, Under Maintenance, Reserved, Returned
    @PutMapping(path = "status", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateCarStatus(@RequestBody CarDTO dto) {
        carService.updateCarStatus(dto);
        return new ResponseUtil(HttpServletResponse.SC_OK, "Car Status Updated Successfully",null);
    }

    @DeleteMapping(params = {"reg_no"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteCar(@RequestParam("reg_no") String reg_no) {
        carService.deleteCar(reg_no);
        return new ResponseUtil(HttpServletResponse.SC_OK, "Car Details Deleted Successfully", null);
    }
}
