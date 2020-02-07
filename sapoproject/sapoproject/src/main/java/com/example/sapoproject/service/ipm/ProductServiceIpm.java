package com.example.sapoproject.service.ipm;

import com.example.sapoproject.entity.ProductEntity;

import java.util.List;
import java.util.Optional;

public interface  ProductServiceIpm {
    ProductEntity  saveGetId(ProductEntity entity);
    Optional<ProductEntity> getId(int id);
    Iterable<ProductEntity> getName(String name);
    Iterable<ProductEntity> getListId(List<Integer> list);
    Iterable<ProductEntity> saveList(Iterable<ProductEntity> entities);
}
