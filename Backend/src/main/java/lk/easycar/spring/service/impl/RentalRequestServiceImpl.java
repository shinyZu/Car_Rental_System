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

    /*@Override
    public boolean placeRentalRequest(RentalRequestDTO dto) {
        RentalRequest rentalRequest = mapper.map(dto, RentalRequest.class);
        if (!rentalRequestRepo.existsById(dto.getRental_id())) {
            rentalRequestRepo.save(rentalRequest);

            if (dto.getRentalDetails().size() < 1) throw new RuntimeException("No Cars have being chosen to place the Rental Request..!");

            //update the no of Cars in Car Fleet
            for (RentalDetail rentalDetail : rentalRequest.getRentalDetails()) {
                Car car = carRepo.findById(rentalDetail.getReg_no()).get();
                CarFleet fleet = car.getFleet();
                fleet.setNoOfCars(fleet.getNoOfCars() - 1);
                carFleetRepo.save(fleet);
            }
            return true;

        } else {
            throw new RuntimeException("Failed to Place the Rental..!, A Request with ID " + dto.getRental_id() + " Already Exist.!");
        }
    }*/

    @Override
    public boolean placeRentalRequest(RentalRequestDTO dto) {
        System.out.println("---------1-------------");
        RentalRequest rentalRequest = mapper.map(dto, RentalRequest.class);
        List<RentalDetail> rentalDetails = rentalRequest.getRentalDetails();

        for (RentalDetail rentalDetail : rentalDetails) {
            System.out.println("---------2-------------");
            if (rentalDetail.getDriverStatus().equals("Required")) { // if a Driver is requested by the Customer
                System.out.println("---------3-------------");
                List<Driver> listOfAvailableDrivers = driverRepo.getAllAvailableDrivers("Available");
                rentalDetail.setDriver(listOfAvailableDrivers.get(0)); // Assign a Driver to the RentalDetail
                listOfAvailableDrivers.get(0).setCurrentStatus("Occupied"); // Update the Driver Status
            }
        }
        System.out.println("---------4-------------");

        if (!rentalRequestRepo.existsById(dto.getRental_id())) {
            rentalRequestRepo.save(rentalRequest);

            if (dto.getRentalDetails().size() < 1) throw new RuntimeException("No Cars have being chosen to place the Rental Request..!");

            //update the no of Cars in Car Fleet
            for (RentalDetail rentalDetail : rentalRequest.getRentalDetails()) {
                Car car = carRepo.findById(rentalDetail.getReg_no()).get();
                CarFleet fleet = car.getFleet();
                fleet.setNoOfCars(fleet.getNoOfCars() - 1);
                carFleetRepo.save(fleet);
            }
            return true;

        } else {
            throw new RuntimeException("Failed to Place the Rental..!, A Request with ID " + dto.getRental_id() + " Already Exist.!");
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
        /*if (rentalRequestRepo.existsById(dto.getRental_id())) {

            RentalRequest rentalRequest = mapper.map(dto, RentalRequest.class);
            if (dto.getRentalDetails().size() < 1) throw new RuntimeException("No Cars have being chosen for the Rental Request..!");

            for (RentalDetail rentalDetail : rentalRequest.getRentalDetails()) {
                Car car = carRepo.findById(rentalDetail.getReg_no()).get();
                CarFleet fleet = car.getFleet();
                RentalDetail previous = rentalDetailRepo.findById(new RentalCar_PK(rentalDetail.getRental_id(), rentalDetail.getReg_no())).get();

                //update the no of Cars in Car Fleet
                int newQty = 1;
                int prevQty = previous.getQty();
                if (newQty > prevQty) {
                    int dif = newQty - prevQty;
                    item.setQtyOnHand(item.getQtyOnHand() - dif);
                } else if (newQty < prevQty) {
                    int dif = prevQty - newQty;
                    item.setQtyOnHand(item.getQtyOnHand() + dif);
                }
                itemRepo.save(item);
            }
            //then delete the old order
            ordersRepo.deleteById(dto.getOid());
            //finally update the new order
            ordersRepo.save(order);
        } else {
            throw new RuntimeException("Failed to Update the Rental..!, A Request with ID " + dto.getRental_id() + " Doesn\'t Exist.!");
        }*/
        return null;
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
