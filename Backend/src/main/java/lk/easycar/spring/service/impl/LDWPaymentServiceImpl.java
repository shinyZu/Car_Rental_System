package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.dto.LDWPaymentDTO;
import lk.easycar.spring.entity.Customer;
import lk.easycar.spring.entity.LDWPayment;
import lk.easycar.spring.repo.LDWPaymentRepo;
import lk.easycar.spring.service.LDWPaymentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LDWPaymentServiceImpl implements LDWPaymentService {

    @Autowired
    private LDWPaymentRepo ldwPaymentRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<LDWPaymentDTO> getAllLDWPayments() {
        return mapper.map(ldwPaymentRepo.findAll(), new TypeToken<List<LDWPaymentDTO>>() {
        }.getType());
    }

    @Override
    public String generateNextID() {
        long count = ldwPaymentRepo.count();
        System.out.println("count : " + count);
        if (count == 0) {
            return "LDW-001";
        }

        String last_id = ldwPaymentRepo.getLastID();
        System.out.println("last_id : " + last_id);

        int tempId = Integer.parseInt(last_id.split("-")[1]);
        System.out.println("tempId : " + tempId);
        tempId = tempId + 1;

        if (tempId <= 9) {
            System.out.println("LDW-00" + tempId);
            return "LDW-00" + tempId;
        } else if (tempId <= 99) {
            return "LDW-0" + tempId;
        }else {
            return "LDW-" + tempId;
        }
    }

    @Override
    public LDWPaymentDTO searchLDWPayment(String fee_id) {
        if (ldwPaymentRepo.existsById(fee_id)) {
            return mapper.map(ldwPaymentRepo.findById(fee_id), LDWPaymentDTO.class);
        } else {
            throw new RuntimeException("No Loss Damage Waiver Payment with Fee ID " + fee_id);
        }
    }

    @Override
    public LDWPaymentDTO saveLDWPayment(LDWPaymentDTO dto) {
        if (!ldwPaymentRepo.existsById(dto.getFee_id())) {
            return mapper.map(ldwPaymentRepo.save(mapper.map(dto, LDWPayment.class)), LDWPaymentDTO.class);
        } else {
            throw new RuntimeException(" Loss Damage Waiver Payment Already Exists for ID " + dto.getFee_id() + " ...");
        }
    }

    @Override
    public LDWPaymentDTO updateLDWPayment(LDWPaymentDTO dto) {
        if (ldwPaymentRepo.existsById(dto.getFee_id())) {
            return mapper.map(ldwPaymentRepo.save(mapper.map(dto, LDWPayment.class)), LDWPaymentDTO.class);
        } else {
            throw new RuntimeException("No Such Loss Damage Waiver Payment...Please check the Fee ID...");
        }
    }

    @Override
    public void deleteLDWPayment(String fee_id) {
        if (ldwPaymentRepo.existsById(fee_id)) {
            ldwPaymentRepo.deleteById(fee_id);
        } else {
            throw new RuntimeException("No Such Loss Damage Waiver Payment...Please check the Fee ID...");
        }
    }
}
