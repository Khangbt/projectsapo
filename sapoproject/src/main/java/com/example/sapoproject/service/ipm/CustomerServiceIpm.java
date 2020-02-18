package com.example.sapoproject.service.ipm;


import com.example.sapoproject.entity.CustomerEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public interface CustomerServiceIpm {
        Page<CustomerEntity> getAll(Pageable pageable);
        Page<CustomerEntity> getBySDT(Pageable pageable,int Sdt);
        Page<CustomerEntity> getByName(Pageable pageable,String name);
        Optional<CustomerEntity> getIdCustomer(int id);
        CustomerEntity  saveAndGetID(CustomerEntity entity);
        boolean checkId(int id);
        List<Map<String,Object>> getAll1();
        boolean checkSdt(Integer sdt);

}
