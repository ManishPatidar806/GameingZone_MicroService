package com.microservice.admindashboardservice.Model;

import jakarta.persistence.*;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;


@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @Column(nullable = false , unique = true)
    private String name;
    @Column(nullable = false,length = 800)
    private String description;
    @Column(nullable = false)
    private double price;
    @Column(nullable = false)
    private String typeOfProduct;
    @Column(nullable = false)
    private LocalDate localDate;
    @Column(nullable = false)
    private String company;
    @Column(nullable = false)
    private double largePrice;
    @Column(nullable = false)
    private String adminEmail;




    /*
    * Image Section And their id
    * */

    @Column(nullable = false)
    private String main_Image;
    @Column(nullable = false)
    private String image1;
    @Column(nullable = false)
    private String image2;
    @Column(nullable = false)
    private String image3;
    @Column(nullable = false)
    private String image4;
    @Column(nullable = false)
    private String image5;

    /*
    * System Requirement
    * */
    @Column(nullable = false)
    private String processer;
    @Column(nullable = false)
    private String Graphic_card;
    @Column(nullable = false)
    private String ram;
    @Column(nullable = false)
    private String memory;


    @ElementCollection
    private List<Long> reviewId;

    @Column(name = "admin_id")
    private Long adminId;


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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getTypeOfProduct() {
        return typeOfProduct;
    }

    public void setTypeOfProduct(String typeOfProduct) {
        this.typeOfProduct = typeOfProduct;
    }

    public LocalDate getLocalDate() {
        return localDate;
    }

    public void setLocalDate(LocalDate localDate) {
        this.localDate = localDate;
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

    public String getAdminEmail() {
        return adminEmail;
    }

    public void setAdminEmail(String adminEmail) {
        this.adminEmail = adminEmail;
    }

    public String getMain_Image() {
        return main_Image;
    }

    public void setMain_Image(String main_Image) {
        this.main_Image = main_Image;
    }

    public String getImage1() {
        return image1;
    }

    public void setImage1(String image1) {
        this.image1 = image1;
    }

    public String getImage2() {
        return image2;
    }

    public void setImage2(String image2) {
        this.image2 = image2;
    }

    public String getImage3() {
        return image3;
    }

    public void setImage3(String image3) {
        this.image3 = image3;
    }

    public String getImage4() {
        return image4;
    }

    public void setImage4(String image4) {
        this.image4 = image4;
    }

    public String getImage5() {
        return image5;
    }

    public void setImage5(String image5) {
        this.image5 = image5;
    }

    public String getProcesser() {
        return processer;
    }

    public void setProcesser(String processer) {
        this.processer = processer;
    }

    public String getGraphic_card() {
        return Graphic_card;
    }

    public void setGraphic_card(String graphic_card) {
        Graphic_card = graphic_card;
    }

    public String getRam() {
        return ram;
    }

    public void setRam(String ram) {
        this.ram = ram;
    }

    public String getMemory() {
        return memory;
    }

    public void setMemory(String memory) {
        this.memory = memory;
    }

    public List<Long> getReviewId() {
        return reviewId;
    }

    public void setReviewId(List<Long> reviewId) {
        this.reviewId = reviewId;
    }

    public Long getAdminId() {
        return adminId;
    }

    public void setAdminId(Long adminId) {
        this.adminId = adminId;
    }
}
