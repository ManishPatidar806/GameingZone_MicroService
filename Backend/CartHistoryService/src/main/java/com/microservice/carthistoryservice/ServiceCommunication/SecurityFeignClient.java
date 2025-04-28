package com.microservice.carthistoryservice.ServiceCommunication;


import com.microservice.carthistoryservice.Helper.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@Component
@FeignClient(name = "AUTHENTICATION-SERVICE")
public interface SecurityFeignClient {
    @PostMapping("/extractEmail")
    String extractEmail(@RequestHeader("Authorization") String token);

    @PostMapping("/extractRole")
    String extractRole(@RequestHeader("Authorization") String token);


    @PostMapping("/extractUser")
    public User extractUser(@RequestParam("email") String email) ;


}
