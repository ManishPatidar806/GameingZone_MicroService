package com.microservice.carthistoryservice.Service;



import com.microservice.carthistoryservice.Helper.Product;
import com.microservice.carthistoryservice.Helper.User;
import com.microservice.carthistoryservice.Model.OrderStatus;
import com.microservice.carthistoryservice.Repository.OrderStatusRepository;
import com.microservice.carthistoryservice.RequestAndResponse.OrderRequest;
import com.microservice.carthistoryservice.ServiceCommunication.ProductFeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderStatusServiceImpl implements OrderStatusService {

@Autowired
   private OrderStatusRepository orderStatusRepository;

@Autowired
 private ProductFeignClient productFeignClient;
    @Override
    public List<OrderStatus> findAllOrder() {
        return orderStatusRepository.findAll();
    }

    @Override
    public boolean saveOrderList(List<OrderRequest> orderRequests , User user)  {
try {
    List<OrderStatus> orderStatusList = new ArrayList<>();
    for (OrderRequest orderRequest : orderRequests) {
        long id = orderRequest.getProductId();
        Product product = productFeignClient.findById(id);
      if(orderStatusRepository.findByName(product.getName())==null){
        OrderStatus status = new OrderStatus();
        status.setPrice((long) product.getPrice());
        status.setDate(LocalDate.now());
        status.setCompany(product.getCompany());
        status.setLargePrice(product.getLargePrice());
        status.setName(product.getName());
        status.setImage(product.getMain_Image());
       status.setStatus(com.microservice.carthistoryservice.Utils.OrderStatus.DOWNLOAD);
       status.setId(user.getId());
        orderStatusList.add(status);
      }
    }
   List<OrderStatus> orderRequests1 = orderStatusRepository.saveAll(orderStatusList);
    return true;

}catch (Exception e){
    System.out.println(e.getMessage());
    return false;
}
    }
}
