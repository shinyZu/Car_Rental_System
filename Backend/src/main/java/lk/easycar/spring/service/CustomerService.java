package lk.easycar.spring.service;

import lk.easycar.spring.dto.CustomDTO;
import lk.easycar.spring.dto.CustomerDTO;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CustomerService {

    List<CustomerDTO> getAllCustomers();

    int getCustomerCount();

    CustomerDTO searchCustomer(String nic_no);

    CustomerDTO getCustomerByEmail(String email);

    CustomerDTO saveCustomer(CustomerDTO dto);

    String updateCustomer(CustomerDTO dto);

    void deleteCustomer(String nic_no);
}
