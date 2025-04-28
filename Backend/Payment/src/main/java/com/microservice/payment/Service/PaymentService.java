package com.microservice.payment.Service;


import com.microservice.payment.RequestAndResponse.PaymentRequest;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import org.springframework.stereotype.Service;

@Service
public interface PaymentService {
    Session payment(PaymentRequest paymentRequest) throws StripeException;
}
