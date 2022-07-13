package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.RentalDetailDTO;
import lk.easycar.spring.dto.RentalPaymentDTO;
import lk.easycar.spring.entity.*;
import lk.easycar.spring.repo.*;
import lk.easycar.spring.service.RentalPaymentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RentalPaymentServiceImpl implements RentalPaymentService {

    @Autowired
    private RentalPaymentRepo rentalPaymentRepo;

    @Autowired
    private RentalRequestRepo rentalRequestRepo;

    @Autowired
    private RentalDetailRepo rentalDetailRepo;

    @Autowired
    private LDWPaymentRepo ldwPaymentRepo;

    @Autowired
    private CarRepo carRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<RentalPaymentDTO> getAllRentalPayments() {
        return mapper.map(rentalPaymentRepo.findAll(), new TypeToken<List<RentalPaymentDTO>>() {
        }.getType());
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
        String nextPaymentID = this.generateNextPaymentID();
        dto.setFee_id(nextPaymentID);
        if (!rentalPaymentRepo.existsById(nextPaymentID)) {
            return mapper.map(rentalPaymentRepo.save(mapper.map(dto, RentalPayment.class)), RentalPaymentDTO.class);
        } else {
            throw new RuntimeException(" Rental Payment Already Exists for Fee ID " + nextPaymentID + " ...");
        }
    }

    @Override
    public double calculatePaymentForEachCar(RentalDetailDTO dto) {
        System.out.println("----------------1---------------------");
        /**Get Rental Duration of the Rented Car*/
        String duration = rentalRequestRepo.getRentalDuration(dto.getRental_id());

        if (duration == null) {
            throw new RuntimeException("Pick Up and Return Dates have not been specified...");
        }

        double rentalDuration = Double.parseDouble(duration);
        System.out.println("rentalDuration : " + rentalDuration);

        double rentalFeeForTheRentedDuration = 0.0; // = duration * rate
        double km_charged = 0.0;
        double priceForExtraKM_travelled = 0.0; // = km_charged * price_extraKM
        double driver_charges = 0.0;

        /** Calculate Total KM Travelled */  // 500 KM
        double km_atPickUp = rentalDetailRepo.getReferenceById(new RentalCar_PK(dto.getRental_id(), dto.getReg_no())).getKm_atPickUp();
        double km_travelled = dto.getKm_atReturn() - km_atPickUp;

        System.out.println("----------------2---------------------");
        System.out.println("km_atPickUp : " + km_atPickUp);
        System.out.println("km_travelled : " + km_travelled);

        /** Get the Price per Extra KM */
        double price_extraKM = carRepo.getReferenceById(dto.getReg_no()).getPrice_extraKM();
        System.out.println("price_extraKM : " + price_extraKM);

        if (rentalDuration > 30) { // if duration is in months
            System.out.println("----------------3---------------------");
            /**Get Monthly Rate for the Rented Car*/
            double monthlyRate = carRepo.getReferenceById(dto.getReg_no()).getMonthlyRate();
            rentalDuration = rentalDuration / 30; // if 45 days -> 1 month & 15 days --> 1.5
            rentalFeeForTheRentedDuration = rentalDuration * monthlyRate; // 64,350 * 1.5

            /** Get Free KM for a Month */
            double freeKM_month = carRepo.getReferenceById(dto.getReg_no()).getFreeKM_month();

            /** Calculate the Extra KM Travelled --> (km_travelled - (freeKM_month * duration)) */
            km_charged = km_travelled - (freeKM_month * rentalDuration);

        } else if (rentalDuration <= 30) { // if duration is in days
            System.out.println("----------------4---------------------");
            /** Get Daily Rate for the Rented Car*/
            double dailyRate = carRepo.getReferenceById(dto.getReg_no()).getDailyRate();
            System.out.println("dailyRate : " + dailyRate);
            rentalFeeForTheRentedDuration = rentalDuration * dailyRate; // if 3 days -> 3 * 2500
            System.out.println("rentalFeeForTheRentedDuration : " + rentalFeeForTheRentedDuration);

            /** Get Free KM for a Day */ // if 100KM
            double freeKM_day = carRepo.getReferenceById(dto.getReg_no()).getFreeKM_day();
            System.out.println("freeKM_day : " + freeKM_day);

            /** Calculate the Extra KM Travelled --> (km_travelled - (freeKM_day * duration)) */
            km_charged = km_travelled - (freeKM_day * rentalDuration);
            System.out.println("km_charged : " + km_charged);
        }

        /** Calculate the Price for the Extra KM travelled --> (km_charged * price_extraKM) */
        priceForExtraKM_travelled = km_charged * price_extraKM;
        System.out.println("priceForExtraKM_travelled : " + priceForExtraKM_travelled);

        /** Calculate Price For Driver, if was Required */
        RentalDetail rentalDetail = rentalDetailRepo.getReferenceById(new RentalCar_PK(dto.getRental_id(), dto.getReg_no()));
        String driverStatus = rentalDetail.getDriverStatus();
        System.out.println("driverStatus : " + driverStatus);

        if (driverStatus.equals("Required")) {
            driver_charges = 1000.0;
        }

        /** Calculate Amount that should be returned to the Customer from LDW --> (ldwPayment - feeDeductedFromLDW)*/
        double feeDeductedFromLDW = dto.getFeeDeductedFromLDW();
        CarFleet fleet = carRepo.getReferenceById(dto.getReg_no()).getFleet();
        System.out.println(fleet.toString());

        double ldwPayment = ldwPaymentRepo.getLDWPaymentByFleet(fleet).getFee();
        System.out.println("ldwPayment : " + ldwPayment);

        double amountToReturn = ldwPayment - feeDeductedFromLDW;
        System.out.println("amountToReturn : " + amountToReturn);

        /** Calculate the Rental Payment for a given particular rental detail --> (RNTL-0001, PB-5951) */
        double rental_payment = (rentalFeeForTheRentedDuration + priceForExtraKM_travelled + driver_charges + feeDeductedFromLDW)/* - amountToReturn*/;
        System.out.println("rental_payment : " + rental_payment);

        /** Update Rental Details after Return --> km_atReturn & feeDeductedFromLDW*/
        int i = rentalDetailRepo.updateDetailsAfterReturn(dto.getRental_id(), dto.getReg_no(), feeDeductedFromLDW, dto.getKm_atReturn(), km_travelled);
        System.out.println("i : " + i);

        if (i != 1) {
            System.out.println("----------------5---------------------");
            throw new RuntimeException("Couldn't update Return Details of Reg No " + dto.getReg_no() + " under Rental ID " + dto.getRental_id());

        } else {
            System.out.println("----------------6---------------------");
            /** Save Rental Payment */
            String nextPaymentID = this.generateNextPaymentID();
            System.out.println("nextPaymentID : " + nextPaymentID);

            RentalRequest rentalRequest = rentalRequestRepo.getReferenceById(dto.getRental_id());
            Car car = carRepo.getReferenceById(dto.getReg_no());
//            System.out.println("rentalRequest : "+rentalRequest);
//            System.out.println("car : "+car);
//            RentalPayment rentalPayment = new RentalPayment(nextPaymentID, rental_payment, new RentalRequest(dto.getRental_id()), new Car(dto.getReg_no()));

            System.out.println("----------------7---------------------");
            RentalPayment rentalPayment = new RentalPayment(nextPaymentID, rental_payment, rentalRequest, car);
            /*RentalPayment payment = */
            rentalPaymentRepo.save(rentalPayment);
//            System.out.println("payment : "+payment.getFee());

            System.out.println("----------------8---------------------");
//            RentalPayment payment = rentalPaymentRepo.getReferenceById(nextPaymentID);
//            System.out.println(payment);
//            return mapper.map(payment,RentalPaymentDTO.class);
            return rental_payment;
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

    private String generateNextPaymentID() {
        long count = rentalPaymentRepo.count();
        System.out.println("count : " + count);
        if (count == 0) { // if first payment to be added
            return "RF-0001";
        }

        //List<RentalPayment> payments = rentalPaymentRepo.findAll(Sort.by(Sort.Direction.DESC, "fee_id"));
        //String lastRentalFee_Id = payments.get(0).getFee_id();
        String lastRentalFee_Id = rentalPaymentRepo.getLastPaymentID();
        System.out.println("lastRentalFee_Id : " + lastRentalFee_Id);

        int tempId = Integer.parseInt(lastRentalFee_Id.split("-")[1]);
        System.out.println("tempId : " + tempId);
        tempId = tempId + 1;

        if (tempId <= 9) {
            System.out.println("RF-000" + tempId);
            return "RF-000" + tempId;
        } else if (tempId <= 99) {
            return "RF-00" + tempId;
        } else if (tempId <= 999) {
            return "RF-0" + tempId;
        } else {
            return "RF-" + tempId;
        }
    }
}
