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


    @Query(value = "SELECT sales_board.product_name as nameProduct, sales_board.quantity as amount,product.product_code as productCode,sales_board.price" +
            " FROM pos.product,pos.sales_board " +
            " where  sales_board.product_id=product.id and sales_board.order_id=?1 ",nativeQuery = true)
    List<Map<String,Object>> getNameproduuct(int id);
    @Query(value = "SELECT product.id as idProduct, product.name as nameProduct , sales_board.quantity as amount,product.product_code as productCode ," +
            " product.price as price FROM pos.product,pos.sales_board " +
            " where  sales_board.product_id=product.id and sales_board.order_id=?1 ",nativeQuery = true)
    Page<Map<String,Object>> getNameCustomer(Pageable pageable, int id);
}
