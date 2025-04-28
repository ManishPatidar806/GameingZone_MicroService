package com.microservice.carthistoryservice.ServiceCommunication;

import com.microservice.carthistoryservice.Helper.Product;
import com.microservice.carthistoryservice.Helper.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Component
@FeignClient(name = "PRODUCT-SERVICE")
public interface ProductFeignClient {

        @PostMapping("/extractProduct")
        public Product findById(@RequestParam("productId") Long productId);

}
