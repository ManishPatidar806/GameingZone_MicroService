package com.microservice.admindashboardservice.Service;


import com.microservice.admindashboardservice.Model.Product;
import com.microservice.admindashboardservice.RequestAndResponse.UpdateProduct;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {
    public boolean saveProduct(Product product);
    public Product getProductByName(String name);
    public Product getProductForUpdate(String name , Long adminId);
    public int updateProduct(UpdateProduct updateProduct , Long adminId);
    public String extractPublicId(String secureUrl);
    public boolean deleteProductByName(String name ,Long productId, Long adminId) throws Exception;

    public List<Product> getAllProductOfAdmin(Long adminId);

    public List<Product> getAllProduct();

    public Product getProductById(Long productId);

    public List<Long> getAllProductId(Long adminId);

}
