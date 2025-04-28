package com.microservice.admindashboardservice.ServiceCommunication;

import com.microservice.admindashboardservice.HelperClass.Admin;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Component
@FeignClient(name = "AUTHENTICATION-SERVICE")
public interface SecurityFeignClient {

    @PostMapping("/extractEmail")
     String extractEmail(@RequestHeader("Authorization") String token);

    @PostMapping("/extractRole")
     String extractRole(@RequestHeader("Authorization") String token);

    @PostMapping("/extractAdmin")
    Admin extractAdmin(@RequestParam("email") String email);

}



