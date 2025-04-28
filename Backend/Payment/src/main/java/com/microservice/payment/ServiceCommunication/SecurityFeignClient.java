package com.microservice.payment.ServiceCommunication;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;


@Component
@FeignClient(name = "AUTHENTICATION-SERVICE")
public interface SecurityFeignClient {

        @PostMapping("/extractEmail")
         String extractEmail(@RequestHeader("Authorization") String token);

        @PostMapping("/extractRole")
        String extractRole(@RequestHeader("Authorization") String token);

}
