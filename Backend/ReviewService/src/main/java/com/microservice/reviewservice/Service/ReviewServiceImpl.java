package com.microservice.reviewservice.Service;


import com.microservice.reviewservice.Model.Review;
import com.microservice.reviewservice.Repository.ReviewRepository;
import com.microservice.reviewservice.ServiceCommunication.ProductFeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService{

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private ProductFeignClient productFeignClient;


    @Override
    public boolean isReviewExist(Long userId, Long productId) {
        return reviewRepository.isReviewExist(userId , productId)!=null;

    }

    @Override
    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public boolean deleteReviewByAdmin(Long reviewId, Long adminId) {
        List<Long> productsId = productFeignClient.getProductsIdByAdminId(adminId);
        for (Long productId : productsId) {
            try {
                reviewRepository.deleteReviewByProduct(reviewId, productId);
                return true;
            } catch (Exception e) {
                // Ignore if not found, continue checking next product
            }
        }

        return false;

    }

    @Override
    public boolean deleteReviewByUser(Long reviewId, Long userId) {
        try {
            reviewRepository.deleteReviewByUser(reviewId, userId);
            return true;
        }catch (Exception e){
            return false;
        }

    }

    public List<Review> getReviewById(Long productId){
       return reviewRepository.findReviewById(productId);
    }

    @Override
    public boolean deleteByProductId(Long productId) {
        try {
            reviewRepository.deleteReviewById(productId);
            return true;
        }catch (Exception e){
            return false;
        }
    }


}
