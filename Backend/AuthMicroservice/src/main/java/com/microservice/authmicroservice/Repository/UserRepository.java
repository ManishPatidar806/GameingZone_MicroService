package com.microservice.authmicroservice.Repository;

import com.microservice.authmicroservice.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;



public interface UserRepository extends JpaRepository<User, Long> {

  User findByEmail(String email);
  User findByPhone(String phoneNumber);

}
