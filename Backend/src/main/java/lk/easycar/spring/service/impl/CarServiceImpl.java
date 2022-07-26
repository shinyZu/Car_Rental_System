package lk.easycar.spring.service.impl;

import lk.easycar.spring.dto.CarDTO;
import lk.easycar.spring.dto.CarFleetDTO;
import lk.easycar.spring.dto.Custom;
import lk.easycar.spring.dto.CustomDTO;
import lk.easycar.spring.entity.Car;
import lk.easycar.spring.entity.CarFleet;
import lk.easycar.spring.repo.CarFleetRepo;
import lk.easycar.spring.repo.CarRepo;
import lk.easycar.spring.service.CarService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CarServiceImpl implements CarService {

    @Autowired
    private CarRepo carRepo;

    @Autowired
    private CarFleetRepo carFleetRepo;

    @Autowired
    private ModelMapper mapper;

    @Override
    public List<CarDTO> getAllCars() {
        return mapper.map(carRepo.findAll(), new TypeToken<List<CarDTO>>() {
        }.getType());
    }

    @Override
    public CarDTO searchCar(String reg_no) {
        if (carRepo.existsById(reg_no)) {
            return mapper.map(carRepo.findById(reg_no), CarDTO.class);
        } else {
            throw new RuntimeException("No Car with Reg_No " + reg_no);
        }
    }

    @Override
    public int getNoOfCarsByStatus(String status) {
        return carRepo.countCarsByCurrentStatus(status);
    }

    @Override
    public List<CustomDTO> getCarSchedule(String reg_no) {
       /* ArrayList<CustomDTO> schedule = new ArrayList<>();
        for (Custom custom : carRepo.getCarSchedule(reg_no)) {
            schedule.add(new CustomDTO(
                    custom.getRental_id(),
                    custom.getLicense_no(),
                    custom.getCurrentStatus(),
                    custom.getContact_no(),
                    custom.getReg_no(),
                    custom.getPickUp_date(),
                    custom.getPickUp_time(),
                    custom.getPickUp_venue(),
                    custom.getReturn_date(),
                    custom.getReturn_time(),
                    custom.getReturn_venue(),
                    custom.getRequestStatus()
            ));
        }
        return schedule;*/
        List<Custom> list = carRepo.getCarSchedule(reg_no);
        return mapper.map(list, new TypeToken<List<CustomDTO>>(){}.getType());
    }

    @Override
    public List<CustomDTO> getCarsByDate(CustomDTO dto) {
        /*ArrayList<CustomDTO> schedule = new ArrayList<>();
        for (Custom custom : carRepo.getCarsByDate(dto.getPickUp_date(),dto.getCurrentStatus())) {
            schedule.add(new CustomDTO(
                    custom.getRental_id(),
                    custom.getLicense_no(),
                    custom.getCurrentStatus(),
                    custom.getContact_no(),
                    custom.getReg_no(),
                    custom.getPickUp_date(),
                    custom.getPickUp_time(),
                    custom.getPickUp_venue(),
                    custom.getReturn_date(),
                    custom.getReturn_time(),
                    custom.getReturn_venue(),
                    custom.getRequestStatus()
            ));
        }
        return schedule;*/
        List<Custom> list = carRepo.getCarsByDate(dto.getPickUp_date(), dto.getCurrentStatus());
        return mapper.map(list, new TypeToken<List<CustomDTO>>(){}.getType());
    }

    @Override
    public List<CarDTO> sortCarsByNoOfPassengers(int noOfPassengers) {
        return mapper.map(carRepo.getCarsByNoOfPassengersEquals(noOfPassengers), new TypeToken<List<CarDTO>>(){}.getType());
    }

    @Override
    public List<CarDTO> sortCarsByTransmissionType(String type) {
        return mapper.map(carRepo.getCarsByTransmissionTypeEquals(type),new TypeToken<List<CarDTO>>(){}.getType());
    }

    @Override
    public List<CarDTO> sortCarsByBrand(String brand) {
        return mapper.map(carRepo.getCarsByBrandIsContaining(brand),new TypeToken<List<CarDTO>>(){}.getType());
    }

    @Override
    public List<CarDTO> sortCarsByCarFleet(String fleet) {
        return mapper.map(carRepo.getCarsByFleet(fleet),new TypeToken<List<CarDTO>>(){}.getType());
    }

    @Override
    public List<CarDTO> sortCarsByPrice(double price) {
        return null;
    }

    @Override
    public List<CarDTO> sortCarsByFuelType(String fuel_type) {
        return mapper.map(carRepo.getCarsByFuelTypeEquals(fuel_type),new TypeToken<List<CarDTO>>(){}.getType());
    }

    @Override
    public CarDTO saveCar(CarDTO dto) {
        if (!carRepo.existsById(dto.getReg_no())) {
//            String fleet_id = dto.getFleet().getFleet_id(); // fleet_id of the Car to be added
            /*System.out.println(fleet_id); // General
            System.out.println(dto.getFleet()); // CarFleet(fleet_id=General, description=null, noOfCars=0)
            System.out.println(dto.getFleet().getDescription()); // null
            CarFleetDTO carFleetDTO = new CarFleetDTO(dto.getFleet().getFleet_id());*/
            String fleetID = carFleetRepo.getCarFleetByDescription(dto.getFleet().getFleet_id());

            if (fleetID != null) { // if an existing fleet
//            if (carFleetRepo.existsById(fleet_id)) { // checks whether the car which is going to be added is a Car of an existing Fleet
                System.out.println("exist...................");
                dto.setFleet(new CarFleet(fleetID));
                dto.setCurrentStatus("Available");
                CarDTO carDTO = mapper.map(carRepo.save(mapper.map(dto, Car.class)), CarDTO.class);// save Car

//                CarFleet carFleet = carFleetRepo.getReferenceById(fleet_id); // Update no of cars in the relevant Car Fleet
//                carFleet.setNoOfCars(carFleet.getNoOfCars() + 1);

                CarFleet carFleet = carFleetRepo.getReferenceById(fleetID); // Update no of cars in the relevant Car Fleet
                carFleet.setNoOfCars(carFleet.getNoOfCars()+1);

                return carDTO;

            } else { // if not the Car shouldn't be added
                throw new RuntimeException("Unable to find a CarFleet with ID "+ fleetID);
            }

        } else {
            throw new RuntimeException("Car with Reg_No "+ dto.getReg_no() +" Already Exists...");
        }
    }

    @Override
    public CarDTO updateCar(CarDTO dto) {
        if (carRepo.existsById(dto.getReg_no())) {
            return mapper.map(carRepo.save(mapper.map(dto, Car.class)), CarDTO.class);
        } else {
            throw new RuntimeException("No Such Car..Please check the Reg_No...");
        }
    }

    @Override
    public void updateCarStatus(CarDTO dto) {
        carRepo.getReferenceById(dto.getReg_no()).setCurrentStatus(dto.getCurrentStatus());
    }

    @Override
    public void deleteCar(String reg_no) {
        if (carRepo.existsById(reg_no)) {
            CarFleet carFleet = carRepo.getReferenceById(reg_no).getFleet();
            carFleet.setNoOfCars(carFleet.getNoOfCars() - 1);
            carRepo.deleteById(reg_no);
        } else {
            throw new RuntimeException("No Such Car..Please check the Reg_No...");
        }
    }
}
