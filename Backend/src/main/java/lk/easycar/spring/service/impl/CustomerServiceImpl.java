package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.entity.Customer;
import lk.easycar.spring.repo.CustomerRepo;
import lk.easycar.spring.repo.RentalRequestRepo;
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
    private CustomerRepo customerRepo;

    @Autowired
    private RentalRequestRepo rentalRequestRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return mapper.map(customerRepo.findAll(), new TypeToken<List<CustomerDTO>>(){}.getType());
    }

    @Override
    public int getCustomerCount() {
        return (int) customerRepo.count();
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
    public String updateCustomer(CustomerDTO dto) {
        if (customerRepo.existsById(dto.getNic_no())) {
            int ongoing_rentals = rentalRequestRepo.getCountOfActiveRentalsByCustomer(dto.getNic_no(), "Active");
            if (ongoing_rentals == 0) {
                mapper.map(customerRepo.save(mapper.map(dto, Customer.class)), CustomerDTO.class);
                return "Updated";
            }  else {
                customerRepo.getReferenceById(dto.getNic_no()).setContact_no(dto.getContact_no());
//                throw new RuntimeException("You have "+ongoing_rentals+" ongoing Rental/s..You can only Update your Contact Number...\nTry Again once your Rentals are returned...");
                return "You have "+ongoing_rentals+" ongoing Rental/s..You can only Update your Contact Number...\nTry Again once your Rentals are returned...";
            }

        } else {
            throw new RuntimeException("Invalid Customer NIC..Please check the NIC...");
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
