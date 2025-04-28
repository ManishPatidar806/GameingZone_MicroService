package com.microservice.carthistoryservice.Service;


import com.microservice.carthistoryservice.Model.Cart;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService  {
    public Cart AddCart(Cart cart);
    public List<Cart> showAllCart(Long userId);
    public boolean deleteCart(String name,Long userId);

    public boolean isExistInCart(String name , Long userId);

    public boolean removeAllItemFromCart(long userId);
}
