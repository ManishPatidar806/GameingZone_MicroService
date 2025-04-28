package com.microservice.reviewservice.Controller;


import com.microservice.reviewservice.Helper.Admin;
import com.microservice.reviewservice.Helper.Product;
import com.microservice.reviewservice.Helper.User;
import com.microservice.reviewservice.Model.Review;
import com.microservice.reviewservice.RequestAndResponse.CommonResponse;
import com.microservice.reviewservice.RequestAndResponse.ReviewRequest;
import com.microservice.reviewservice.RequestAndResponse.ReviewResponse;
import com.microservice.reviewservice.Service.ReviewService;
import com.microservice.reviewservice.ServiceCommunication.ProductFeignClient;
import com.microservice.reviewservice.ServiceCommunication.SecurityFeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/v1/review")
public class ReviewController {

    @Autowired
    private SecurityFeignClient securityFeignClient;

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ProductFeignClient productFeignClient;


    @PostMapping("/addReview")
        public ResponseEntity<CommonResponse> addReview(@RequestHeader("Authorization") String token , @RequestBody ReviewRequest reviewRequest , @RequestParam Long productId){
            CommonResponse commonResponse = new CommonResponse();
            try {
//                if (!security.validateToken(token)) {
//                    throw new Exception("Invalid Authorized");
//                }
                String role = securityFeignClient.extractRole(token);
                if (role.equals("ADMIN")) {
                    throw new Exception("Invalid Access");
                }

                String email =  securityFeignClient.extractEmail(token);
                if(email.isEmpty()){
                    throw new Exception("User is not found");
                }
                User user = securityFeignClient .extractUser(email);
                if(user==null){
                    throw new Exception("User not found");
                }
                Product product = productFeignClient.extractProduct(productId);
                if(product==null){
                    throw new Exception("Invalid Comment");
                }

                Review review = new Review();
                review.setUserId(user.getId());
                review.setProductId(productId);
                review.setDate(LocalDate.now());
                review.setName(user.getName());
                if(review.getStar()<0||reviewRequest.getComment().isEmpty()){
                    throw new Exception("fill form properly");
                }
                review.setStar(reviewRequest.getStar());
                review.setComment(reviewRequest.getComment());
                if(reviewService.isReviewExist(user.getId() , productId)){
                    throw new Exception("Comment is already present");
                }

                Review savedReview = reviewService.saveReview(review);
                if (savedReview == null) {
                    throw new Exception("Failed to save review");
                }
                commonResponse.setMessage("Review added successfully");
                commonResponse.setStatus(true);
                return ResponseEntity.ok(commonResponse);

            }catch (Exception e){
                commonResponse.setMessage(e.getMessage());
                commonResponse.setStatus(false);
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(commonResponse);
            }

        }
/*
* here we have not implement edit option in review
* */
    @PostMapping("/updateReview")
    public ResponseEntity<CommonResponse> updateReview(@RequestHeader("Authorization") String token , @RequestBody ReviewRequest reviewRequest , @RequestParam Long productId){
        CommonResponse commonResponse = new CommonResponse();
        try {
//            if (!security.validateToken(token)) {
//                throw new Exception("Invalid Authorized");
//            }
            String role = securityFeignClient.extractRole(token);
            if (role.equals("ADMIN")) {
                throw new Exception("Invalid Access");
            }

            String email =  securityFeignClient.extractEmail(token);
            if(email.isEmpty()){
                throw new Exception("User is not found");
            }
            User user = securityFeignClient.extractUser(email);
            if(user==null){
                throw new Exception("User not found");
            }
            Product product =productFeignClient.extractProduct(productId);
            if(product==null){
                throw new Exception("Invalid Comment");
            }

            Review review = new Review();
//            review.setUser(user);
//            review.setProduct(product);
            review.setDate(LocalDate.now());
            review.setName(user.getName());
            if(review.getStar()<0||reviewRequest.getComment().isEmpty()){
                throw new Exception("fill form properly");
            }
            review.setStar(reviewRequest.getStar());
            review.setComment(reviewRequest.getComment());
            if(!reviewService.isReviewExist(user.getId() , product.getId())){
                throw new Exception("Review is Not present");
            }

            Review savedReview = reviewService.saveReview(review);
            if (savedReview == null) {
                throw new Exception("Failed to save review");
            }
            commonResponse.setMessage("Review Updated successfully");
            commonResponse.setStatus(true);
            return ResponseEntity.ok(commonResponse);

        }catch (Exception e){
            commonResponse.setMessage(e.getMessage());
            commonResponse.setStatus(false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(commonResponse);
        }

    }

    @GetMapping("/deleteReview")
    public ResponseEntity<CommonResponse> deleteReview(@RequestHeader("Authorization") String token , @RequestParam Long reviewId){
        CommonResponse commonResponse = new CommonResponse();
        try {
//            if (!security.validateToken(token)) {
//                throw new Exception("Invalid Authorized");
//            }
                String email = securityFeignClient.extractEmail(token);
                if (email.isEmpty()) {
                    throw new Exception("User is not found");
                }
            String role = securityFeignClient.extractRole(token);

            if (role.equals("ADMIN")) {
                Admin admin = securityFeignClient.extractAdmin(email);
                if (admin == null) {
                    throw new Exception("Admin not found");
                }
                boolean result = reviewService.deleteReviewByAdmin(reviewId, admin.getId());
                if (!result) {
                    throw new Exception("Failed to delete review");
                }
            }else {
                User user = securityFeignClient.extractUser(email);
                if (user == null) {
                    throw new Exception("User not found");
                }
                boolean result = reviewService.deleteReviewByUser(reviewId, user.getId());
                if (!result) {
                    throw new Exception("Failed to delete review");
                }
            }
            commonResponse.setMessage("Review Deleted successfully");
            commonResponse.setStatus(true);
            return ResponseEntity.ok(commonResponse);
        }catch (Exception e){
            commonResponse.setMessage(e.getMessage());
            commonResponse.setStatus(false);
            return new ResponseEntity<>(commonResponse , HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/findReview")
    public ResponseEntity<ReviewResponse> getAllReview(@RequestHeader("Authorization") String token , @RequestParam Long productId){
        ReviewResponse response = new ReviewResponse();
        try {
//            if (!security.validateToken(token)) {
//                throw new Exception("Invalid Authorized");
//            }
            if(productId==null){
                throw new Exception("ProductId not found");
            }
            List<Review> review = reviewService.getReviewById(productId);
            if(review==null){
                throw new Exception("Invalid Comment");
            }
            response.setReview(review);
            response.setMessage("Reivew Loaded Successfully");
            response.setStatus(true);
            return ResponseEntity.ok(response);

        }catch (Exception e){
            response.setMessage(e.getMessage());
            response.setStatus(false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

    }

}
