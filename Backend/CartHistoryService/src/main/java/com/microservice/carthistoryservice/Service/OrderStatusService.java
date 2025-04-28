package com.microservice.carthistoryservice.Service;


import com.microservice.carthistoryservice.Helper.User;
import com.microservice.carthistoryservice.Model.OrderStatus;
import com.microservice.carthistoryservice.RequestAndResponse.OrderRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrderStatusService {

public List<OrderStatus> findAllOrder();

public boolean saveOrderList(List<OrderRequest> orderRequests, User user);

}
