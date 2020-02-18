package com.example.sapoproject.service;

import com.example.sapoproject.entity.PaymentEntity;

import com.example.sapoproject.repository.PaymentRepository;
import com.example.sapoproject.service.ipm.PaymentIpm;
import org.springframework.beans.factory.annotation.Autowired;

public class PaymentService implements PaymentIpm {
    @Autowired
    private PaymentRepository paymentRepository;
    @Override
    public Iterable<PaymentEntity> getAll() {
        return paymentRepository.findAll();
    }
}
