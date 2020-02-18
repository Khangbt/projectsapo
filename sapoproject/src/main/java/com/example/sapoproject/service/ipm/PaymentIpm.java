package com.example.sapoproject.service.ipm;

import com.example.sapoproject.annotation.Test;
import com.example.sapoproject.entity.PaymentEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

@Service
public interface PaymentIpm  {
    Iterable<PaymentEntity> getAll();
}
