package com.microservice.forgotpasswordservice.ServiceCommunication;

import com.microservice.forgotpasswordservice.Helper.Admin;
import com.microservice.forgotpasswordservice.Helper.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@Component
@FeignClient(name = "AUTHENTICATION-SERVICE")
public interface SecurityFeignClient {
    @PostMapping("/extractEmail")
    String extractEmail(@RequestHeader("Authorization") String token);

    @PostMapping("/extractRole")
    String extractRole(@RequestHeader("Authorization")String token);

    @PostMapping("/extractAdmin")
    public Admin extractAdmin(@RequestParam("email") String email);

    @PostMapping("/extractUser")
    public User extractUser(@RequestParam("email") String email) ;

    @PostMapping("/userSignUp")
    public User isSignUpWithUser(@RequestBody User user);

    @PostMapping("/adminSignUp")
    public Admin isSignUpWithAdmin(@RequestBody Admin admin);

}

