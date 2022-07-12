package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CarFleetDTO;
import lk.easycar.spring.dto.CustomerDTO;
import lk.easycar.spring.dto.RentalDetailDTO;
import lk.easycar.spring.dto.RentalRequestDTO;
import lk.easycar.spring.entity.*;
import lk.easycar.spring.repo.*;
import lk.easycar.spring.service.RentalRequestService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RentalRequestServiceImpl implements RentalRequestService {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private CarRepo carRepo;

    @Autowired
    private CarFleetRepo carFleetRepo;

    @Autowired
    DriverRepo driverRepo;

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
        return mapper.map(rentalRequestRepo.findAll(), new TypeToken<List<RentalRequestDTO>>(){}.getType());
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
    public String getRequestStatus(String rental_id) {
        return rentalRequestRepo.getRequestStatusByRental_id(rental_id);
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

    /** Things to be updated in RentalRequest
     *      - update the requestStatus - Accepted, Denied
     *      - totalPaymentForTheRental after the Car is Returned
     *      - amountToReturn after the Car is returned
     *
     *  Things to be updated in RentalDetail
     *      - change the driver
     *      - FeeChargedFromLDW
     *      - km_atReturn
     *      - km_travelled
     *
     *  Things to be updated in Car
     *      - currentStatus
     *          - if Car is rented --> Reserved
     *          - if Car is returned --> Available
     *          - if Car is damaged --> Unavailable (these cars need maintenance)
     *          - if Car is under maintenance --> Under Maintenance
     *      -
     */

    @Override
    public RentalRequestDTO updateRental(RentalRequestDTO dto) {
        return null;
    }

    @Override
    public void updateRequestStatus(RentalRequestDTO dto) {
        RentalRequest request = rentalRequestRepo.getReferenceById(dto.getRental_id());
        request.setRequestStatus(dto.getRequestStatus());
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
