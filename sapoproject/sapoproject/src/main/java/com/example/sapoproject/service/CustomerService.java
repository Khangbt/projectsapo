package com.example.sapoproject.service;

import com.example.sapoproject.annotation.Test;
import com.example.sapoproject.entity.CustomerEntity;
import com.example.sapoproject.repository.CustomerRepository;
import com.example.sapoproject.service.ipm.CustomerServiceIpm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomerService implements CustomerServiceIpm {
    @Autowired
    private CustomerRepository customerRepository;
    @Override
    public Page<CustomerEntity> getAll(Pageable pageable) {
        return customerRepository.getAllCustoomer(pageable);
    }

    @Override
    public Page<CustomerEntity> getBySDT(Pageable pageable, int Sdt) {
        return customerRepository.getSdt(pageable,Sdt);
    }

    @Override
    public Page<CustomerEntity> getByName(Pageable pageable, String name) {
        return customerRepository.getNameCustomer(pageable,name);
    }

    @Override
    public Optional<CustomerEntity> getIdCustomer(int id) {
        return customerRepository.findById(id);
    }

    @Override
    public CustomerEntity saveAndGetID(CustomerEntity entity) {
       return customerRepository.saveAndFlush(entity);
    }

    @Override
    public boolean checkId(int id) {
        Optional<CustomerEntity> entity=customerRepository.findById(id);
        if(!entity.isPresent()){
            return false;
        }
        return true;
    }

    @Override
    public List<Map<String,Object>> getAll1() {
        return customerRepository.getAll123();
    }

}
