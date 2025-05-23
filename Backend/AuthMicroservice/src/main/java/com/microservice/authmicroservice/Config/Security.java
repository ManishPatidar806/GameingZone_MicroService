package com.microservice.authmicroservice.Config;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class Security {
    private static final String SECRET_KEY_STRING = "upperclasswoman5a46sd4f6a5sf46dsa4f65fa";
    private final Key SECRET_KEY = Keys.hmacShaKeyFor(SECRET_KEY_STRING.getBytes());


    public String generateToken(String username, String role){
        String encrypttoken = Jwts.builder().setSubject(username).claim("role" , role).
                setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+1000*300*5000))
                .signWith(SECRET_KEY)
                .compact();
        String token = "Bearer "+encrypttoken;

        System.out.println("GENERATED TOKEN IS :"+token);
        return token;
    }


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

    public String extractEmail(String token) throws Exception {
        if(!token.startsWith("Bearer ")){
            throw new Exception("Invalid Token");
        }
        System.out.println("This extract email is working");
        token=token.substring(7);
        Claims claims = extractClaims(token);
        return claims.getSubject();
    }
    public String extractRole(String token) throws Exception {
        System.out.println(token);
        if(!token.startsWith("Bearer ")){
            throw new Exception("Invalid Token");
        }
        token=token.substring(7);
        Claims claims = extractClaims(token);
      return claims.get("role", String.class); // Ensure the claim key is correct
    }

    public Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

}
