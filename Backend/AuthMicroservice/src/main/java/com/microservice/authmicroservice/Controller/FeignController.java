package com.microservice.authmicroservice.Controller;

import com.microservice.authmicroservice.Config.Security;
import com.microservice.authmicroservice.Model.Admin;
import com.microservice.authmicroservice.Model.User;
import com.microservice.authmicroservice.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


/*
* Creat an Api So that intercommunication become easy
* */
@RestController
public class FeignController {

    @Autowired
    private Security security;

    @Autowired
    private AuthService authService;

  @PostMapping("/extractEmail")
    public String extractEmail(@RequestHeader("Authorization") String token) throws Exception {
        return security.extractEmail(token);
  }

    @PostMapping("/tokenValidate")
    public boolean tokenValidate(@RequestHeader("Authorization") String token) throws Exception {
        return security.validateToken(token);
    }

    @PostMapping("/extractRole")
    public String extractRole( @RequestHeader("Authorization")String token) throws Exception {
        return security.extractRole(token);
    }

    @PostMapping("/extractAdmin")
    public Admin extractAdmin(@RequestParam("email") String email)  {
        return authService.findAdminByEmail(email);
    }

    @PostMapping("/extractUser")
    public User extractUser(@RequestParam("email") String email)  {
        return authService.findUserByEmail(email);
    }


    @PostMapping("/userSignUp")
    public User userSignUp(@RequestBody User user) throws Exception {
        return authService.isSignUpWithUser(user);
    }

    @PostMapping("/adminSignUp")
    public Admin AdminSignUp(@RequestBody Admin admin) throws Exception {
        return authService.isSignUpWithAdmin(admin);
    }


}
