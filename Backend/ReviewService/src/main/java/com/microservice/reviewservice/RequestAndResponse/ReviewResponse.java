package com.microservice.reviewservice.RequestAndResponse;


import com.microservice.reviewservice.Model.Review;

import java.util.List;

public class ReviewResponse {
    private String message;
    private boolean status;
    private List<Review> review;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public List<Review> getReview() {
        return review;
    }

    public void setReview(List<Review> review) {
        this.review = review;
    }
}
