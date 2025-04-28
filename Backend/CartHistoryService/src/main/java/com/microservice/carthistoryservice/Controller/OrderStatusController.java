package com.microservice.carthistoryservice.Controller;


import com.microservice.carthistoryservice.Helper.User;
import com.microservice.carthistoryservice.Model.OrderStatus;
import com.microservice.carthistoryservice.RequestAndResponse.CommonObjectResponse;
import com.microservice.carthistoryservice.RequestAndResponse.CommonResponse;
import com.microservice.carthistoryservice.RequestAndResponse.OrderRequest;
import com.microservice.carthistoryservice.Service.OrderStatusService;
import com.microservice.carthistoryservice.ServiceCommunication.SecurityFeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/order")
public class OrderStatusController {

    @Autowired
    private SecurityFeignClient securityFeignClient;

    @Autowired
    private OrderStatusService orderStatusService;


    @GetMapping("/getOrderList")
    public ResponseEntity<CommonObjectResponse> getAllOrder(@RequestHeader("Authorization") String token){
        CommonObjectResponse response = new CommonObjectResponse();
        try {

            String role = securityFeignClient.extractRole(token);
            if (role.equalsIgnoreCase("ADMIN")) {
                throw new Exception("Invalid Access");
            }

            List<OrderStatus> orderStatusList = orderStatusService.findAllOrder();
            response.setObj(orderStatusList);
            response.setMessage("Order Found  Successfully");
            response.setStatus(true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.setMessage(e.getMessage());
            response.setStatus(false);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/addOrderList")
    public ResponseEntity<CommonResponse> addAllOrder(@RequestHeader("Authorization") String token , @RequestBody List<OrderRequest> orderRequest){
        CommonResponse response = new CommonResponse();
        try {
            String role =securityFeignClient.extractRole(token);
            if(role.equals("ADMIN")){
                throw new Exception("Invalid Access");
            }
            String email =  securityFeignClient.extractEmail(token);
            if(email.isEmpty()){
                throw new Exception("User is not found");
            }
            User user = securityFeignClient .extractUser(email);
            if(user==null){
                throw new Exception("User not found");
            }

            if(!orderStatusService.saveOrderList(orderRequest,user)){
                throw new Exception("Order uploaded Failed");
            }
            response.setMessage("Order uploaded  Successfully");
            response.setStatus(true);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            response.setMessage(e.getMessage());
            response.setStatus(false);
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
