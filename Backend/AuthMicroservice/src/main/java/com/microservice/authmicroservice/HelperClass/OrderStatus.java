package com.microservice.authmicroservice.HelperClass;


import java.time.LocalDate;

public class OrderStatus {

    private Long id;

    private String name;
    private String image;
    private LocalDate date;
    private long price;

    private String company;

    private double largePrice;


    private String status;

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

}
