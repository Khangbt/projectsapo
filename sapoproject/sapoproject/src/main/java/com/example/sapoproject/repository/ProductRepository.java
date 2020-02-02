package com.example.sapoproject.repository;

import com.example.sapoproject.entity.ProductEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<ProductEntity,Integer> {
    @Query(value = "select * from  product where name_product like %?1% limit 0,5",nativeQuery = true)
    public Iterable<ProductEntity> getNameProduct(String name);
}
