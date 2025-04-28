package com.microservice.authmicroservice.Controller;

import com.microservice.authmicroservice.Config.Security;
import com.microservice.authmicroservice.Model.Admin;
import com.microservice.authmicroservice.Model.User;
import com.microservice.authmicroservice.RequestAndResponse.ChangePasswordRequest;
import com.microservice.authmicroservice.RequestAndResponse.CommonResponse;
import com.microservice.authmicroservice.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/changePassword")
public class ChangePasswordController {

    @Autowired
    private Security security;

    @Autowired
    private AuthService authService;


@PostMapping("/createNewPassword")
    public ResponseEntity<CommonResponse> changePassword(@RequestHeader("Authorization") String token, @RequestBody ChangePasswordRequest changePasswordRequest){
        CommonResponse response =new CommonResponse();
        String oldPassword = changePasswordRequest.getOldPassword();
        String newPassword = changePasswordRequest.getNewPassword();
        String confirmPassword = changePasswordRequest.getConfirmPassword();
        try{
            if(oldPassword.isEmpty()||newPassword.isEmpty()||confirmPassword.isEmpty()){
                throw new Exception("Fill the field Properly");
            }
            if(!newPassword.equals(confirmPassword)){
                throw  new Exception("Enter Password Correctly");
            }
            if(!security.validateToken(token)){
                throw new Exception("UnAuthorized Access");
            }
            String email = security.extractEmail(token);
            if(email==null||email.isEmpty()){
                throw new Exception("Cannot find Admin Email");
            }
            String role = security.extractRole(token);
            if (role.equalsIgnoreCase("ADMIN")){
                Admin admin = authService.findAdminByEmail(email);
                if(admin==null){
                    throw new Exception("Admin not found");
                }
                if(!admin.getPassword().equals(oldPassword)){
                    throw new Exception("Incorrect  Password");
                }
                admin.setPassword(newPassword );
                if(authService.isSignUpWithAdmin(admin)==null){
                    throw new Exception("Change Password failed");
                }
            }else {
                User user = authService.findUserByEmail(email);
                if(user==null){
                    throw new Exception("User not found");
                }
                if(!user.getPassword().equals(oldPassword)){
                    throw new Exception("Incorrect Password");
                }
                user.setPassword(newPassword );
                if(authService.isSignUpWithUser(user)==null){
                    throw new Exception("Change Password failed");
                }

            }
            response.setMessage("Change Password Successfully");
            response.setStatus(true);
            return  new ResponseEntity<>(response , HttpStatus.OK);

        }catch (Exception e){
            response.setStatus(false);
            response.setMessage(e.getMessage());
            return  new ResponseEntity<>(response , HttpStatus.INTERNAL_SERVER_ERROR);
        }



    }


}
