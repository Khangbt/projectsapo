package com.example.sapoproject.service.ipm;

import com.example.sapoproject.entity.ProductEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface  ProductServiceIpm {
    ProductEntity  saveGetId(ProductEntity entity);
    Optional<ProductEntity> getId(int id);
    Iterable<ProductEntity> getName(String name);
    Iterable<ProductEntity> getListId(List<Integer> list);
    Iterable<ProductEntity> saveList(Iterable<ProductEntity> entities);
    Page<ProductEntity> getAllLi(Pageable pageable);
    boolean checkMasp(String sdt);
    boolean checkNameSp(String name);

    int updateInventoryProduct(int inventory, int id, int version);
}
