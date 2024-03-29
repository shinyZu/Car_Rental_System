package lk.easycar.spring.controller;

import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.service.CustomerService;
import lk.easycar.spring.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
@RequestMapping("api/v1/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllCustomers() {
        return new ResponseUtil(HttpServletResponse.SC_OK, "OK", customerService.getAllCustomers());
    }

    @GetMapping(path = "getCount", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCustomerCount() {
        return new ResponseUtil(200, "Customer Count", customerService.getCustomerCount());
    }

    @GetMapping(path = "/{nic_no}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil searchCustomer(@PathVariable("nic_no") String nic_no) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Search Done", customerService.searchCustomer(nic_no));
    }

    @GetMapping(params = {"email"} , produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCustomerByEmail(@RequestParam("email") String email) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Customer By Email", customerService.getCustomerByEmail(email));
    }

    // Register Customer
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil registerCustomer(@ModelAttribute CustomerDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_CREATED, "Customer Saved Successfully..!", customerService.saveCustomer(dto));
    }

    @PutMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil updateCustomer(@RequestBody CustomerDTO dto) {
        return new ResponseUtil(HttpServletResponse.SC_OK, "", customerService.updateCustomer(dto));
    }

    @DeleteMapping(params = {"nic_no"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil deleteCustomer(@RequestParam("nic_no") String nic_no) {
        customerService.deleteCustomer(nic_no);
        return new ResponseUtil(HttpServletResponse.SC_OK, "Customer Deleted Successfully", null);
    }

}
