package com.example.sapoproject.service.ipm;

import com.example.sapoproject.entity.SalesboardEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;

public interface SalesboardServiceImp {
    List<Map<String,Object>> getName(int id);
    Iterable<SalesboardEntity> getId(int id);
    void save(SalesboardEntity salesboardEntity);
    void saveList(Iterable<SalesboardEntity> entities);
    Page<Map<String,Object>> getNamePage(int id, Pageable pageable);
}
