package lk.easycar.spring.controller;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.dto.CarFleetDTO;
import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.service.CarFleetService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
@RequestMapping("api/v1/fleet")
public class CarFleetController {

    @Autowired
    private CarFleetService carFleetService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllFleets(){
        return new ResponseUtil(HttpServletResponse.SC_OK, "OK", carFleetService.getAllFleets());
    }

    @GetMapping(path = "next_id", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil generateNextID (){
        return new ResponseUtil(HttpServletResponse.SC_OK, "Next ID", carFleetService.generateNextID());
    }

    @GetMapping(path = "{fleet_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchCarFleet(@PathVariable("fleet_id") String fleet_id){
        return new ResponseUtil(HttpServletResponse.SC_OK, "Search Done", carFleetService.searchCarFleet(fleet_id));
    }

    @GetMapping(path = "getFleet", params = {"reg_no"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getFleetByRegNo(@RequestParam("reg_no") String reg_no){
        return new ResponseUtil(HttpServletResponse.SC_OK, "Fleet By Reg No", carFleetService.getFleetByRegNo(reg_no));
    }

    @GetMapping(path = "get_ldw", params = {"description","reg_no"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getLDWFeeByDescription(@RequestParam("description") String description, @RequestParam("reg_no") String reg_no){
        return new ResponseUtil(HttpServletResponse.SC_OK, "Search Done", carFleetService.getLDWFeeByDescription(description,reg_no));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveCarFleet(@ModelAttribute CarFleetDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_CREATED, "Car Fleet Added Successfully..!", carFleetService.saveCarFleet(dto));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateCarFleet(@RequestBody CarFleetDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Car Fleet Updated Successfully",  carFleetService.updateCarFleet(dto));
    }

    @DeleteMapping(params = {"fleet_id"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteCarFleet(@RequestParam("fleet_id") String fleet_id) {
        carFleetService.deleteCarFleet(fleet_id);
        return new ResponseUtil(HttpServletResponse.SC_OK, "Car Fleet Deleted Successfully", null);
    }

}
