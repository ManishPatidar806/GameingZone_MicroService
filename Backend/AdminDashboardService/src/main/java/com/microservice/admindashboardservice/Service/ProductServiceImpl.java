package com.microservice.admindashboardservice.Service;


import com.microservice.admindashboardservice.Model.Product;
import com.microservice.admindashboardservice.Repository.ProductRepository;
import com.microservice.admindashboardservice.RequestAndResponse.UpdateProduct;
import com.microservice.admindashboardservice.ServiceCommunication.ReviewFeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {


 @Autowired
 private ProductRepository productRepository;

 @Autowired
 private ReviewFeignClient reviewFeignClient;
    @Override
    public boolean saveProduct(Product product) {
        try {
            productRepository.save(product);
            return true;
        }catch (Exception e){
            return false;
        }
    }

    public Product getProductByName(String name) {
        return productRepository.findByName(name);
    }

    public Product getProductForUpdate(String name, Long adminId) {
        return productRepository.getProductForUpdate(name,adminId);
    }

    public int updateProduct(UpdateProduct updateProduct , Long adminId) {
       int result =  productRepository.updateProductDetails(updateProduct.getName(),updateProduct.getLargePrice(),
               updateProduct.getPrice(),updateProduct.getProcesser(),
               updateProduct.getGraphicCard(),updateProduct.getRam(),
               updateProduct.getMemory(),updateProduct.getDescription(),updateProduct.getTypeOfProduct() , adminId);
       return result;
    }

    /*
    * Modify in this method or FInd by Public ID
    * */

    @Value("${cloudinary.cloud-name}")
    private String cloudName;
    public String extractPublicId(String secureUrl) {
        // Remove Cloudinary base URL
        String baseUrl = "https://res.cloudinary.com/"+cloudName+"/image/upload/";
        if (secureUrl.startsWith(baseUrl)) {
            String path = secureUrl.substring(baseUrl.length());

            // Remove version prefix (e.g., "v1690000000/")
            String[] parts = path.split("/");
            if (parts.length > 1 && parts[0].matches("v\\d+")) {
                path = path.substring(parts[0].length() + 1);
            }

            // Remove file extension (e.g., ".jpg", ".png")
            return path.replaceAll("\\.[a-z]+$", "");
        }
        return null;
    }


    public boolean deleteProductByName(String name ,Long productId, Long adminId)  {
       try {
           reviewFeignClient.deleteReviewByProductId(productId);
           productRepository.deleteByName(name, adminId);
           return true;
       }catch (Exception e){
           return false;
       }
       }

    @Override
    public List<Product> getAllProductOfAdmin(Long adminId) {
        return productRepository.findAllProductOfAdmin(adminId);
    }

    public List<Product> getAllProduct(){
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(Long productId) {
       Optional<Product> product = productRepository.findById(productId);
       return product.get();
    }

    @Override
    public List<Long> getAllProductId(Long adminId) {
        return productRepository.getAllProductId(adminId);
    }


}
