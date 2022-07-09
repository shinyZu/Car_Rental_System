package lk.easycar.spring.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Driver {

    //    private String driver_id;
    @Id
    private String license_no;
    private String nic_no;
    private String email;
    private String password;
    private String address;
    private int contact_no;
    private String currentStatus; // Available, Occupied

}
