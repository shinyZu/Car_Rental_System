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
public class Customer {

    @Id
    private String nic_no;
    private String license_no;
    private String email;
    private String password;
    private String address;
    private int contact_no;

//    @OneToMany(mappedBy = "customer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    private List<RentalRequest> rentalRequestList = new ArrayList<>();

}
