package lk.easycar.spring.controller;

import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.dto.RentalDetailDTO;
import lk.easycar.spring.dto.RentalPaymentDTO;
import lk.easycar.spring.service.CustomerService;
import lk.easycar.spring.service.RentalPaymentService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.time.LocalDate;

@RestController
@CrossOrigin
@RequestMapping("api/v1/rental_payment")
public class RentalPaymentController {

    @Autowired
    private RentalPaymentService rentalPaymentService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllRentalPayments() {
        return new ResponseUtil(HttpServletResponse.SC_OK, "OK", rentalPaymentService.getAllRentalPayments());
    }

    @GetMapping(path = "/{fee_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchRentalPayment (@PathVariable("fee_id") String fee_id) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Search Done", rentalPaymentService.searchRentalPayment(fee_id));
    }

    @GetMapping(path = "calculate_rental", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil calculatePaymentForEachCar(@RequestBody RentalDetailDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Rental Payment", rentalPaymentService.calculatePaymentForEachCar(dto));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveRentalPayment (@RequestBody RentalPaymentDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_CREATED, "Payment Saved Successfully..!", rentalPaymentService.saveRentalPayment(dto));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateRentalPayment (@RequestBody RentalPaymentDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Payment Updated Successfully", rentalPaymentService.updateRentalPayment(dto));
    }

    @DeleteMapping(params = {"fee_id"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteRentalPayment(@RequestParam("fee_id") String fee_id) {
        rentalPaymentService.deleteRentalPayment(fee_id);
        return new ResponseUtil(HttpServletResponse.SC_OK, "Payment Deleted Successfully", null);
    }
}
