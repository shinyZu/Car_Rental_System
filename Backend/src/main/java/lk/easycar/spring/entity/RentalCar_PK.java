package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class RentalCar_PK implements Serializable {

    private String rental_id;
    private String reg_no;
}
