package lk.easycar.spring.controller;

import lk.easycar.spring.dto.CustomDTO;
import lk.easycar.spring.dto.DriverDTO;
import lk.easycar.spring.service.DriverService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
@RequestMapping("api/v1/driver")
public class DriverController {

    @Autowired
    private DriverService driverService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllDrivers() {
        return new ResponseUtil(HttpServletResponse.SC_OK, "OK", driverService.getAllDrivers());
    }

    @GetMapping(path = "/{license_no}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchDriver(@PathVariable("license_no") String license_no) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Search Done", driverService.searchDriver(license_no));
    }

    @GetMapping(path = "count_of", params = {"currentStatus"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getNoOfDriversByStatus(@RequestParam("currentStatus") String status) {
        return new ResponseUtil(HttpServletResponse.SC_OK, status + " Driver Count", driverService.getNoOfDriversByStatus(status));
    }

    @GetMapping(params = {"schedule_of"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getWorkSchedule(@RequestParam("schedule_of") String license_no) {
        return new ResponseUtil(HttpServletResponse.SC_OK, " Driver Schedule", driverService.getWorkSchedule(license_no));
    }

    @GetMapping(path = "schedule_by_duration", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getWorkScheduleByDuration(@RequestBody CustomDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_OK, " Driver Schedule from " + dto.getPickUp_date()+" to "+dto.getReturn_date(), driverService.getWorkScheduleByDuration(dto));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil registerDriver(@ModelAttribute DriverDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_CREATED, "Driver Saved Successfully..!", driverService.saveDriver(dto));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateDriver(@RequestBody DriverDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Driver Updated Successfully", driverService.updateDriver(dto));
    }

    @DeleteMapping(params = {"license_no"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteDriver(@RequestParam("license_no") String license_no) {
        driverService.deleteDriver(license_no);
        return new ResponseUtil(HttpServletResponse.SC_OK, "Driver Deleted Successfully", null);
    }
}
