package com.example.sapoproject.service;

import com.example.sapoproject.entity.SalesboardEntity;
import com.example.sapoproject.repository.SalesboardRepository;
import com.example.sapoproject.service.ipm.SalesboardServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
@Service
public class SalesboardService implements SalesboardServiceImp {
    @Autowired
    private SalesboardRepository salesboardRepository;
    @Override
    public List<Map<String, Object>> getName(int id) {
        return salesboardRepository.getNameproduuct(id);
    }

    @Override
    public Iterable<SalesboardEntity> getId(int id) {
        return null;

    }

    @Override
    public void save(SalesboardEntity salesboardEntity) {
            salesboardRepository.save(salesboardEntity);
    }

    @Override
    public void saveList(Iterable<SalesboardEntity> entities) {
            salesboardRepository.saveAll(entities);
    }
}
