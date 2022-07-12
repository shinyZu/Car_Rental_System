package lk.easycar.spring.controller;

import lk.easycar.spring.dto.RentalRequestDTO;
import lk.easycar.spring.service.RentalRequestService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

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

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil placeRentalRequest(@RequestBody RentalRequestDTO dto) {
        System.out.println(dto.toString());
//        rentalRequestService.placeRentalRequest(dto);
        return new ResponseUtil(HttpServletResponse.SC_CREATED, "Rental Request Placed Successfully..!", rentalRequestService.placeRentalRequest(dto));
//        return new ResponseUtil(HttpServletResponse.SC_CREATED, "Rental Request Ready To Place...", null);
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
