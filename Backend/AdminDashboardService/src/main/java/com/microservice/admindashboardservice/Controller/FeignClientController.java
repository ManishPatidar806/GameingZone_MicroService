package com.microservice.admindashboardservice.Controller;

import com.microservice.admindashboardservice.Model.Product;
import com.microservice.admindashboardservice.Service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
public class FeignClientController {

@Autowired
    private ProductService productService;

@PostMapping("/extractProduct")
public Product getProductById(@RequestParam("productId") Long productId){
    return productService.getProductById(productId);
}

    @PostMapping("/allProductIdByAdmin")
    List<Long> getProductsByAdminId(@RequestParam("adminId") Long adminId){
    return productService.getAllProductId(adminId);
    }


}
