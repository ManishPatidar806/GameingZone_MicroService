package com.microservice.forgotpasswordservice.Controller;

import com.microservice.forgotpasswordservice.Helper.Admin;
import com.microservice.forgotpasswordservice.Helper.User;
import com.microservice.forgotpasswordservice.RequestAndResponse.CommonResponse;
import com.microservice.forgotpasswordservice.Service.EmailVerifyService;
import com.microservice.forgotpasswordservice.ServiceCommunication.SecurityFeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/forgotPassword")
public class ForgotPasswordController {

    @Autowired
    private EmailVerifyService emailVerifyService;

    @Autowired
    private SecurityFeignClient securityFeignClient;

    @PostMapping("/sendOtp")
public ResponseEntity<CommonResponse> sendOtp(@RequestParam String email){
        CommonResponse response = new CommonResponse();
       try {
           emailVerifyService.generateAndSendOtp(email);
           System.out.println("OTP SENT TO THIS EMAIL " + email);
           response.setStatus(true);
           response.setMessage("OTP sent to this Email " + email + " Successfully");
           return new ResponseEntity<>(response, HttpStatus.OK);
       }catch (Exception e){
           response.setMessage(e.getMessage());
           response.setStatus(false);
           return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
       }
}

    @PostMapping("/verifyOtp")
    public ResponseEntity<CommonResponse> verifyOtp(@RequestParam String email, @RequestParam String otp){
        CommonResponse response = new CommonResponse();
        try {
            boolean isValid = emailVerifyService.verifyOtp(email, otp);
           if(!isValid){
               throw new Exception("OTP VERIFY FAILED");
           }
            response.setStatus(true);
            response.setMessage("OTP Verify Successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            response.setMessage(e.getMessage());
            response.setStatus(false);
            return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /*
    * SAME EMAIL IS USED in otp verification and change password input
    * */

    @PostMapping("/passwordChange")
    public ResponseEntity<CommonResponse>passwordChange(@RequestParam String password ,@RequestParam String email,@RequestParam String role){
        CommonResponse response = new CommonResponse();
        try{
            if(role.equalsIgnoreCase("ADMIN")){
                Admin admin = securityFeignClient.extractAdmin(email);
                if(admin==null){
                    throw new Exception("ADMIN NOT FOUND");
                }
                admin.setPassword(password);
              Admin admin1 = securityFeignClient.isSignUpWithAdmin(admin);
               if(admin1==null){
                   throw new Exception("Change Password Failed");
               }

            }else{
                User user = securityFeignClient.extractUser(email);
                if(user==null){
                    throw new Exception("USER NOT FOUND");
                }
                user.setPassword(password);
                User user1 = securityFeignClient.isSignUpWithUser(user);
                if(user1==null){
                    throw new Exception("Change Password Failed");
                }
            }
            response.setMessage("Password change Successfully");
            response.setStatus(true);
            return new ResponseEntity<>(response , HttpStatus.OK);

        }catch (Exception e){
            response.setMessage(e.getMessage());
            response.setStatus(false);
            return new ResponseEntity<>(response,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
