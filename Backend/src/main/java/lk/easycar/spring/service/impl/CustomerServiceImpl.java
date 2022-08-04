package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.entity.Customer;
import lk.easycar.spring.entity.Login;
import lk.easycar.spring.repo.*;
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
    private LoginRepo loginRepo;

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<CustomerDTO> getAllCustomers() {
        return mapper.map(customerRepo.findAll(), new TypeToken<List<CustomerDTO>>() {
        }.getType());
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
    public CustomerDTO getCustomerByEmail(String email) {
        return mapper.map(customerRepo.getCustomerByEmail(email),CustomerDTO.class);
    }

    @Override
    public CustomerDTO saveCustomer(CustomerDTO dto) {
        /*if (!customerRepo.existsById(dto.getNic_no())) {
            return mapper.map(customerRepo.save(mapper.map(dto, Customer.class)),CustomerDTO.class);
        } else {
            throw new RuntimeException("Customer Already Exists...");
        }*/

        if (!customerRepo.existsById(dto.getNic_no())) {
            int count = loginRepo.searchForAnyDuplicateEmail(dto.getEmail());
            int customerContactCount = customerRepo.searchForAnyDuplicateContact(String.valueOf(dto.getContact_no()));
            int driverContactCount = driverRepo.searchForAnyDuplicateContact(String.valueOf(dto.getContact_no()));
            int adminContactCount = adminRepo.searchForAnyDuplicateContact(String.valueOf(dto.getContact_no()));

            int anyDuplicateLicense = customerRepo.searchForAnyDuplicateLicense(dto.getLicense_no());

            if (count == 0) { // if there is no any users with the same email/ if no any duplicate emails

                if (customerContactCount == 0 && driverContactCount == 0 && adminContactCount == 0) { // if no duplicate contacts

                    if (anyDuplicateLicense == 0) { // if no duplicate license numbers
                        loginRepo.save(new Login(dto.getEmail(), dto.getPassword(), "Customer"));
                        return mapper.map(customerRepo.save(mapper.map(dto, Customer.class)), CustomerDTO.class);

                    } else {
                        throw new RuntimeException("Duplicate License No.Please check your License No again....");
                    }
                } else {
                    throw new RuntimeException("Duplicate Contact No.Please check your Contact No again....");
                }

            } else {
                throw new RuntimeException("A User with email " + dto.getEmail() + " already exists...");
            }

        } else {
            throw new RuntimeException("Customer Already Exists..Please check your NIC No.");
        }

    }

    @Override
    public String updateCustomer(CustomerDTO dto) {
        /*if (customerRepo.existsById(dto.getNic_no())) {
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
        }*/

        if (customerRepo.existsById(dto.getNic_no())) {
            int ongoing_rentals = rentalRequestRepo.getCountOfActiveRentalsByCustomer(dto.getNic_no(), "Active");

            if (ongoing_rentals == 0) { // if no any ongoing rentals
                if (dto.getEmail().equals(customerRepo.getReferenceById(dto.getNic_no()).getEmail())) { // if Customers are NOT changing their email
                    loginRepo.save(new Login(dto.getEmail(), dto.getPassword(), "Customer"));
                    mapper.map(customerRepo.save(mapper.map(dto, Customer.class)), CustomerDTO.class);
                    return "Profile Updated Successfully";

                } else { // if Customers are gonna change their email
                    int count = loginRepo.searchForAnyDuplicateEmail(dto.getEmail());

                    if (count == 0) { // if there are no any users with the same email/ if no any duplicate emails
                        loginRepo.deleteById(customerRepo.getReferenceById(dto.getNic_no()).getEmail());
                        loginRepo.save(new Login(dto.getEmail(), dto.getPassword(), "Customer"));
                        mapper.map(customerRepo.save(mapper.map(dto, Customer.class)), CustomerDTO.class);
                        return "Profile Updated Successfully";

                    } else {
                        throw new RuntimeException("A User with email " + dto.getEmail() + " already exists...");
                    }
                }
            } else {
                customerRepo.getReferenceById(dto.getNic_no()).setContact_no(dto.getContact_no());
//                return "You have " + ongoing_rentals + " ongoing Rental/s..You can only Update your Contact Number...\nTry Again once your Rentals are returned...";
                return "You have " + ongoing_rentals + " ongoing Rental/s..Your Contact was Updated Successfully!";
            }


        } else {
            throw new RuntimeException("Invalid Customer NIC..Please check the NIC...");
        }
    }

    @Override
    public void deleteCustomer(String nic_no) {
        if (customerRepo.existsById(nic_no)) {
            loginRepo.deleteById(customerRepo.getReferenceById(nic_no).getEmail());
            customerRepo.deleteById(nic_no);
        } else {
            throw new RuntimeException("No Such Customer..Please check the Customer NIC...");
        }
    }


}
