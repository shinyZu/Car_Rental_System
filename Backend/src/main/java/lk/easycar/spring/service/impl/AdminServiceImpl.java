package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.AdminDTO;
import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.entity.Admin;
import lk.easycar.spring.entity.Customer;
import lk.easycar.spring.repo.AdminRepo;
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
            return mapper.map(adminRepo.save(mapper.map(dto, Admin.class)),AdminDTO.class);
        } else {
            throw new RuntimeException("Admin Already Exists...");
        }
    }

    @Override
    public AdminDTO updateAdmin(AdminDTO dto) {
        if (adminRepo.existsById(dto.getAdmin_id())) {
            return mapper.map(adminRepo.save(mapper.map(dto, Admin.class)),AdminDTO.class);
        } else {
            throw new RuntimeException("No Such Admin..Please check the Admin ID...");
        }
    }

    @Override
    public void deleteAdmin(String admin_id) {
        if (adminRepo.existsById(admin_id)) {
            adminRepo.deleteById(admin_id);
        } else {
            throw new RuntimeException("No Such Admin..Please check the Admin ID...");
        }
    }
}
