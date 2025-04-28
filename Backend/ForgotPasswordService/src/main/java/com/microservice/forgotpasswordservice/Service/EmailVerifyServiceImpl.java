package com.microservice.forgotpasswordservice.Service;


import com.microservice.forgotpasswordservice.Helper.EmailService;
import com.microservice.forgotpasswordservice.Model.OTP;
import com.microservice.forgotpasswordservice.Repository.EmailVerifyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EmailVerifyServiceImpl implements EmailVerifyService{

    @Autowired
    private EmailVerifyRepository emailVerifyRepository;

    @Autowired
    private EmailService emailService;

    public void generateAndSendOtp(String email) {
        String otp = emailService.generateOtp();
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(2);

        // Save OTP to the database
       OTP otpEntity = new OTP();
        otpEntity.setEmail(email);
        otpEntity.setOtp(otp);
        otpEntity.setExpiryTime(expiryTime);
        emailVerifyRepository.save(otpEntity);

        // Send OTP via email
        emailService.sendOtpEmail(email, otp);
    }

    public boolean verifyOtp(String email, String otp) {
      OTP storedOtp   = emailVerifyRepository.findByEmail(email);

        if (storedOtp!=null&& !storedOtp.getOtp().isEmpty() && storedOtp.getOtp().equals(otp)) {
            if (storedOtp.getExpiryTime().isAfter(LocalDateTime.now())) {
                emailVerifyRepository.delete(storedOtp); // Remove OTP after successful verification
                return true;
            }
        }
        return false;
    }

    // Cleanup expired OTPs periodically
    public void cleanupExpiredOtps() {
        emailVerifyRepository.deleteByExpiryTimeBefore(LocalDateTime.now());
    }



}
