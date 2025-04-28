package com.microservice.carthistoryservice.Repository;


import com.microservice.carthistoryservice.Model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderStatusRepository extends JpaRepository<OrderStatus, Long> {
    OrderStatus findByName(String name);
}
