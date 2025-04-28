package com.microservice.reviewservice.Controller;

import com.microservice.reviewservice.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FeignClientController {

    @Autowired
    private ReviewService reviewService;


    @PostMapping("/deleteById")
    boolean deleteReviewByProductId(@RequestParam("productId") Long productId){
        return reviewService.deleteByProductId(productId);
    }

}
