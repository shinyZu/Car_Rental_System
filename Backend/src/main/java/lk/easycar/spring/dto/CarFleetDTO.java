package lk.easycar.spring.dto;

import lk.easycar.spring.entity.CarFleet;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CarFleetDTO {
    private String fleet_id;
    private String description;
    private int noOfCars;

    public CarFleetDTO(String fleet_id) {
        this.fleet_id = fleet_id;
    }
}
