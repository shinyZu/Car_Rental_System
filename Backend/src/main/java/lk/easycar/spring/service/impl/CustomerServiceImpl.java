package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.entity.Customer;
import lk.easycar.spring.repo.CustomerRepo;
import lk.easycar.spring.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    CustomerRepo customerRepo;

    @Autowired
    ModelMapper mapper;

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return mapper.map(customerRepo.findAll(), new TypeToken<List<CustomerDTO>>(){}.getType());
    }

    @Override
    public CustomerDTO searchCustomer(String nic_no) {
        if (customerRepo.existsById(nic_no)) {
            return mapper.map(customerRepo.findById(nic_no), CustomerDTO.class);
        } else {
            throw new RuntimeException("No Customer with NIC " + nic_no);
        }
    }

    @Override
    public CustomerDTO saveCustomer(CustomerDTO dto) {
        if (!customerRepo.existsById(dto.getNic_no())) {
            return mapper.map(customerRepo.save(mapper.map(dto, Customer.class)),CustomerDTO.class);
        } else {
            throw new RuntimeException("Customer Already Exists...");
        }
    }

    @Override
    public CustomerDTO updateCustomer(CustomerDTO dto) {
        if (customerRepo.existsById(dto.getNic_no())) {
            return mapper.map(customerRepo.save(mapper.map(dto, Customer.class)),CustomerDTO.class);
        } else {
            throw new RuntimeException("No Such Customer..Please check the NIC...");
        }
    }

    @Override
    public void deleteCustomer(String nic_no) {
        if (customerRepo.existsById(nic_no)) {
            customerRepo.deleteById(nic_no);
        } else {
            throw new RuntimeException("No Such Customer..Please check the Customer NIC...");
        }
    }


}
