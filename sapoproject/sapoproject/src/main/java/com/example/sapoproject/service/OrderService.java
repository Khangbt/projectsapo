package com.example.sapoproject.service;

import com.example.sapoproject.entity.OrderbyEntity;
import com.example.sapoproject.entity.SalesboardEntity;
import com.example.sapoproject.repository.OrderRepository;
import com.example.sapoproject.repository.SalesboardRepository;
import com.example.sapoproject.service.ipm.OrderServiceIpm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class OrderService implements OrderServiceIpm {
    @Autowired
    private OrderRepository orderRepository;


    @Override
    public Optional<OrderbyEntity> getId(int id) {
        return orderRepository.getByIdorder(id);
    }

    @Override
    public void save(OrderbyEntity entity) {
        orderRepository.save(entity);
    }

    @Override
    public Iterable<Map<String, Object>> getAllOrder() {
        return orderRepository.getAll();
    }

    @Override
    public int getMaxOrder() {
        return orderRepository.getMaxOrder();
    }


}
