package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.AdminDTO;
import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.entity.Admin;
import lk.easycar.spring.entity.Customer;
import lk.easycar.spring.entity.Login;
import lk.easycar.spring.repo.AdminRepo;
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
    private LoginRepo loginRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<AdminDTO> getAllAdmins() {
        return mapper.map(adminRepo.findAll(), new TypeToken<List<AdminDTO>>(){}.getType());
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

            if(count == 0 ) { // if there is no any users with the same email/ if no any duplicate emails
                loginRepo.save(new Login(dto.getEmail(), dto.getPassword(), "Admin"));
                return mapper.map(adminRepo.save(mapper.map(dto, Admin.class)), AdminDTO.class);

            } else {
                throw new RuntimeException("A User with email "+dto.getEmail()+" already exists...");
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
            int count = loginRepo.searchForAnyDuplicateEmail(dto.getEmail());

            if(count == 0 ) { // if there is no any users with the same email/ if no any duplicate emails
                loginRepo.deleteById(adminRepo.getReferenceById(dto.getAdmin_id()).getEmail());
                loginRepo.save(new Login(dto.getEmail(), dto.getPassword(), "Admin"));
                return mapper.map(adminRepo.save(mapper.map(dto, Admin.class)), AdminDTO.class);

            } else {
                throw new RuntimeException("A User with email "+dto.getEmail()+" already exists...");
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
}
