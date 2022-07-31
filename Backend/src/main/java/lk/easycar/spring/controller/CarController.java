package lk.easycar.spring.controller;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.dto.Custom;
import lk.easycar.spring.dto.CustomDTO;
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

    @GetMapping(path = "count_of", params = {"currentStatus"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getNoOfCarsByStatus(@RequestParam("currentStatus") String status) {
        return new ResponseUtil(HttpServletResponse.SC_OK, status + " Car Count of Status "+status, carService.getNoOfCarsByStatus(status));
    }

    @GetMapping(params = {"schedule_of"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCarSchedule(@RequestParam("schedule_of") String reg_no) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Schedule of Car "+reg_no, carService.getCarSchedule(reg_no));
    }

    @GetMapping(path = "cars_by_date", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCarsByDate(@RequestBody CustomDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Car Schedule By Date "+dto.getPickUp_date(), carService.getCarsByDate(dto));
    }

    @GetMapping(path = "by_passengers", params = {"passenger_count"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil sortCarsByNoOfPassengers(@RequestParam("passenger_count") int noOfPassengers) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Cars Sorted By No Of Passengers", carService.sortCarsByNoOfPassengers(noOfPassengers));
    }

    @GetMapping(path = "by_transmission_type", params = {"transmission_type"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil sortCarsByTransmissionType(@RequestParam("transmission_type") String type) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Cars Sorted By Transmission Type", carService.sortCarsByTransmissionType(type));
    }

    @GetMapping(path = "by_brand", params = {"brand"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil sortCarsByBrand(@RequestParam("brand") String brand) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Cars Sorted By Brand", carService.sortCarsByBrand(brand));
    }

    @GetMapping(path = "by_type", params = {"fleet_id"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil sortCarsByCarFleet(@RequestParam("fleet_id") String fleet) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Cars Sorted By Fleet", carService.sortCarsByCarFleet(fleet));
    }

    @GetMapping(path = "by_price", params = {"price"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil sortCarsByPrice(@RequestParam("price") double price) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Cars Sorted By Price", carService.sortCarsByPrice(price));
    }

    @GetMapping(path = "by_fuel_type", params = {"fuel_type"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil sortCarsByFuelType(@RequestParam("fuel_type") String fuel_type) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Cars Sorted By Fuel Type", carService.sortCarsByFuelType(fuel_type));
    }

    @GetMapping(path = "maintenance", params = {"currentStatus"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCarsToRepair(@RequestParam("currentStatus") String currentStatus) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Cars Need_Under Maintenance", carService.getCarsToRepair(currentStatus));
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
