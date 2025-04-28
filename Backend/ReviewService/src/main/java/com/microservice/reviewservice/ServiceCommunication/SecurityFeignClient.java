package com.microservice.reviewservice.ServiceCommunication;

import com.microservice.reviewservice.Helper.Admin;
import com.microservice.reviewservice.Helper.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Component
@FeignClient(name = "AUTHENTICATION-SERVICE")
public interface SecurityFeignClient {
    @PostMapping("/extractEmail")
    String extractEmail(@RequestHeader("Authorization") String token);

    @PostMapping("/extractRole")
    String extractRole(@RequestHeader("Authorization") String token);

    @PostMapping("/extractAdmin")
    public Admin extractAdmin(@RequestParam("email") String email);

    @PostMapping("/extractUser")
    public User extractUser(@RequestParam("email") String email) ;

}

