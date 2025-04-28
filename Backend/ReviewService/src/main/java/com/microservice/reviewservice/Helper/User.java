package com.microservice.reviewservice.Helper;


import java.util.List;


public class User {


    private Long id;


    private String name;

    private String email;

    private String phone;


    private String password;


    private List<Long> orderStatusid;


    private List<Long> cartId;



    private List<Long> reviewId;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
