package com.example.sapoproject.repository;

import com.example.sapoproject.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity,Integer> {
    @Query(value = "select * from  product where name_product like %?1%",nativeQuery = true)
    Iterable<ProductEntity> getNameProduct(String name);
    @Query(value = "select  * from product where product.idproduct IN (?1)",nativeQuery = true)
    Iterable<ProductEntity> getListId(List<Integer> list);
    @Query(value = "select * from product" ,nativeQuery = true)
    Page<ProductEntity> getAllList(Pageable pageable);
    @Query(value = "select count(product.idproduct) from product where product.product_code=?1",nativeQuery = true)
    Integer checkProductCode(String productCode);
    @Query(value = "select count(product.idproduct) from product where product.name_product=?1",nativeQuery = true)
    Integer chechProductName(String productName);

}