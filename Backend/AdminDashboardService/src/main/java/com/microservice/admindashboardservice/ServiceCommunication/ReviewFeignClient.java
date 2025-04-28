package com.microservice.admindashboardservice.ServiceCommunication;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Component
@FeignClient(name = "REVIEW-SERVICE")
public interface ReviewFeignClient {

    @PostMapping("/deleteById")
    boolean deleteReviewByProductId(@RequestParam("productId") Long productId);
}
