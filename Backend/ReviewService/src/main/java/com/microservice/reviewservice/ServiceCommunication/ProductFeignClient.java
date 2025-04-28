package com.microservice.reviewservice.ServiceCommunication;


import com.microservice.reviewservice.Helper.Product;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


import java.util.List;

@Component
@FeignClient(name = "PRODUCT-SERVICE")
public interface ProductFeignClient {

    @PostMapping("/extractProduct")
    Product extractProduct(@RequestParam("productId") Long productId);


    @PostMapping("/allProductIdByAdmin")
    List<Long> getProductsIdByAdminId(@RequestParam("adminId") Long adminId);



    }




