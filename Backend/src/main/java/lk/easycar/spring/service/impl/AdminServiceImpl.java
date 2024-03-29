package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.AdminDTO;
import lk.easycar.spring.entity.Admin;
import lk.easycar.spring.entity.Customer;
import lk.easycar.spring.entity.Driver;
import lk.easycar.spring.entity.Login;
import lk.easycar.spring.repo.AdminRepo;
import lk.easycar.spring.repo.CustomerRepo;
import lk.easycar.spring.repo.DriverRepo;
import lk.easycar.spring.repo.LoginRepo;
import lk.easycar.spring.service.AdminService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private LoginRepo loginRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<AdminDTO> getAllAdmins() {
        return mapper.map(adminRepo.findAll(), new TypeToken<List<AdminDTO>>() {
        }.getType());
    }

    @Override
    public String generateNextID() {
        long count = adminRepo.count();
        System.out.println("count : " + count);
        if (count == 0) {
            return "ADM-001";
        }

        String last_id = adminRepo.getLastID();
//        List<Admin> admins = adminRepo.findAll(Sort.by(Sort.Direction.DESC, "admin_id"));
//        String last_id = admins.get(0).getAdmin_id();
        System.out.println("last_id : " + last_id);

        int tempId = Integer.parseInt(last_id.split("-")[1]);
        System.out.println("tempId : " + tempId);
        tempId = tempId + 1;

        if (tempId <= 9) {
            System.out.println("ADM-00" + tempId);
            return "ADM-00" + tempId;
        } else if (tempId <= 99) {
            return "ADM-0" + tempId;
        } else {
            return "ADM-" + tempId;
        }
    }

    @Override
    public AdminDTO searchAdmin(String admin_id) {
        if (adminRepo.existsById(admin_id)) {
            return mapper.map(adminRepo.findById(admin_id), AdminDTO.class);
        } else {
            throw new RuntimeException("No Admin with ID " + admin_id);
        }
    }

    @Override
    public AdminDTO saveAdmin(AdminDTO dto) {
        if (!adminRepo.existsById(dto.getAdmin_id())) {
            int count = loginRepo.searchForAnyDuplicateEmail(dto.getEmail());

            if (count == 0) { // if there is no any users with the same email/ if no any duplicate emails

//                if (!(this.isDuplicateContact(dto.getAdmin_id(), dto.getContact_no()).equals("Duplicate"))) {

                    loginRepo.save(new Login(dto.getEmail(), dto.getPassword(), "Admin"));
                    return mapper.map(adminRepo.save(mapper.map(dto, Admin.class)), AdminDTO.class);

//                } else {
//                    throw new RuntimeException("Duplicate Contact No...");
//                }

            } else {
                throw new RuntimeException("A User with email " + dto.getEmail() + " already exists...");
            }

        } else {
            throw new RuntimeException("Admin Already Exists...");
        }
    }

    @Override
    public AdminDTO updateAdmin(AdminDTO dto) {
        /*if (adminRepo.existsById(dto.getAdmin_id())) {
            return mapper.map(adminRepo.save(mapper.map(dto, Admin.class)),AdminDTO.class);
        } else {
            throw new RuntimeException("No Such Admin..Please check the Admin ID...");
        }*/

        if (adminRepo.existsById(dto.getAdmin_id())) {
            if (dto.getEmail().equals(adminRepo.getReferenceById(dto.getAdmin_id()).getEmail())) { // if Admins are NOT changing their email
                return mapper.map(adminRepo.save(mapper.map(dto, Admin.class)), AdminDTO.class);

            } else { // if Admins are gonna change their email
                int count = loginRepo.searchForAnyDuplicateEmail(dto.getEmail());

                if (count == 0) { // if there is no any users with the same email/ if no any duplicate emails

//                    if (!(this.isDuplicateContact(dto.getAdmin_id(), dto.getContact_no()).equals("Duplicate"))) {

                    loginRepo.deleteById(adminRepo.getReferenceById(dto.getAdmin_id()).getEmail());
                    loginRepo.save(new Login(dto.getEmail(), dto.getPassword(), "Admin"));
                    return mapper.map(adminRepo.save(mapper.map(dto, Admin.class)), AdminDTO.class);

//                    } else {
//                        throw new RuntimeException("Duplicate Contact No...");
//                    }

                } else {
                    throw new RuntimeException("A User with email " + dto.getEmail() + " already exists...");
                }
            }
        } else {
            throw new RuntimeException("No Such Admin..Please check the Admin ID...");
        }
    }

    @Override
    public void deleteAdmin(String admin_id) {
        if (adminRepo.existsById(admin_id)) {
            loginRepo.deleteById(adminRepo.getReferenceById(admin_id).getEmail());
            adminRepo.deleteById(admin_id);
        } else {
            throw new RuntimeException("No Such Admin..Please check the Admin ID...");
        }
    }

    /*private String isDuplicateContact(String id, int contact) {
        System.out.println("contact : " + contact);
        List<Admin> all = adminRepo.findAll();
        for (Admin admin : all) {
            if (admin.getContact_no() == contact) {
                if (admin.getAdmin_id().equals(id)) {
                    System.out.println("Contact is of the same user");
                    return "Match";
                } else {
                    System.out.println("Duplicate Contact");
                    return "Duplicate";
                }
            }
        }
        System.out.println("Unique Contact");
        return "Unique";
    }*/

    /*private String isDuplicateContact(String id, int contact) {
        System.out.println("contact : " + contact);
        List<Admin> all_admins = adminRepo.findAll();
        List<Customer> all_customers = customerRepo.findAll();
        List<Driver> all_drivers = driverRepo.findAll();

        for (Admin a : all_admins) {
            System.out.println(a.getContact_no());
            System.out.println(contact);
            if (a.getContact_no() == contact) {
                if (a.getAdmin_id().equals(id)) {
                    System.out.println("Contact is of the same user");
                    return "Match";
                } else {
                    System.out.println("Duplicate Contact");
                    return "Duplicate";
                }
            }
        }

        for (Customer c : all_customers) {
            if (c.getContact_no() == contact) {
                return "Duplicate";
            }
        }

        for (Driver d : all_drivers) {
            if (d.getContact_no() == contact) {
                return "Duplicate";
            }
        }
        return "Unique";
    }*/
}
