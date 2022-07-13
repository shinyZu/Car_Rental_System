package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.RentalRequestDTO;
import lk.easycar.spring.entity.Car;
import lk.easycar.spring.entity.Driver;
import lk.easycar.spring.entity.RentalDetail;
import lk.easycar.spring.entity.RentalRequest;
import lk.easycar.spring.repo.*;
import lk.easycar.spring.service.RentalRequestService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class RentalRequestServiceImpl implements RentalRequestService {

    @Autowired
    DriverRepo driverRepo;
    @Autowired
    private AdminRepo adminRepo;
    @Autowired
    private CustomerRepo customerRepo;
    @Autowired
    private CarRepo carRepo;
    @Autowired
    private CarFleetRepo carFleetRepo;
    @Autowired
    private LDWPaymentRepo ldwPaymentRepo;

    @Autowired
    private RentalPaymentRepo rentalPaymentRepo;

    @Autowired
    private RentalDetailRepo rentalDetailRepo;

    @Autowired
    private RentalRequestRepo rentalRequestRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<RentalRequestDTO> getAllRentals() {
        return mapper.map(rentalRequestRepo.findAll(), new TypeToken<List<RentalRequestDTO>>() {
        }.getType());
    }

    @Override
    public RentalRequestDTO searchRental(String rental_id) {
        if (rentalRequestRepo.existsById(rental_id)) {
            return mapper.map(rentalRequestRepo.findById(rental_id), RentalRequestDTO.class);
        } else {
            throw new RuntimeException("No Rental Request with ID " + rental_id);
        }
    }

    @Override
    public RentalRequestDTO searchActiveRentalByCustomer(String nic_no) {
        if (customerRepo.existsById(nic_no)) {
            RentalRequest activeRental = rentalRequestRepo.getRentalRequestByCustomer(nic_no, "Active");
            if (activeRental!=null) {
                return mapper.map(activeRental, RentalRequestDTO.class);

            }else {
                throw new RuntimeException("Customer with NIC " + nic_no + " have no any active Rentals currently... Please check the Customer NIC...");
            }

        } else {
            throw new RuntimeException("No Customer with NIC No " + nic_no + "... Please check the Customer NIC...");
        }
    }

    @Override
    public String getRequestStatus(String rental_id) {
        return rentalRequestRepo.getRequestStatusByRental_id(rental_id);
    }

    @Override
    public int getNoOfActiveRentalsForTheDay(LocalDate date) {
//        System.out.println(date);
        return rentalRequestRepo.countActiveRentalsForTheDay("Active", date);
    }

    @Override
    public int getNoOfTotalRentalsForTheDay(LocalDate date) {
        return rentalRequestRepo.countTotalRentalsForTheDay(date);
    }

    @Override
    public boolean placeRentalRequest(RentalRequestDTO dto) {
        RentalRequest rentalRequest = mapper.map(dto, RentalRequest.class);
        List<RentalDetail> rentalDetails = rentalRequest.getRentalDetails();

        if (!(dto.getRentalDetails().size() < 1)) {

            for (RentalDetail rentalDetail : rentalDetails) {

                // Assigning of Driver & Updating Driver Status
                if (rentalDetail.getDriverStatus().equals("Required")) { // if a Driver is requested by the Customer
                    List<Driver> listOfAvailableDrivers = driverRepo.getAllAvailableDrivers("Available");
                    rentalDetail.setDriver(listOfAvailableDrivers.get(0)); // Assign a Driver to the RentalDetail
                    listOfAvailableDrivers.get(0).setCurrentStatus("Occupied"); // Update the Driver Status
                }

                // Updating Car Status --> Reserved
                Car car = carRepo.getReferenceById(rentalDetail.getReg_no());
                car.setCurrentStatus("Reserved");
            }

            System.out.println("---------5-------------");

            if (!rentalRequestRepo.existsById(dto.getRental_id())) {
                rentalRequestRepo.save(rentalRequest);
                return true;

            } else {
                throw new RuntimeException("Failed to Place the Rental..!, A Request with ID " + dto.getRental_id() + " Already Exist.!");
            }
        } else {
            throw new RuntimeException("No Cars have being chosen to place the Rental Request..!");
        }
    }

    /**
     * Things to be updated in RentalRequest
     * - update the requestStatus - Accepted, Denied
     * - totalPaymentForTheRental after the Car is Returned
     * - amountToReturn after the Car is returned
     * <p>
     * Things to be updated in RentalDetail
     * - change the driver
     * - FeeChargedFromLDW
     * - km_atReturn
     * - km_travelled
     * <p>
     * Things to be updated in Car
     * - currentStatus
     * - if Car is rented --> Reserved
     * - if Car is returned --> Available
     * - if Car is damaged --> Unavailable (these cars need maintenance)
     * - if Car is under maintenance --> Under Maintenance
     * -
     */

    @Override
    public RentalRequestDTO updateRental(RentalRequestDTO dto) {
        if (rentalRequestRepo.existsById(dto.getRental_id())) {
            return mapper.map(rentalRequestRepo.save(mapper.map(dto, RentalRequest.class)), RentalRequestDTO.class);
        } else {
            throw new RuntimeException("No Such Rental..Please check the Rental ID...");
        }
    }

    // When Request Accepted/Denied
    @Override
    public void updateRequestStatus(RentalRequestDTO dto) {
//        RentalRequest request = rentalRequestRepo.getReferenceById(dto.getRental_id());
//        request.setRequestStatus(dto.getRequestStatus());
        rentalRequestRepo.updateRequestStatus(dto.getRental_id(), dto.getRequestStatus());
    }

    @Override
    public void acceptRental(RentalRequestDTO dto) {
        this.updateRequestStatus(dto);
    }

    @Override
    public void denyRental(RentalRequestDTO dto) {
        this.updateRequestStatus(dto);
    }

    @Override
    public void deleteRental(String rental_id) {
        if (rentalRequestRepo.existsById(rental_id)) {
            rentalRequestRepo.deleteById(rental_id);
        } else {
            throw new RuntimeException("No Such Rental Request..Please check the Rental ID...");
        }
    }
}
