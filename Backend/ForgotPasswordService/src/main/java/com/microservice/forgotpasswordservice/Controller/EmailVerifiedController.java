package com.microservice.forgotpasswordservice.Controller;


import com.microservice.forgotpasswordservice.Service.EmailVerifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/*
This controller is can be used when we want to varify email
in this we already used in forgot controller and not given routes in gateway
 */

@RestController
@RequestMapping("/email verification")
public class EmailVerifiedController {

    @Autowired
    private EmailVerifyService emailVerifyService;

    @PostMapping("/send")
    public String sendOtp(@RequestParam String email) {
        emailVerifyService.generateAndSendOtp(email);
        return "OTP sent to " + email;
    }

    @PostMapping("/verify")
    public String verifyOtp(@RequestParam String email, @RequestParam String otp) {
        boolean isValid = emailVerifyService.verifyOtp(email, otp);
        return isValid ? "OTP Verified Successfully!" : "Invalid or Expired OTP!";
    }



}
