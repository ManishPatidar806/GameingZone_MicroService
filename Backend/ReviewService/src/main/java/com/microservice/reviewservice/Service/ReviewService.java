package com.microservice.reviewservice.Service;



import com.microservice.reviewservice.Model.Review;

import java.util.List;

public interface ReviewService {
    public boolean isReviewExist(Long userId , Long productId);

    public Review saveReview(Review review);

    public boolean deleteReviewByAdmin(Long reviewId  , Long adminId);

    public boolean deleteReviewByUser(Long reviewId  , Long userId);

    public List<Review> getReviewById(Long productId);

    public boolean deleteByProductId(Long productId);

}
