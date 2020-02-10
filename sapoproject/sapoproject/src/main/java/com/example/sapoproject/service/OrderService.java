package com.example.sapoproject.service;

import com.example.sapoproject.entity.OrderbyEntity;
import com.example.sapoproject.entity.SalesboardEntity;
import com.example.sapoproject.repository.OrderRepository;
import com.example.sapoproject.repository.SalesboardRepository;
import com.example.sapoproject.service.ipm.OrderServiceIpm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
public class OrderService implements OrderServiceIpm {
    @Autowired
    private OrderRepository orderRepository;


    @Override
    public Optional<OrderbyEntity> getId(int id)
    {
        return orderRepository.getByIdorder(id);
    }

    @Override
    public OrderbyEntity saveGetObject(OrderbyEntity entity)
    {
        return orderRepository.saveAndFlush(entity);
    }

    @Override
    public Page<Map<String, Object>> getAllOrder(Pageable pageable) {
        return orderRepository.getAll(pageable);
    }


    @Override
    public int getMaxOrder()
    {
        return orderRepository.getMaxOrder();
    }

    @Override
    public Page<Map<String, Object>> getNameCustomer(Pageable pageable, String name) {
        return orderRepository.getByCutomerName(pageable,name);
    }


}
