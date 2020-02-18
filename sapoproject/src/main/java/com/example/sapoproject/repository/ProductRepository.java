package com.example.sapoproject.repository;

import com.example.sapoproject.entity.ProductEntity;
import org.hibernate.dialect.lock.PessimisticReadSelectLockingStrategy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.LockModeType;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity,Integer> {

    @Query(value = "select * from  product where name like %?1% limit 0,20",nativeQuery = true)
    public Iterable<ProductEntity> getNameProduct(String name);

    @Query(value = "select  * from product where product.id IN (?1)",nativeQuery = true)
    Iterable<ProductEntity> getListId(List<Integer> list);

    @Query(value = "select * from product" ,nativeQuery = true)
    Page<ProductEntity> getAllList(Pageable pageable);
    @Query(value = "select count(product.id) from product where product.product_code=?1",nativeQuery = true)
    Integer checkProductCode(String productCode);
    @Query(value = "select count(product.id) from product where product.name=?1",nativeQuery = true)
    Integer chechProductName(String productName);


}
