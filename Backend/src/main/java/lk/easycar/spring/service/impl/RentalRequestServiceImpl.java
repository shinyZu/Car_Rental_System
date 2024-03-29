package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.Custom;
import lk.easycar.spring.dto.CustomDTO;
import lk.easycar.spring.dto.RentalRequestDTO;
import lk.easycar.spring.entity.*;
import lk.easycar.spring.repo.*;
import lk.easycar.spring.service.RentalRequestService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
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
    public List<CustomDTO> getAllRentalsRequests() {
        ArrayList<CustomDTO> requests = new ArrayList<>();
        for (Custom request : rentalRequestRepo.getAllRentalsRequests()) {
            requests.add(new CustomDTO(
                    request.getRental_id(),
                    request.getLicense_no(),
                    request.getReg_no(),
                    request.getPickUp_date(),
                    request.getPickUp_time(),
                    request.getPickUp_venue(),
                    request.getReturn_date(),
                    request.getReturn_time(),
                    request.getReturn_venue(),
                    request.getRequestStatus(),
                    request.getNic_no(),
                    request.getKm_atPickUp(),
                    request.getKm_atReturn(),
                    request.getTotalPaymentForRental()
            ));
        }
        return requests;
    }

    @Override
    public String generateNextID() {
        long count = rentalRequestRepo.count();
        System.out.println("count : " + count);
        if (count == 0) {
            return "RNTL-0001";
        }

        String last_id = rentalRequestRepo.getLastID();
        System.out.println("last_id : " + last_id);

        int tempId = Integer.parseInt(last_id.split("-")[1]);
        System.out.println("tempId : " + tempId);
        tempId = tempId + 1;

        if (tempId <= 9) {
            System.out.println("RNTL-000" + tempId);
            return "RNTL-000" + tempId;
        } else if (tempId <= 99) {
            return "RNTL-00" + tempId;
        } else if (tempId <= 999) {
            return "RNTL-0" + tempId;
        } else {
            return "RNTL-" + tempId;
        }
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
    public List<CustomDTO> searchRentalByIDAndRegNo(String rental_id, String reg_no) {
        ArrayList<CustomDTO> returnDetails = new ArrayList<>();
        for (Custom custom : rentalRequestRepo.searchRentalByIDAndRegNo(rental_id, reg_no)) {
            returnDetails.add(new CustomDTO(
                    custom.getRental_id(),
                    custom.getLicense_no(),
                    custom.getReg_no(),
                    custom.getPickUp_date(),
                    custom.getPickUp_time(),
                    custom.getPickUp_venue(),
                    custom.getReturn_date(),
                    custom.getReturn_time(),
                    custom.getReturn_venue(),
                    custom.getNic_no(),
                    custom.getKm_atPickUp(),
                    custom.getDriverStatus(),
                    custom.getFee()
            ));
        }
        return returnDetails;
    }

    @Override
    public String getRentalDuration(String rental_id) {
        return rentalRequestRepo.getRentalDuration(rental_id);
    }

    @Override
    public RentalRequestDTO searchActiveRentalByCustomer(String nic_no) {
        if (customerRepo.existsById(nic_no)) {
            RentalRequest activeRental = rentalRequestRepo.getRentalRequestByCustomer(nic_no, "Active");
            if (activeRental != null) {
                return mapper.map(activeRental, RentalRequestDTO.class);

            } else {
                throw new RuntimeException("Customer with NIC " + nic_no + " have no any active Rentals currently... Please check the Customer NIC...");
            }

        } else {
            throw new RuntimeException("No Customer with NIC No " + nic_no + "... Please check the Customer NIC...");
        }
    }

    @Override
    public List<CustomDTO> getAllReturns() {
        ArrayList<CustomDTO> returns = new ArrayList<>();
        for (Custom custom : rentalRequestRepo.getAllReturns("Active")) {
            returns.add(new CustomDTO(
                    custom.getRental_id(),
                    custom.getLicense_no(),
                    custom.getReg_no(),
                    custom.getNic_no(),
                    custom.getKm_atPickUp()
//                    custom.getKm_atReturn()
            ));
        }
        return returns;
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
    public double calculateTotalPaymentForRental(String rental_id) {
        if (rentalRequestRepo.existsById(rental_id)) {
            List<Double> allRentalPayments = rentalPaymentRepo.getAllRentalPayments(rental_id);
            double totalPayment = 0.0;
            for (Double payment : allRentalPayments) {
                totalPayment += payment;
            }
            RentalRequest rentalRequest = rentalRequestRepo.getReferenceById(rental_id);
            rentalRequest.setTotalPaymentForRental(totalPayment);
            return totalPayment;
        } else {
            throw new RuntimeException("No Such Rental..Please check the Rental ID...");
        }
    }

    @Override
    public double calculateAmountToReturn(String rental_id) {
        if (rentalRequestRepo.existsById(rental_id)) {
            RentalRequest rentalRequest = rentalRequestRepo.getReferenceById(rental_id);
            if (rentalRequest.getTotalPaymentForRental() != 0) { // if only payment has been calculated calculate the amount to return
                double amountToReturn = 0.0;
                for (RentalDetail detail : rentalRequest.getRentalDetails()) {
                    /** Get LDW fee of each Car */
                    CarFleet fleet = carRepo.getReferenceById(detail.getReg_no()).getFleet();
                    double fee_LDW = ldwPaymentRepo.getLDWPaymentByFleet(fleet).getFee();
                    double fee_deducted = detail.getFeeDeductedFromLDW();
                    amountToReturn += (fee_LDW - fee_deducted);

                    if (detail.getDriverStatus().equals("Required")) {
                        detail.getDriver().setCurrentStatus("Available");
                    }
                }
                rentalRequest.setAmountToReturn(amountToReturn);
                rentalRequest.setRequestStatus("Returned");
                return amountToReturn;
            } else {
                throw new RuntimeException("Total Payment haven't done yet...Please process the Payment");
            }

        } else {
            throw new RuntimeException("No Such Rental..Please check the Rental ID...");
        }
    }

    /* @Override
     public double calculateDailyIncome(LocalDate date) {
             List<RentalRequest> allPaymentsByDate = rentalRequestRepo.getAllPaymentsByDate(date);
             double daily_income = 0.0;
             for (RentalRequest request : allPaymentsByDate) {
                 daily_income += request.getTotalPaymentForRental();
             }
             return double;
         }*/

    @Override
    public List<CustomDTO> calculateDailyIncome(LocalDate date) {
        ArrayList<CustomDTO> dailyIncome = new ArrayList<>();

        List<Custom> dailyIncomeList = rentalRequestRepo.calculateDailyIncome(date);
        for (Custom custom : dailyIncomeList) {
            dailyIncome.add(new CustomDTO(
                    custom.getYear(),
                    custom.getMonth(),
                    custom.getWeek(),
                    custom.getDay(),
                    custom.getIncome()
            ));
            System.out.println(custom.getYear());
            System.out.println(custom.getMonth());
            System.out.println(custom.getWeek());
            System.out.println(custom.getDay());
            System.out.println(custom.getIncome());

        }
        return dailyIncome;
//        return mapper.map(dailyIncomeList,new TypeToken<Collection<CustomDTO>>(){}.getType());
    }

    /*@Override
    public double calculateMonthlyIncome(int month) {
        List<RentalRequest> allPaymentsByDate = rentalRequestRepo.getAllPaymentsByMonth(month);
        double monthly_income = 0.0;
        for (RentalRequest request : allPaymentsByDate) {
            monthly_income += request.getTotalPaymentForRental();
        }
        return monthly_income;
    }*/

    @Override
    public List<CustomDTO> calculateMonthlyIncome() {
        ArrayList<CustomDTO> monthlyIncome = new ArrayList<>();
        for (Custom custom : rentalRequestRepo.calculateMonthlyIncome()) {
            monthlyIncome.add(new CustomDTO(
                    custom.getYear(),
                    custom.getMonth(),
                    custom.getIncome()
            ));
        }
        return monthlyIncome;
    }

    @Override
    public List<CustomDTO> calculateWeeklyIncome(String date) {
        int year = LocalDate.parse(date).getYear();
        int monthValue = LocalDate.parse(date).getMonthValue();
        String d = null;
        if (monthValue < 10) {
            d = year+"-0"+monthValue+"__";
        } else {
            d = year+"-"+monthValue+"__";
        }

        ArrayList<CustomDTO> weeklyIncome = new ArrayList<>();

        List<Custom> weeklyIncomeList = rentalRequestRepo.calculateWeeklyIncome(d);
        for (Custom custom : weeklyIncomeList) {
            weeklyIncome.add(new CustomDTO(
                    custom.getYear(),
                    custom.getMonth(),
                    custom.getWeek(),
                    custom.getIncome()
            ));
        }
        return weeklyIncome;
    }

    /*@Override
    public List<CustomDTO> calculateWeeklyIncome() {
        ArrayList<CustomDTO> weeklyIncome = new ArrayList<>();

        List<Custom> weeklyIncomeList = rentalRequestRepo.calculateWeeklyIncome();
        for (Custom custom : weeklyIncomeList) {
            weeklyIncome.add(new CustomDTO(
                    custom.getYear(),
                    custom.getMonth(),
                    custom.getWeek(),
                    custom.getIncome()
            ));
        }
        return weeklyIncome;
    }*/

    /*@Override
    public double calculateAnnualIncome(String date) {
        List<RentalRequest> allPaymentsByDate = rentalRequestRepo.getAllPaymentsForYear(LocalDate.parse(date).getYear());
        double annual_income = 0.0;
        for (RentalRequest request : allPaymentsByDate) {
            annual_income += request.getTotalPaymentForRental();
        }
        return annual_income;
    }*/

    @Override
    public List<CustomDTO> calculateAnnualIncome() {
        ArrayList<CustomDTO> annualIncome = new ArrayList<>();

        List<Custom> annualIncomeList = rentalRequestRepo.calculateAnnualIncome();
        for (Custom custom : annualIncomeList) {
            annualIncome.add(new CustomDTO(
                    custom.getYear(),
                    custom.getIncome()
            ));
        }
        return annualIncome;
    }

    @Override
    public List<CustomDTO> getCustomerBookings(String nic_no) {
        ArrayList<CustomDTO> bookings = new ArrayList<>();
        for (Custom custom : rentalRequestRepo.getCustomerBookings(nic_no)) {
            bookings.add(new CustomDTO(
                    custom.getRental_id(),
                    custom.getContact_no(),
                    custom.getReg_no(),
                    custom.getPickUp_date(),
                    custom.getPickUp_time(),
                    custom.getPickUp_venue(),
                    custom.getReturn_date(),
                    custom.getReturn_time(),
                    custom.getReturn_venue(),
                    custom.getRequestStatus(),
                    custom.getTotalPaymentForRental(),
                    custom.getDriverStatus(),
                    custom.getBrand()
            ));
        }
        return bookings;
    }

    @Override
    public boolean placeRentalRequest(RentalRequestDTO dto) {
        System.out.println("--------------------------" + dto.getPickUp_time());
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
