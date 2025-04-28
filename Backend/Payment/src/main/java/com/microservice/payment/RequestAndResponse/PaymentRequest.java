package com.microservice.payment.RequestAndResponse;

import java.util.List;

public class PaymentRequest {


    List<ProductPaymentRequest> productPaymentRequestList;

    public static class ProductPaymentRequest{
        public Long productId;

       public long amount;

       public String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Long getProductId() {
            return productId;
        }

        public void setProductId(Long productId) {
            this.productId = productId;
        }

        public long getAmount() {
            return amount;
        }

        public void setAmount(long amount) {
            this.amount = amount;
        }
    }

    public List<ProductPaymentRequest> getProductPaymentRequestList() {
        return productPaymentRequestList;
    }

    public void setProductPaymentRequestList(List<ProductPaymentRequest> productPaymentRequestList) {
        this.productPaymentRequestList = productPaymentRequestList;
    }
}
