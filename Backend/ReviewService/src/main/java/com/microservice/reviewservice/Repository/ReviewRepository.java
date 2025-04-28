package com.microservice.reviewservice.Repository;


import com.microservice.reviewservice.Model.Review;
import jakarta.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Modifying
    @Transactional
    @Query("DELETE FROM Review r WHERE r.productId = :productId")
    void deleteReviewById(@RequestParam("productId") Long productId);

    @Query("SELECT r FROM Review r where  r.productId=:productId")
    List<Review> findReviewById(@Param("productId") Long productId);

    @Query("SELECT r FROM Review r where r.userId=:userId And r.productId=:productId")
    Review isReviewExist(@Param("userId") Long userId , @Param("productId") Long productId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Review r WHERE r.id = :reviewId AND r.productId = :productId")
    void deleteReviewByProduct(@Param("reviewId") Long reviewId, @Param("productId") Long productId);

    @Modifying
    @Transactional
    @Query("DELETE  FROM Review r where r.id=:reviewId And  r.userId=:userId")
    void deleteReviewByUser(@Param("reviewId") Long reviewId ,@Param("userId") Long userId);



}
