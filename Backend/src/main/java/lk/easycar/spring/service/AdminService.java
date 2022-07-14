package lk.easycar.spring.service;

import lk.easycar.spring.dto.AdminDTO;
import lk.easycar.spring.dto.CarDTO;

import java.util.List;

public interface AdminService {
    List<AdminDTO> getAllAdmins();

    String generateNextID();

    AdminDTO searchAdmin(String admin_id);

    AdminDTO saveAdmin(AdminDTO dto);

    AdminDTO updateAdmin(AdminDTO dto);

    void deleteAdmin(String admin_id);
}
