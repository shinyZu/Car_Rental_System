package lk.easycar.spring.controller;

import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.dto.LDWPaymentDTO;
import lk.easycar.spring.service.CustomerService;
import lk.easycar.spring.service.LDWPaymentService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
@RequestMapping("api/v1/ldw_payment")
public class LDWPaymentController {

    @Autowired
    private LDWPaymentService ldwPaymentService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllLDWPayments() {
        return new ResponseUtil(HttpServletResponse.SC_OK, "OK", ldwPaymentService.getAllLDWPayments());
    }

    @GetMapping(path = "{fee_id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchLDWPayment(@PathVariable("fee_id") String fee_id) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Search Done", ldwPaymentService.searchLDWPayment(fee_id));
    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil saveLDWPayment(@RequestBody LDWPaymentDTO dto) {
        System.out.println(dto.toString());
        return new ResponseUtil(HttpServletResponse.SC_CREATED, "LDW Payment Saved Successfully..!", ldwPaymentService.saveLDWPayment(dto));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateLDWPayment (@RequestBody LDWPaymentDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "LDW Payment Updated Successfully", ldwPaymentService.updateLDWPayment(dto));
    }

    @DeleteMapping(params = {"fee_id"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteLDWPayment (@RequestParam("fee_id") String fee_id) {
        ldwPaymentService.deleteLDWPayment(fee_id);
        return new ResponseUtil(HttpServletResponse.SC_OK, "LDW Payment Deleted Successfully", null);
    }
}
