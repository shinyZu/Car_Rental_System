package lk.easycar.spring.service;

import lk.easycar.spring.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {

    List<CustomerDTO> getAllCustomers();

    CustomerDTO searchCustomer(String nic_no);

    CustomerDTO saveCustomer(CustomerDTO dto);

    CustomerDTO updateCustomer(CustomerDTO dto);

    void deleteCustomer(String nic_no);

}
