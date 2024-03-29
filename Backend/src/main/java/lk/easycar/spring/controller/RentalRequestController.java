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

    @GetMapping(path = "all_requests", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllRentalsRequests() {
        return new ResponseUtil(HttpServletResponse.SC_OK, "OK", rentalRequestService.getAllRentalsRequests());
    }

    @GetMapping(path = "next_id", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil generateNextID() {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Next ID", rentalRequestService.generateNextID());
    }

    @GetMapping(path = "/{rental_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchRentalByID(@PathVariable("rental_id") String rental_id) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Search Done", rentalRequestService.searchRental(rental_id));
    }

    //Invoice Details
    @GetMapping(path = "/{rental_id}", params = {"reg_no"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchRentalByIDAndRegNo(@PathVariable("rental_id") String rental_id, @RequestParam("reg_no") String reg_no) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Search Done", rentalRequestService.searchRentalByIDAndRegNo(rental_id, reg_no));
    }

    @GetMapping(path = "duration", params = {"rental_id"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getRentalDuration(@RequestParam("rental_id") String rental_id) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Duration", rentalRequestService.getRentalDuration(rental_id));
    }

    // getRentalForReturn
    @GetMapping(params = {"return_by"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchActiveRentalByCustomer(@RequestParam("return_by") String nic_no) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Details of the Rental To Be Returned by Customer " + nic_no, rentalRequestService.searchActiveRentalByCustomer(nic_no));
    }

    @GetMapping(path = "get_returns", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getReturns() {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Details of the Rental To Be Returned ", rentalRequestService.getAllReturns());
    }

    @GetMapping(params = {"rental_id"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getRequestStatus(@RequestParam("rental_id") String rental_id) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Checked Request Status", rentalRequestService.getRequestStatus(rental_id));
    }

    @GetMapping(params = {"active_rentals"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getNoOfActiveRentalsForTheDay(@RequestParam("active_rentals") String date) {
//        System.out.println(LocalDate.parse(date).getClass().getSimpleName()); // LocalDate
        return new ResponseUtil(HttpServletResponse.SC_OK, "No Of Active Rentals", rentalRequestService.getNoOfActiveRentalsForTheDay(LocalDate.parse(date)));
    }

    @GetMapping(params = {"total_rentals_for"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getNoOfTotalRentalsForTheDay(@RequestParam("total_rentals_for") String date) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Total No Of Rentals For The Day", rentalRequestService.getNoOfTotalRentalsForTheDay(LocalDate.parse(date)));
    }

    @GetMapping(path = "bookings/{nic_no}", /*params = {"nic_no"},*/ produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCustomerBookings(@PathVariable("nic_no") String nic_no) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "My Bookings", rentalRequestService.getCustomerBookings(nic_no));
    }

    @GetMapping(path = "calculate_total_rental_of", params = {"rental_id"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil calculateTotalPaymentForRental(@RequestParam("rental_id") String rental_id) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Total Rental Payment", rentalRequestService.calculateTotalPaymentForRental(rental_id));
    }

    @GetMapping(path = "amount_to_return", params = {"rental_id"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil calculateAmountToReturn(@RequestParam("rental_id") String rental_id) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Amount To Return", rentalRequestService.calculateAmountToReturn(rental_id));
    }

    @GetMapping(path = "daily_income", params = {"date"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil calculateDailyIncome(@RequestParam("date") String date) {
//        return new ResponseUtil(HttpServletResponse.SC_OK, "Daily Income for Date "+date, rentalRequestService.calculateDailyIncome(LocalDate.parse(date)));
        return new ResponseUtil(HttpServletResponse.SC_OK, "Daily Income for Date " + date, rentalRequestService.calculateDailyIncome((LocalDate.parse(date))));
    }

    @GetMapping(path = "monthly_income",/* params = {"date"},*/ produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil calculateMonthlyIncome() {
        /*Month month = LocalDate.parse(date).getMonth();
        System.out.println("month : "+month); // July
        System.out.println(month.getClass().getSimpleName()); // Month
        System.out.println("month : "+month.getValue()); // 7*/
//        return new ResponseUtil(HttpServletResponse.SC_OK, "Monthly Income for Month "+ LocalDate.parse(date).getMonth(), rentalRequestService.calculateMonthlyIncome(LocalDate.parse(date).getMonth().getValue()));
        return new ResponseUtil(HttpServletResponse.SC_OK, "Monthly Income", rentalRequestService.calculateMonthlyIncome());
    }

    @GetMapping(path = "weekly_income", params = {"date"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil calculateWeeklyIncome(@RequestParam("date") String date) {
        /*LocalDate date1 = LocalDate.parse(date).minusDays(7); // 2022-07-10 - 7 days
        System.out.println("7 days before is : "+date1);// 2022-07-03*/
        return new ResponseUtil(HttpServletResponse.SC_OK, "Weekly Income Until "+ date, rentalRequestService.calculateWeeklyIncome(date));
//        return new ResponseUtil(HttpServletResponse.SC_OK, "Weekly Income Until", rentalRequestService.calculateWeeklyIncome());
    }

    @GetMapping(path = "annual_income", /*params = {"date"},*/ produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil calculateAnnualIncome() {
        /*int year = LocalDate.parse(date).getYear();
        System.out.println("year : "+ year); // 2022*/
//        return new ResponseUtil(HttpServletResponse.SC_OK, "Annual Income for Year "+ LocalDate.parse(date).getYear(), rentalRequestService.calculateAnnualIncome(date));
        return new ResponseUtil(HttpServletResponse.SC_OK, "Annual Income", rentalRequestService.calculateAnnualIncome());
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil placeRentalRequest(@RequestBody RentalRequestDTO dto) {
        System.out.println(dto);
        System.out.println(dto.getPickUp_time());
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
        return new ResponseUtil(HttpServletResponse.SC_OK, "Request Status Updated Successfully", null);
    }

    // When Request is Accepted
    @PutMapping(path = "accept", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil acceptRental(@RequestBody RentalRequestDTO dto) {
        rentalRequestService.acceptRental(dto);
        return new ResponseUtil(HttpServletResponse.SC_OK, "Rental Request " + dto.getRental_id() + " is Accepted", null);
    }

    // When Request is Denied
    @PutMapping(path = "deny", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil denyRental(@RequestBody RentalRequestDTO dto) {
        rentalRequestService.denyRental(dto);
        return new ResponseUtil(HttpServletResponse.SC_OK, "Rental Request " + dto.getRental_id() + " is Denied", null);
    }

    @DeleteMapping(params = {"rental_id"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteRental(@RequestParam("rental_id") String rental_id) {
        rentalRequestService.deleteRental(rental_id);
        return new ResponseUtil(HttpServletResponse.SC_OK, "Rental Request Cancelled Successfully", null);
    }
}
