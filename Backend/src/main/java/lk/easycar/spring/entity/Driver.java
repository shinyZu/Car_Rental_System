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

    @Id
    private String driver_id;
    private String nic_no;
    private String license_no;
    private String email;
    private String password;
    private String address;
    private String contact_no;

}
