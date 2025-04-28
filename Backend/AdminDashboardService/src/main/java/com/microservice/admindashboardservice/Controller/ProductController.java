package com.microservice.admindashboardservice.Controller;
import com.microservice.admindashboardservice.HelperClass.Admin;
import com.microservice.admindashboardservice.Model.Product;
import com.microservice.admindashboardservice.RequestAndResponse.CommonResponse;
import com.microservice.admindashboardservice.RequestAndResponse.CreateProduct;
import com.microservice.admindashboardservice.RequestAndResponse.ProductDataResponse;
import com.microservice.admindashboardservice.RequestAndResponse.UpdateProduct;
import com.microservice.admindashboardservice.Service.CloudinaryService;
import com.microservice.admindashboardservice.Service.ProductService;
import com.microservice.admindashboardservice.ServiceCommunication.SecurityFeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("v1/product")
public class ProductController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @Autowired
    private ProductService productService;


    @Autowired
    private SecurityFeignClient securityFeignClient;

    @PostMapping("/uploadProduct")
    public ResponseEntity<CommonResponse> createProduct(
            @RequestHeader("Authorization") String token,
            @ModelAttribute CreateProduct createProduct) {

        CommonResponse productResponse = new CommonResponse();

        try {

            String role = securityFeignClient.extractRole(token);
            if (role.equals("USER")) {
                throw new Exception("Invalid Access");
            }

            String email = securityFeignClient.extractEmail(token);
            if (email.isEmpty()) {
                throw new Exception("User is not found");
            }

            // Validate all fields are properly filled
            if (createProduct.getName().isEmpty() || createProduct.getDescription().isEmpty() ||
                    createProduct.getCompany().isEmpty()||
                    createProduct.getTypeOfProduct().isEmpty() || createProduct.getPrice() < 0 ||
                    createProduct.getLargePrice()>createProduct.getPrice()||
                    createProduct.getMainImage() == null || createProduct.getImage1() == null ||
                    createProduct.getImage2() == null || createProduct.getImage3() == null ||
                    createProduct.getImage4() == null || createProduct.getImage5() == null ||
                    createProduct.getProcesser().isEmpty() || createProduct.getGraphicCard().isEmpty() ||
                    createProduct.getRam().isEmpty() || createProduct.getMemory().isEmpty()) {
                throw new Exception("Fill All fields properly");
            }

            if (productService.getProductByName(createProduct.getName()) != null) {
                throw new Exception("Product with this name already exists");
            }

            Admin admin =securityFeignClient.extractAdmin(email);
            if (admin == null) {
                throw new Exception("Admin not found");
            }

            Product product = new Product();
            product.setAdminEmail(email);
            product.setMain_Image(cloudinaryService.uploadImage(createProduct.getMainImage()));
            product.setImage1(cloudinaryService.uploadImage(createProduct.getImage1()));
            product.setImage2(cloudinaryService.uploadImage(createProduct.getImage2()));
            product.setImage3(cloudinaryService.uploadImage(createProduct.getImage3()));
            product.setImage4(cloudinaryService.uploadImage(createProduct.getImage4()));
            product.setImage5(cloudinaryService.uploadImage(createProduct.getImage5()));
            product.setProcesser(createProduct.getProcesser());
            product.setLargePrice(createProduct.getLargePrice());
            product.setGraphic_card(createProduct.getGraphicCard());
            product.setRam(createProduct.getRam());
            product.setMemory(createProduct.getMemory());
            product.setName(createProduct.getName());
            product.setDescription(createProduct.getDescription());
            product.setPrice(createProduct.getPrice());
            product.setTypeOfProduct(createProduct.getTypeOfProduct());
            product.setCompany(createProduct.getCompany());
            product.setLocalDate(LocalDate.now());
            product.setAdminId(admin.getId());

            if (productService.saveProduct(product)) {
                productResponse.setMessage("Product uploaded successfully");
                productResponse.setStatus(true);
                return ResponseEntity.ok(productResponse);
            } else {
                throw new Exception("Product upload failed");
            }
        } catch (Exception e) {
            productResponse.setStatus(false);
            productResponse.setMessage(e.getMessage());
            return new ResponseEntity<>(productResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    @PostMapping("/updateProduct")
    public ResponseEntity<CommonResponse>updateProduct(@RequestHeader("Authorization") String token  ,@RequestBody UpdateProduct updateProduct){
        CommonResponse productResponse = new CommonResponse();
        try {

        String role =securityFeignClient.extractRole(token);

        if(role.equals("USER")){
            throw new Exception("Invalid Access");
        }
        double largePrice = updateProduct.getLargePrice();
        String name = updateProduct.getName();
       String description = updateProduct.getDescription();
       double price = updateProduct.getPrice();
       String processer = updateProduct.getProcesser();
       String Graphic_card = updateProduct.getGraphicCard();
       String ram = updateProduct.getRam();
       String memory = updateProduct.getMemory();
       String typeOfProduct = updateProduct.getTypeOfProduct();


    if (description.isEmpty() || typeOfProduct.isEmpty() || price < 0  ||largePrice<price||
            processer.isEmpty() || Graphic_card.isEmpty() || ram.isEmpty() || memory.isEmpty()) {
        throw new Exception("Fill All field Properly");
    }
            String email =  securityFeignClient.extractEmail(token);
            if(email.isEmpty()){
                throw new Exception("Admin is not found");
            }
            Admin admin =  securityFeignClient.extractAdmin(email);
            if(admin==null){
                throw new Exception("Admin not found");
            }
           Product temProduct =  productService.getProductForUpdate(name,admin.getId());
            if (temProduct == null) {
                throw new Exception("Product Does Not exists");
            }

    int result = productService.updateProduct(updateProduct , admin.getId());
    if(result==1){
        productResponse.setMessage("Product update successfully");
        productResponse.setStatus(true);
        return ResponseEntity.ok(productResponse);
    }else{
        throw new Exception("Product update failed");
    }
}catch (Exception e){
    productResponse.setStatus(false);
    productResponse.setMessage(e.getMessage());
    return new ResponseEntity<>(productResponse, HttpStatus.INTERNAL_SERVER_ERROR);
}

    }

    @GetMapping("/removeProduct")
    public ResponseEntity<CommonResponse>removeProduct(@RequestHeader("Authorization") String token  ,@RequestParam String name){
        CommonResponse productResponse = new CommonResponse();

        try {
            String role =securityFeignClient.extractRole(token);

            if(role.equals("USER")){
                throw new Exception("Invalid Access");
            }

            String email =  securityFeignClient.extractEmail(token);
            if(email.isEmpty()){
                throw new Exception("Admin is not found");
            }
            Admin admin =  securityFeignClient.extractAdmin(email);
            if(admin==null){
                throw new Exception("Admin not found");
            }

            Product product =  productService.getProductForUpdate(name,admin.getId());
            if (product == null) {
                throw new Exception("Product Does Not exists");
            }


            String main_Image_public_Id = productService.extractPublicId(product.getMain_Image());
            String image1_public_Id = productService.extractPublicId(product.getImage1());
            String image2_public_Id = productService.extractPublicId(product.getImage2());
            String image3_public_Id = productService.extractPublicId(product.getImage3());
            String image4_public_Id = productService.extractPublicId(product.getImage4());
            String image5_public_Id = productService.extractPublicId(product.getImage5());

            if (main_Image_public_Id == null || image1_public_Id == null || image2_public_Id == null
                    || image3_public_Id == null || image4_public_Id == null || image5_public_Id == null ) {
                throw new Exception("Process of removing product Unsuccessfully");
            }

            if(productService.deleteProductByName(product.getName(), product.getId(), admin.getId())){
                String main_Image_response = cloudinaryService.deleteImage(main_Image_public_Id);
                String image1_response = cloudinaryService.deleteImage(image1_public_Id);
                String image2_response = cloudinaryService.deleteImage(image2_public_Id);
                String image3_response = cloudinaryService.deleteImage(image3_public_Id);
                String image4_response = cloudinaryService.deleteImage(image4_public_Id);
                String image5_response = cloudinaryService.deleteImage(image5_public_Id);

                    productResponse.setMessage("Product remove successfully");
                    productResponse.setStatus(true);
                    return ResponseEntity.ok(productResponse);

            }else {
                throw new Exception("Product remove failed");
            }

        }catch (Exception e){
            productResponse.setStatus(false);
            productResponse.setMessage(e.getMessage());
            return new ResponseEntity<>(productResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
    * All Product of admin
    * */
    @GetMapping("/getAllProducts")
    public ResponseEntity<ProductDataResponse> getAdminAllProduct(@RequestHeader("Authorization") String token){
        ProductDataResponse productDataResponse = new ProductDataResponse();
        try {

            String role = securityFeignClient.extractRole(token);

            if (role.equals("USER")) {
                throw new Exception("Invalid Access");
            }

            String email = securityFeignClient.extractEmail(token);
            if (email.isEmpty()) {
                throw new Exception("Admin is not found");
            }
            Admin admin = securityFeignClient.extractAdmin(email);
            if (admin == null) {
                throw new Exception("Admin not found");
            }

            List<Product> productList = productService.getAllProductOfAdmin(admin.getId());
            productDataResponse.setProductList(productList);
            productDataResponse.setMessage("ALL DATA SENT SUCCESSFULLY");
            productDataResponse.setStatus(true);
            return ResponseEntity.ok(productDataResponse);
        } catch (Exception e) {
            productDataResponse.setStatus(false);
            productDataResponse.setMessage(e.getMessage());
            return new ResponseEntity<>(productDataResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    /*
    * Show All list of Product
    * */

    @GetMapping("allProducts")
    public ResponseEntity<ProductDataResponse> findAllProduct(@RequestHeader("Authorization") String token){
        ProductDataResponse productDataResponse = new ProductDataResponse();
        try {
            List<Product> productList = productService.getAllProduct();
            if(productList.isEmpty()){
                throw new Exception("NO Item Present");
            }
            productDataResponse.setProductList(productList);
            productDataResponse.setMessage("LIST OF PRODUCT SENT SUCCESSFULLY");
            productDataResponse.setStatus(true);
            return ResponseEntity.ok(productDataResponse);
        } catch (Exception e) {
            productDataResponse.setStatus(false);
            productDataResponse.setMessage(e.getMessage());
            return new ResponseEntity<>(productDataResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





}
























