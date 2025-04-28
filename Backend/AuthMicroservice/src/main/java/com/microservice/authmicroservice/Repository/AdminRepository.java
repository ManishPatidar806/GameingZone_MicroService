package com.microservice.authmicroservice.Repository;


import com.microservice.authmicroservice.Model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin , Long> {
    Admin findByEmail(String email);

    @Query("SELECT a from Admin a where a.phone=:number")
    Admin findByNumber(@Param("number") String number);

}
