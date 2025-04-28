package com.microservice.gateway.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class Security {

    private static final String SECRET_KEY_STRING = "upperclasswoman5a46sd4f6a5sf46dsa4f65fa";
    private final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET_KEY_STRING.getBytes());


    public boolean validateToken(String token){
        try {
            if(!token.startsWith("Bearer ")){
                return false;
            }
            token=token.substring(7);
            Jwts.parserBuilder().setSigningKey(SECRET_KEY).build().parseClaimsJws(token);
            return true;
        }catch (Exception e){
            System.out.println(e.getMessage());
            return false;
        }

    }

}
