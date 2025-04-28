package com.microservice.admindashboardservice.Repository;


import com.microservice.admindashboardservice.Model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Product findByName(String name);

    @Query("SELECT p.id FROM Product p WHERE p.adminId = :adminId")
    List<Long> getAllProductId(@Param("adminId") Long adminId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Product p WHERE p.adminId = :adminId AND p.name = :name")
    void deleteByName(@Param("name") String name, @Param("adminId") Long adminId);

    @Query("SELECT p FROM Product p WHERE p.adminId = :adminId AND p.name = :name")
    Product getProductForUpdate(@Param("name") String name, @Param("adminId") Long adminId);

    @Query("SELECT p FROM Product p WHERE p.adminId = :adminId")
    List<Product> findAllProductOfAdmin(@Param("adminId") Long adminId);

    @Modifying
    @Transactional
    @Query("UPDATE Product p SET p.description = :description,p.largePrice=:largePrice, p.price = :price, p.processer = :processer, p.Graphic_card = :graphicCard, p.ram = :ram, p.memory = :memory, p.typeOfProduct = :typeOfProduct WHERE p.adminId = :adminId AND p.name = :name")
    int updateProductDetails(@Param("name") String name,
                             @Param("largePrice") double largePrice,
                             @Param("price") double price,
                             @Param("processer") String processer,
                             @Param("graphicCard") String graphicCard,
                             @Param("ram") String ram,
                             @Param("memory") String memory,
                             @Param("description") String description,
                             @Param("typeOfProduct") String typeOfProduct,
                             @Param("adminId") Long adminId);
}
