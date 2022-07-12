package lk.easycar.spring.controller;

import lk.easycar.spring.dto.RentalRequestDTO;
import lk.easycar.spring.service.RentalRequestService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.time.LocalDate;

@RestController
@CrossOrigin
@RequestMapping("api/v1/rentals")
public class RentalRequestController {

    @Autowired
    private RentalRequestService rentalRequestService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllRentals() {
        return new ResponseUtil(HttpServletResponse.SC_OK, "OK", rentalRequestService.getAllRentals());
    }

    @GetMapping(path = "/{rental_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchRental(@PathVariable("rental_id") String rental_id) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Search Done", rentalRequestService.searchRental(rental_id));
    }

    @GetMapping(params = {"rental_id"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getRequestStatus(@RequestParam("rental_id") String rental_id) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Checked Request Status", rentalRequestService.getRequestStatus(rental_id));
    }

    @GetMapping(params = {"active_rentals"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getNoOfActiveRentalsForTheDay(@RequestParam("active_rentals") String date) {
//        System.out.println(date.getClass().getSimpleName()); // String
//        LocalDate parse = LocalDate.parse(date);
//        System.out.println(parse); // 2022-09-09
//        System.out.println(parse.getClass().getSimpleName()); // LocalDate
        return new ResponseUtil(HttpServletResponse.SC_OK, "No Of Active Rentals", rentalRequestService.getNoOfActiveRentalsForTheDay(LocalDate.parse(date)));
    }

    @GetMapping(params = {"total_rentals_for"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getNoOfTotalRentalsForTheDay(@RequestParam("total_rentals_for") String date) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Total No Of Rentals For The Day", rentalRequestService.getNoOfTotalRentalsForTheDay(LocalDate.parse(date)));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil placeRentalRequest(@RequestBody RentalRequestDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_CREATED, "Rental Request Placed Successfully..!", rentalRequestService.placeRentalRequest(dto));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateRental(@RequestBody RentalRequestDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Rental Request Updated Successfully", rentalRequestService.updateRental(dto));
    }

    // When Request is Pending/Accepted/Denied
    @PutMapping(path = "status", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateRequestStatus(@RequestBody RentalRequestDTO dto) {
        rentalRequestService.updateRequestStatus(dto);
        return new ResponseUtil(HttpServletResponse.SC_OK, "Request Status Updated Successfully", null );
    }

    // When Request is Accepted
    @PutMapping(path = "accept", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil acceptRental(@RequestBody RentalRequestDTO dto) {
        rentalRequestService.acceptRental(dto);
        return new ResponseUtil(HttpServletResponse.SC_OK, "Rental Request "+dto.getRental_id()+" is Accepted", null );
    }

    // When Request is Denied
    @PutMapping(path = "deny", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil denyRental(@RequestBody RentalRequestDTO dto) {
        rentalRequestService.denyRental(dto);
        return new ResponseUtil(HttpServletResponse.SC_OK, "Rental Request "+dto.getRental_id()+" is Denied", null );
    }

    @DeleteMapping(params = {"rental_id"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteRental(@RequestParam("rental_id") String rental_id) {
        rentalRequestService.deleteRental(rental_id);
        return new ResponseUtil(HttpServletResponse.SC_OK, "Rental Request Cancelled Successfully", null);
    }
}
