package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CarFleet {

    @Id
    private String fleet_id;
    private String description;
    private int noOfCars;

//    @OneToMany(mappedBy = "fleet", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    private List<Car> carList = new ArrayList<>();

    public CarFleet(String fleet_id, String description) {
        this.fleet_id = fleet_id;
        this.description = description;
    }
}
