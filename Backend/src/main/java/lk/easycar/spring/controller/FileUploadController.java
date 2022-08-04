package lk.easycar.spring.controller;

import lk.easycar.spring.dto.CarDTO;
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
//    private static final ArrayList<String> allImages = null;
    private static String projectPath;


    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllUploadedImages() {
        for (String image : allImages) {
            System.out.println(image);
        }
        return new ResponseUtil(HttpServletResponse.SC_OK, "All Images", allImages );
    }

    @GetMapping(path = "clear_images",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil eraseImages() {
        allImages.clear();
        return new ResponseUtil(HttpServletResponse.SC_OK, "All Images Cleared", allImages );
    }

    @GetMapping(params = {"reg_no"}, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getCarImages(@RequestParam("reg_no") String reg_no) {
        ArrayList<String> carImages = new ArrayList<>();
        for (String image : allImages) {
            boolean contains = image.contains(reg_no);
            if (contains){
//                System.out.println(image);
                String path = image.split("easycar/")[1];
//                System.out.println(path);
                String imagePath = "http://localhost:8080/easycar/"+path;
//                System.out.println(imagePath);
                carImages.add(imagePath);
            }
        }
        return new ResponseUtil(HttpServletResponse.SC_OK, "Car Images of "+reg_no, carImages );
    }

//    @GetMapping(path = "front_images", consumes = MediaType.APPLICATION_JSON_VALUE ,produces = MediaType.APPLICATION_JSON_VALUE)
    @GetMapping(path = "front", params = {"reg_no","brand"}, /* consumes = MediaType.APPLICATION_JSON_VALUE,*/ produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAllFrontImages(@RequestParam("reg_no") String reg_no, @RequestParam("brand") String brand) {
        ArrayList<String> allFrontImages = new ArrayList<>();
        for (String image : allImages) {
            boolean contains = image.contains("/"+brand+"/"+reg_no+"/front");
            if (contains){
                System.out.println(image);
                String path = image.split("easycar/")[1];
                System.out.println(path);
                String imagePath = "http://localhost:8080/easycar/"+path;
                System.out.println(imagePath);
                allFrontImages.add(imagePath);
            }
        }
        return new ResponseUtil(HttpServletResponse.SC_OK, "All Car Front Images", allFrontImages );
    }

   /* @PostMapping(path = "cars", params = {"fleet"}, consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
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
    }*/

    /*@PostMapping(path = "customers", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
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
    }*/

    @PostMapping(path = "cars", params = {"reg_no","fleet","brand"}, consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadCarViews(@RequestPart("front") MultipartFile front,@RequestPart("rear") MultipartFile rear, @RequestPart("side") MultipartFile side,@RequestPart("interior") MultipartFile interior, @RequestParam("reg_no") String reg_no,@RequestParam("fleet") String carFleet,@RequestParam("brand") String brand) {
        MultipartFile[] fileArray = {front, rear, side, interior};
        try {
            projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();
            System.out.println("projectPath : "+projectPath); // --> /opt/apache-tomcat-8.5.78/webapps/easycar

            File uploadsDir = new File(projectPath + "/uploads");
            System.out.println("uploadsDir : "+uploadsDir); // --> /opt/apache-tomcat-8.5.78/webapps/easycar/uploads
            uploadsDir.mkdir();

            File carDir = new File(uploadsDir + "/cars");
            System.out.println("carDir : " + carDir); // --> /opt/apache-tomcat-8.5.78/webapps/easycar/uploads/cars
            carDir.mkdir();

            File fleetDir = new File(carDir + "/" + carFleet);
            fleetDir.mkdir();
            File brandDir = null;
            File regNoDir = null;

            if (carFleet.equals("General")) {
                brandDir = new File(fleetDir + "/" + brand);
                brandDir.mkdir();
                regNoDir = new File(brandDir + "/" +reg_no);
                regNoDir.mkdir();

                /*for (MultipartFile file : fileArray) {
                    file.transferTo(new File(brandDir.getAbsolutePath() + "/" + file.getOriginalFilename()));
                    allImages.add( brandDir + file.getOriginalFilename());
                }*/

                /*
                File generalDir = new File(carDir + "/General Cars");
                System.out.println("generalDir : " + generalDir); // --> /opt/apache-tomcat-8.5.78/webapps/easycar/uploads/cars/General Cars
                generalDir.mkdir();

                front.transferTo(new File(brandDir.getAbsolutePath() + "/" + front.getOriginalFilename()));
                rear.transferTo(new File(brandDir.getAbsolutePath() + "/" + rear.getOriginalFilename()));
                side.transferTo(new File(brandDir.getAbsolutePath() + "/" + side.getOriginalFilename()));
                interior.transferTo(new File(brandDir.getAbsolutePath() + "/" + interior.getOriginalFilename()));

                allImages.add( brandDir + front.getOriginalFilename());
                allImages.add(brandDir + brand + rear.getOriginalFilename());
                allImages.add(brandDir + brand + side.getOriginalFilename());
                allImages.add( brandDir + brand + interior.getOriginalFilename());*/

            } else if (carFleet.equals("Premium")) {
                /*brandDir = new File(fleetDir + "/" +reg_no);
                brandDir.mkdir();*/

                brandDir = new File(fleetDir + "/" + brand);
                brandDir.mkdir();
                regNoDir = new File(brandDir + "/" +reg_no);
                regNoDir.mkdir();

                /*myFile.transferTo(new File(premiumDir.getAbsolutePath() + "/" + myFile.getOriginalFilename()));
                allImages.add("uploads/cars/Premium Cars" + myFile.getOriginalFilename());*/

                /*
                File premiumDir = new File(carDir + "/Premium Cars");
                System.out.println("premiumDir : " + premiumDir);
                premiumDir.mkdir();

                front.transferTo(new File(premiumDir.getAbsolutePath() + "/" + front.getOriginalFilename()));
                rear.transferTo(new File(premiumDir.getAbsolutePath() + "/" + rear.getOriginalFilename()));
                side.transferTo(new File(premiumDir.getAbsolutePath() + "/" + side.getOriginalFilename()));
                interior.transferTo(new File(premiumDir.getAbsolutePath() + "/" + interior.getOriginalFilename()));

                allImages.add("uploads/cars/Premium Cars/"+brand + front.getOriginalFilename());
                allImages.add("uploads/cars/Premium Cars/"+brand + rear.getOriginalFilename());
                allImages.add("uploads/cars/Premium Cars/"+brand + side.getOriginalFilename());
                allImages.add("uploads/cars/Premium Cars/"+brand + interior.getOriginalFilename());*/

            } else if (carFleet.equals("Luxury")) {
                /*brandDir = new File(fleetDir + "/" +reg_no);
                brandDir.mkdir();*/

                brandDir = new File(fleetDir + "/" + brand);
                brandDir.mkdir();
                regNoDir = new File(brandDir + "/" +reg_no);
                regNoDir.mkdir();

                /*myFile.transferTo(new File(luxuryDir.getAbsolutePath() + "/" + myFile.getOriginalFilename()));
                allImages.add("uploads/cars/Luxury Cars" + myFile.getOriginalFilename());*/

                /*
                brandDir = new File(luxuryDir + "/" +brand);
                System.out.println("brandDir : " + brandDir);
                brandDir.mkdir();

                front.transferTo(new File(luxuryDir.getAbsolutePath() + "/" + front.getOriginalFilename()));
                rear.transferTo(new File(luxuryDir.getAbsolutePath() + "/" + rear.getOriginalFilename()));
                side.transferTo(new File(luxuryDir.getAbsolutePath() + "/" + side.getOriginalFilename()));
                interior.transferTo(new File(luxuryDir.getAbsolutePath() + "/" + interior.getOriginalFilename()));

                allImages.add("uploads/cars/Luxury Cars/"+brand + front.getOriginalFilename());
                allImages.add("uploads/cars/Luxury Cars/"+brand + rear.getOriginalFilename());
                allImages.add("uploads/cars/Luxury Cars/"+brand + side.getOriginalFilename());
                allImages.add("uploads/cars/Luxury Cars/"+brand + interior.getOriginalFilename());*/
            }
            for (MultipartFile file : fileArray) {
                /*file.transferTo(new File(brandDir.getAbsolutePath() + "/" + file.getOriginalFilename()));
                allImages.add( brandDir +"/"+ file.getOriginalFilename());*/
                file.transferTo(new File(regNoDir.getAbsolutePath() + "/" + file.getOriginalFilename()));
                allImages.add( regNoDir +"/"+ file.getOriginalFilename());
            }

            return new ResponseUtil(HttpServletResponse.SC_OK, "Car View Uploaded Successfully", null );

        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
            return new ResponseUtil(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage(), null );
        }
    }

    @PostMapping(path = "customers", params = {"nic_no"}, consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadCustomerNIC_and_License(@RequestParam("nic_no") String nic_no, @RequestPart("nic_front") MultipartFile nic_front, @RequestPart("nic_back") MultipartFile nic_back, @RequestPart("license_img") MultipartFile license_img) {
        /*System.out.println(nic_no);
        System.out.println(nic_front); // org.springframework.web.multipart.support.StandardMultipartHttpServletRequest$StandardMultipartFile@5ac312e1
        System.out.println(nic_back);
        System.out.println(license_img);*/

        MultipartFile[] fileArray = {nic_front, nic_back, license_img};

        try {
            projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();

            File uploadsDir = new File(projectPath + "/uploads");
            uploadsDir.mkdir();

            File customerDir = new File(uploadsDir + "/customers");
            System.out.println("customerDir : " + customerDir); // --> /opt/apache-tomcat-8.5.78/webapps/easycar/uploads/customers
            customerDir.mkdir();

            // without nic_no
            /*nic_front.transferTo(new File(customerDir.getAbsolutePath() + "/" + nic_front.getOriginalFilename()));
            nic_back.transferTo(new File(customerDir.getAbsolutePath() + "/" + nic_back.getOriginalFilename()));
            license_img.transferTo(new File(customerDir.getAbsolutePath() + "/" + license_img.getOriginalFilename()));

            allImages.add("uploads/customers" + nic_front.getOriginalFilename());
            allImages.add("uploads/customers" + nic_back.getOriginalFilename());
            allImages.add("uploads/customers" + license_img.getOriginalFilename());*/

            //with nic_no
            File uniqueDir = new File(uploadsDir + "/customers/"+nic_no);
            System.out.println("uniqueDir : " + uniqueDir); // --> /opt/apache-tomcat-8.5.78/webapps/easycar/uploads/customers/995922127v
            uniqueDir.mkdir();

            for (MultipartFile file : fileArray) {
                file.transferTo(new File(uniqueDir.getAbsolutePath() + "/" + file.getOriginalFilename()));
                allImages.add(uniqueDir + file.getOriginalFilename());
            }

            /*nic_front.transferTo(new File(uniqueDir.getAbsolutePath() + "/" + nic_front.getOriginalFilename()));
            nic_back.transferTo(new File(uniqueDir.getAbsolutePath() + "/" + nic_back.getOriginalFilename()));
            license_img.transferTo(new File(uniqueDir.getAbsolutePath() + "/" + license_img.getOriginalFilename()));

            allImages.add("uploads/customers/"+nic_no + nic_front.getOriginalFilename());
            allImages.add("uploads/customers/"+nic_no + nic_back.getOriginalFilename());
            allImages.add("uploads/customers/"+nic_no + license_img.getOriginalFilename());*/

            return new ResponseUtil(HttpServletResponse.SC_OK, "Customer Photos Uploaded Successfully", null );

        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
            return new ResponseUtil(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage(), null );
        }
    }

    @PostMapping( path = "{nic_no}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil uploadProfilePic(@PathVariable("nic_no") String nic_no, @RequestPart("avatar") MultipartFile avatar) {
        try {
            projectPath = new File(this.getClass().getProtectionDomain().getCodeSource().getLocation().toURI()).getParentFile().getParentFile().getAbsolutePath();

            File uploadsDir = new File(projectPath + "/uploads");
            uploadsDir.mkdir();

            File customerDir = new File(uploadsDir + "/customers");
            System.out.println("customerDir : " + customerDir); // --> /opt/apache-tomcat-8.5.78/webapps/easycar/uploads/customers
            customerDir.mkdir();

            File uniqueDir = new File(uploadsDir + "/customers/"+nic_no);
            System.out.println("uniqueDir : " + uniqueDir); // --> /opt/apache-tomcat-8.5.78/webapps/easycar/uploads/customers/995922127v
            uniqueDir.mkdir();

            File profileData = new File(uploadsDir + "/customers/"+nic_no+"/avatar");
            System.out.println("profileData : " + profileData); // --> /opt/apache-tomcat-8.5.78/webapps/easycar/uploads/customers/995922127v/avatar
            profileData.mkdir();

            avatar.transferTo(new File(profileData.getAbsolutePath() + "/" + avatar.getOriginalFilename()));
            allImages.add(profileData +"/"+ avatar.getOriginalFilename());

            return new ResponseUtil(HttpServletResponse.SC_OK, "Customer Avatar Uploaded Successfully", null );

        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
            return new ResponseUtil(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, e.getMessage(), null );
        }
    }

    @GetMapping(path = "avatar", params = {"nic_no"}, /* consumes = MediaType.APPLICATION_JSON_VALUE,*/ produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseUtil getAvatar(@RequestParam("nic_no") String nic_no) {
//        ArrayList<String> allFrontImages = new ArrayList<>();
        String avatarPath = "";
        for (String image : allImages) {
            boolean contains = image.contains("/"+nic_no+"/avatar");
            if (contains){
                System.out.println(image);
                String path = image.split("easycar/")[1];
                System.out.println(path);
                avatarPath = "http://localhost:8080/easycar/"+path;
                System.out.println(avatarPath);
            }
        }
        return new ResponseUtil(HttpServletResponse.SC_OK, "Avatar of "+nic_no, avatarPath );
    }
}
