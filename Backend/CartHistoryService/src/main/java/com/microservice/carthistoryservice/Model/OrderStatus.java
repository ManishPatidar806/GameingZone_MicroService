package com.microservice.carthistoryservice.Model;


import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
public class OrderStatus {

@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

private String name;
    private String image;
    private LocalDate date;
    private long price;

    private String company;

    private double largePrice;

    @Column(name = "user_id")
    private Long userId;
    private com.microservice.carthistoryservice.Utils.OrderStatus status;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public double getLargePrice() {
        return largePrice;
    }

    public void setLargePrice(double largePrice) {
        this.largePrice = largePrice;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public com.microservice.carthistoryservice.Utils.OrderStatus getStatus() {
        return status;
    }

    public void setStatus(com.microservice.carthistoryservice.Utils.OrderStatus status) {
        this.status = status;
    }
}
