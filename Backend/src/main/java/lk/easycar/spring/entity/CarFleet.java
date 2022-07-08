package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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

    @OneToMany(mappedBy = "fleet", cascade = CascadeType.ALL)
    private List<Car> carList = new ArrayList<>();
}
