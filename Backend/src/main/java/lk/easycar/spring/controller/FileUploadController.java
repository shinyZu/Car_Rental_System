package lk.easycar.spring.controller;

import lk.easycar.spring.util.ResponseUtil;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;

@RestController
@CrossOrigin
@RequestMapping("api/v1/upload")
public class FileUploadController {

    private static final ArrayList<String> allImages = new ArrayList<>();
    private static String projectPath;


    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllUploadedImages() {
        return new ResponseUtil(HttpServletResponse.SC_OK, "Car View Uploaded", allImages );
    }

    @PostMapping(path = "cars", params = {"fleet"}, consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadCarViews(@RequestPart("myFile") MultipartFile myFile, @RequestParam("fleet") String carFleet) {
        try {
            projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
            System.out.println("projectPath : "+projectPath); // --> /opt/apache-tomcat-8.5.78/webapps/easycar

            File uploadsDir = new File(projectPath + "/uploads");
            System.out.println("uploadsDir : "+uploadsDir); // --> /opt/apache-tomcat-8.5.78/webapps/easycar/uploads
            uploadsDir.mkdir();

            File carDir = new File(uploadsDir + "/cars");
            System.out.println("carDir : " + carDir); // --> /opt/apache-tomcat-8.5.78/webapps/easycar/uploads/cars
            carDir.mkdir();


            if (carFleet.equals("General")) {
                File generalDir = new File(carDir + "/General Cars");
                System.out.println("generalDir : " + generalDir); // --> /opt/apache-tomcat-8.5.78/webapps/easycar/uploads/cars/General Cars
                generalDir.mkdir();

                myFile.transferTo(new File(generalDir.getAbsolutePath() + "/" + myFile.getOriginalFilename()));
                allImages.add("uploads/cars/General Cars" + myFile.getOriginalFilename());

            } else if (carFleet.equals("Premium")) {
                File premiumDir = new File(carDir + "/Premium Cars");
                System.out.println("premiumDir : " + premiumDir); // --> /opt/apache-tomcat-8.5.78/webapps/easycar/uploads/cars/Premium Cars
                premiumDir.mkdir();

                myFile.transferTo(new File(premiumDir.getAbsolutePath() + "/" + myFile.getOriginalFilename()));
                allImages.add("uploads/cars/Premium Cars" + myFile.getOriginalFilename());

            } else if (carFleet.equals("Luxury")) {
                File luxuryDir = new File(carDir + "/Luxury Cars");
                System.out.println("luxuryDir : " + luxuryDir); // --> /opt/apache-tomcat-8.5.78/webapps/easycar/uploads/cars/Luxury Cars
                luxuryDir.mkdir();

                myFile.transferTo(new File(luxuryDir.getAbsolutePath() + "/" + myFile.getOriginalFilename()));
                allImages.add("uploads/cars/Luxury Cars" + myFile.getOriginalFilename());
            }

            return new ResponseUtil(HttpServletResponse.SC_OK, "Car View Uploaded Successfully", null );

        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
            return new ResponseUtil(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage(), null );
        }
    }

    @PostMapping(path = "customers", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadCustomerNIC_and_License(@RequestPart("myFile") MultipartFile myFile) {
        try {
            projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();

            File uploadsDir = new File(projectPath + "/uploads");
            uploadsDir.mkdir();

            File customerDir = new File(uploadsDir + "/customers");
            System.out.println("customerDir : " + customerDir); // --> /opt/apache-tomcat-8.5.78/webapps/easycar/uploads/customers
            customerDir.mkdir();

            myFile.transferTo(new File(customerDir.getAbsolutePath() + "/" + myFile.getOriginalFilename()));

            allImages.add("uploads/customers/" + myFile.getOriginalFilename());
            return new ResponseUtil(HttpServletResponse.SC_OK, "Customer Photos Uploaded Successfully", null );

        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
            return new ResponseUtil(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage(), null );
        }
    }

    @DeleteMapping
    public ResponseUtil deleteImage () {
        for (String image : allImages) {
        }
        return null;
    }
}
