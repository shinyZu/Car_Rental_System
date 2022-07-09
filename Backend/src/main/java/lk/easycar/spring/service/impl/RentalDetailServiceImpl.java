package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.RentalDetailDTO;
import lk.easycar.spring.entity.Driver;
import lk.easycar.spring.entity.RentalDetail;
import lk.easycar.spring.repo.DriverRepo;
import lk.easycar.spring.repo.RentalDetailRepo;
import lk.easycar.spring.repo.RentalRequestRepo;
import lk.easycar.spring.service.RentalDetailService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class RentalDetailServiceImpl implements RentalDetailService {

    @Autowired
    private RentalDetailRepo rentalDetailRepo;

    @Autowired
    private RentalRequestRepo rentalRequestRepo;

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public boolean changeAssignedDriver(RentalDetailDTO dto, String license_no) {
        RentalDetail rentalDetail = mapper.map(dto, RentalDetail.class);
        Driver newDriverToBeAssigned = driverRepo.getReferenceById(license_no);

        // if the Driver to be changed is an existing Driver and also is currently Available(all clear to be assigned)
        if (driverRepo.existsById(license_no)) {

            if (newDriverToBeAssigned.getCurrentStatus().equals("Available")) {
                // Release the Currently Assigned Driver --> make Available
                String currentlyAssignedDriver = rentalDetail.getDriver().getLicense_no();
                driverRepo.updateDriverStatus(currentlyAssignedDriver,"Available");

                // Change the Current Driver & update status as Occupied
                String rental_id = rentalDetail.getRental_id();
                String reg_no = rentalDetail.getReg_no();
                rentalDetailRepo.changeAssignedDriver(rental_id, reg_no, new Driver(license_no));
                newDriverToBeAssigned.setCurrentStatus("Occupied");

            } else {
                throw new RuntimeException("Driver with License No " + license_no + " is Currently NOT AVAILABLE...\nPlease select another Driver");
            }

        } else {
            throw new RuntimeException("Driver with License No " + license_no + " doesn't exist...");
        }

        return true;
    }
}
