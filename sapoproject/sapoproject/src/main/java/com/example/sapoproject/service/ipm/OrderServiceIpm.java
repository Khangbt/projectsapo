package com.example.sapoproject.service.ipm;

import com.example.sapoproject.entity.OrderbyEntity;
import com.example.sapoproject.entity.SalesboardEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;
import java.util.Optional;

public interface OrderServiceIpm {
    Optional<OrderbyEntity> getId(int id);
    OrderbyEntity saveGetObject(OrderbyEntity entity);
    Page<Map<String,Object>> getAllOrder(Pageable pageable);
    int getMaxOrder();
    Page<Map<String,Object>> getNameCustomer(Pageable pageable,String name);
}
