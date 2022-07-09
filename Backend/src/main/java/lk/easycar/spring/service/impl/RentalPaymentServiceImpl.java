package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.dto.LDWPaymentDTO;
import lk.easycar.spring.dto.RentalPaymentDTO;
import lk.easycar.spring.entity.LDWPayment;
import lk.easycar.spring.entity.RentalPayment;
import lk.easycar.spring.repo.RentalPaymentRepo;
import lk.easycar.spring.service.RentalPaymentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RentalPaymentServiceImpl implements RentalPaymentService {

    @Autowired
    private RentalPaymentRepo rentalPaymentRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<RentalPaymentDTO> getAllRentalPayments() {
        return mapper.map(rentalPaymentRepo.findAll(), new TypeToken<List<RentalPaymentDTO>>(){}.getType());
    }

    @Override
    public RentalPaymentDTO searchRentalPayment(String fee_id) {
        if (rentalPaymentRepo.existsById(fee_id)) {
            return mapper.map(rentalPaymentRepo.findById(fee_id), RentalPaymentDTO.class);
        } else {
            throw new RuntimeException("No Rental Payment with Fee ID " + fee_id);
        }
    }

    @Override
    public RentalPaymentDTO saveRentalPayment(RentalPaymentDTO dto) {
        if (!rentalPaymentRepo.existsById(dto.getFee_id())) {
            return mapper.map(rentalPaymentRepo.save(mapper.map(dto, RentalPayment.class)), RentalPaymentDTO.class);
        } else {
            throw new RuntimeException(" Rental Payment Already Exists for Fee ID " + dto.getFee_id() + " ...");
        }
    }

    @Override
    public RentalPaymentDTO updateRentalPayment(RentalPaymentDTO dto) {
        if (rentalPaymentRepo.existsById(dto.getFee_id())) {
            return mapper.map(rentalPaymentRepo.save(mapper.map(dto, RentalPayment.class)), RentalPaymentDTO.class);
        } else {
            throw new RuntimeException("No Such Rental Payment...Please check the Fee ID...");
        }
    }

    @Override
    public void deleteRentalPayment(String fee_id) {
        if (rentalPaymentRepo.existsById(fee_id)) {
            rentalPaymentRepo.deleteById(fee_id);
        } else {
            throw new RuntimeException("No Such Rental Payment...Please check the Fee ID...");
        }
    }
}
