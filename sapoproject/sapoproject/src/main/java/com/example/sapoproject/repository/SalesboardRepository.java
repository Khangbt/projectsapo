package com.example.sapoproject.repository;

import com.example.sapoproject.entity.SalesboardEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface SalesboardRepository extends CrudRepository<SalesboardEntity,Integer> {


    @Query(value = "SELECT salesboard.name_product , salesboard.amount,product.product_code as productcode,salesboard.price" +
            " FROM pos.product,pos.salesboard " +
            " where  salesboard.idproduct=product.idproduct and salesboard.idorder=?1 ",nativeQuery = true)
    List<Map<String,Object>> getNameproduuct(int id);
    @Query(value = "SELECT product.name_product as nameproduct , salesboard.amount,product.product_code as productcode ," +
            " product.price as price FROM pos.product,pos.salesboard " +
            " where  salesboard.idproduct=product.idproduct and salesboard.idorder=?1 ",nativeQuery = true)
    Page<Map<String,Object>> getNameCustomer(Pageable pageable, int id);
}
