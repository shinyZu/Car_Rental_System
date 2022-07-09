package lk.easycar.spring.service;

import lk.easycar.spring.dto.LDWPaymentDTO;

import java.util.List;

public interface LDWPaymentService {
    List<LDWPaymentDTO> getAllLDWPayments();

    LDWPaymentDTO searchLDWPayment(String fee_id);

    LDWPaymentDTO saveLDWPayment(LDWPaymentDTO dto);

    LDWPaymentDTO updateLDWPayment(LDWPaymentDTO dto);

    void deleteLDWPayment(String fee_id);
}
