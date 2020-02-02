package com.example.sapoproject.service.ipm;

import com.example.sapoproject.entity.ProductEntity;

import java.util.Optional;

public interface  ProductServiceIpm {
    void  save(ProductEntity entity);
    Optional<ProductEntity> getId(int id);
    Iterable<ProductEntity> getName(String name);
}
