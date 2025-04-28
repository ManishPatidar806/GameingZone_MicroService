package com.microservice.admindashboardservice.RequestAndResponse;

import org.springframework.web.multipart.MultipartFile;


public class CreateProduct {

    private String name;

    private String description;

    private double price;

    private String typeOfProduct;

    private String company;

    private double largePrice;


    /*
     * Image Section
     * */
    private MultipartFile mainImage;

    private MultipartFile image1;

    private MultipartFile image2;

    private MultipartFile image3;

    private MultipartFile image4;

    private MultipartFile image5;

    /*
     * System Requirement
     * */

    private String processer;


    private String graphicCard;

    private String ram;

    private String memory;


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

    public MultipartFile getMainImage() {
        return mainImage;
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

    public void setMainImage(MultipartFile mainImage) {
        this.mainImage = mainImage;
    }

    public MultipartFile getImage1() {
        return image1;
    }

    public void setImage1(MultipartFile image1) {
        this.image1 = image1;
    }

    public MultipartFile getImage2() {
        return image2;
    }

    public void setImage2(MultipartFile image2) {
        this.image2 = image2;
    }

    public MultipartFile getImage3() {
        return image3;
    }

    public void setImage3(MultipartFile image3) {
        this.image3 = image3;
    }

    public MultipartFile getImage4() {
        return image4;
    }

    public void setImage4(MultipartFile image4) {
        this.image4 = image4;
    }

    public MultipartFile getImage5() {
        return image5;
    }

    public void setImage5(MultipartFile image5) {
        this.image5 = image5;
    }

    public String getProcesser() {
        return processer;
    }

    public void setProcesser(String processer) {
        this.processer = processer;
    }

    public String getGraphicCard() {
        return graphicCard;
    }

    public void setGraphicCard(String graphicCard) {
        this.graphicCard = graphicCard;
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
}


