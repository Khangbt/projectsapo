package com.example.sapoproject.service.ipm;

import com.example.sapoproject.entity.OrderbyEntity;
import com.example.sapoproject.entity.SalesboardEntity;

import java.util.Map;
import java.util.Optional;

public interface OrderServiceIpm {
    Optional<OrderbyEntity> getId(int id);
    void save(OrderbyEntity entity);
    Iterable<Map<String,Object>> getAllOrder();
    int getMaxOrder();
}
