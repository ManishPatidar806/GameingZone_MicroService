package com.microservice.authmicroservice.Controller;


import com.microservice.authmicroservice.Config.Security;
import com.microservice.authmicroservice.Model.Admin;
import com.microservice.authmicroservice.Model.User;
import com.microservice.authmicroservice.RequestAndResponse.AuthResponse;
import com.microservice.authmicroservice.RequestAndResponse.CommonObjectResponse;
import com.microservice.authmicroservice.RequestAndResponse.CommonResponse;
import com.microservice.authmicroservice.RequestAndResponse.ProfileResponse;
import com.microservice.authmicroservice.Service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private Security security;

    /*
    * SIGN UP FUNCTIONALITY
    * */
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody User user , @RequestParam String role) throws Exception {
        AuthResponse authResponse = new AuthResponse();
        try {
                String name= user.getName();
                String password= user.getPassword();
                String email= user.getEmail();
                String phone= user.getPhone();
                if (name.isEmpty()||password.isEmpty()||email.isEmpty()||phone.isEmpty()) {
                    throw new Exception("Invalid Arguments");
                }

                    if(role.equalsIgnoreCase("ADMIN")){
                        if(authService.isPhoneNumberExistAsAdmin(phone) ){
                            throw new Exception("Number is already exist");
                        }
                        if (authService.findAdminByEmail(email)!=null){
                            throw new Exception("email is already exist");
                        }
                        Admin admin = new Admin();
                        admin.setEmail(user.getEmail());
                        admin.setName(user.getName());
                        admin.setPhone(user.getPhone());
                        admin.setPassword(user.getPassword());
                        authService.isSignUpWithAdmin(admin);
                        String token = security.generateToken(admin.getEmail() , role.toUpperCase());
                        authResponse.setMessage("REGISTRATION SUCCESSFULLY");
                        authResponse.setToken(token);
                        authResponse.setStatus(true);
                    }else{
                        if(authService.isPhoneNumberExist(phone)  ){
                            throw new Exception("Number is already exist");
                        }
                        if (authService.isEmailExist(email)){
                            throw new Exception("email is already exist");
                        }
                        User temUser = authService.isSignUpWithUser(user);
                        String token = security.generateToken(temUser.getEmail() , role.toUpperCase());
                        authResponse.setMessage("REGISTRATION SUCCESSFULLY");
                        authResponse.setToken(token);
                        authResponse.setStatus(true);
                    }

            return new ResponseEntity<>(authResponse , HttpStatus.CREATED);
        }catch (Exception e){
            authResponse.setMessage(e.getMessage());
            return new ResponseEntity<>(authResponse , HttpStatus.BAD_REQUEST);
        }
}
/*
* LOGIN FUNCTIONALITY
* */
@PostMapping("/login")
public ResponseEntity<AuthResponse> login(@RequestBody User user, @RequestParam  String role )  {
        String username  =user.getEmail();
        String password = user.getPassword();
    AuthResponse authResponse= new AuthResponse();
      try{
          if(username.isEmpty()||password.isEmpty()){
              throw new Exception("Invalid Arguments");
          }
          if (role.equalsIgnoreCase("ADMIN")) {
              Admin admin = authService.findAdminByEmail(username);
              if (admin == null || !admin.getPassword().equals(password)) {
                  throw new Exception("Invalid Username or password");
              }
              String token = security.generateToken(username, role.toUpperCase());
              authResponse.setToken(token);
          } else {
              User temuser = authService.findUserByEmail(username);
              if (temuser == null || !temuser.getPassword().equals(password)) {
                  throw new Exception("Invalid Username or password");
              }
              String token = security.generateToken(username, role.toUpperCase());
              authResponse.setToken(token);
          }
          authResponse.setStatus(true);
          authResponse.setMessage("LOGIN SUCCESSFULLY");
          return new ResponseEntity<>(authResponse,HttpStatus.OK);
      }catch (Exception e){
          authResponse.setMessage(e.getMessage());
          return new ResponseEntity<>(authResponse,HttpStatus.BAD_REQUEST);
      }
}


/*
* Show Profile
* */
@GetMapping("/profile")
    public ResponseEntity<CommonObjectResponse> profile(@RequestHeader("Authorization") String token) {
    CommonObjectResponse response = new CommonObjectResponse();
    try {
        if (!security.validateToken(token)) {
            throw new Exception("UnAuthorized Access");
        }
        String email = security.extractEmail(token);
        if (email == null || email.isEmpty()) {
            throw new Exception("Cannot find Email");
        }
        String role = security.extractRole(token);
        if (role.equalsIgnoreCase("ADMIN")) {
            Admin admin = authService.findAdminByEmail(email);
            if (admin == null) {
                throw new Exception("Admin not found");
            }
            ProfileResponse profileResponse = new ProfileResponse();
            profileResponse.setEmail(admin.getEmail());
            profileResponse.setName(admin.getName());
            profileResponse.setNumber(admin.getPhone());
            profileResponse.setRole("ADMIN");
            response.setObj(profileResponse);
        } else {
            User user = authService.findUserByEmail(email);
            if (user == null) {
                throw new Exception("User not found");
            }
            ProfileResponse profileResponse = new ProfileResponse();
            profileResponse.setEmail(user.getEmail());
            profileResponse.setName(user.getName());
            profileResponse.setNumber(user.getPhone());
            profileResponse.setRole("USER");
            response.setObj(profileResponse);

        }
        response.setMessage("Profile Found Successfully");
        response.setStatus(true);
        return new ResponseEntity<>(response, HttpStatus.OK);
    } catch (Exception e) {
        response.setMessage(e.getMessage());
        response.setStatus(false);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


/*
*Delete Account
* */

    @GetMapping("/deleteAccount")
    public ResponseEntity<CommonResponse> deleteAccount(@RequestHeader("Authorization") String token) {
        CommonResponse response = new CommonResponse();
        try {
            if (!security.validateToken(token)) {
                throw new Exception("UnAuthorized Access");
            }
            String email = security.extractEmail(token);
            if (email == null || email.isEmpty()) {
                throw new Exception("Cannot find  Email");
            }
            String role = security.extractRole(token);
            if (role.equalsIgnoreCase("ADMIN")) {
                Admin admin = authService.findAdminByEmail(email);
                if (admin == null) {
                    throw new Exception("Admin not found");
                }
                if(!authService.deleteAccountOfAdmin(admin.getId())){
                    throw new Exception("Remove Account Failed");
                }
            } else {
                User user = authService.findUserByEmail(email);
                if (user == null) {
                    throw new Exception("User not found");
                }
                if(!authService.deleteAccountOfUser(user.getId())){
                    throw new Exception("Remove Account Failed");
                }
            }
            response.setMessage("Account Remove Successfully");
            response.setStatus(true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.setMessage(e.getMessage());
            response.setStatus(false);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}



