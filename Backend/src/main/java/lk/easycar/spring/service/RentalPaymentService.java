package lk.easycar.spring.service;

import lk.easycar.spring.dto.RentalDetailDTO;
import lk.easycar.spring.dto.RentalPaymentDTO;

import java.util.List;

public interface RentalPaymentService {
    List<RentalPaymentDTO> getAllRentalPayments();

    RentalPaymentDTO searchRentalPayment(String fee_id);

    RentalPaymentDTO saveRentalPayment(RentalPaymentDTO dto);

    double calculatePaymentForEachCar(RentalDetailDTO dto);

    RentalPaymentDTO updateRentalPayment(RentalPaymentDTO dto);

    void deleteRentalPayment(String fee_id);
}
