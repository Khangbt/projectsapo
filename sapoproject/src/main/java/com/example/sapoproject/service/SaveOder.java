package com.example.sapoproject.service;

import com.example.sapoproject.converter.DtotoEntity;
import com.example.sapoproject.dto.SalesboarDto;
import com.example.sapoproject.entity.OrderbyEntity;
import com.example.sapoproject.entity.ProductEntity;
import com.example.sapoproject.entity.SalesboardEntity;
import com.example.sapoproject.service.ipm.OrderServiceIpm;
import com.example.sapoproject.service.ipm.ProductServiceIpm;
import com.example.sapoproject.service.ipm.SalesboardServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component

public class SaveOder {
    @Autowired
    private OrderServiceIpm orderServiceIpm;

    @Autowired
    private SalesboardServiceImp salesboardServiceImp;
    @Autowired
    private ProductServiceIpm productServiceIpm;
    @Transactional(rollbackFor = Exception.class)
    public void saveOrde(OrderbyEntity orderbyEntity,List<SalesboarDto> salesboarDtos,List<ProductEntity> productEntities) throws Exception {
        OrderbyEntity orderbyEntity1=orderServiceIpm.saveGetObject(orderbyEntity);

        List<SalesboardEntity> salesboardEntities= (List<SalesboardEntity>) DtotoEntity.getList(salesboarDtos,SalesboardEntity.class);
        for (SalesboardEntity salesboardEntity: salesboardEntities){
            salesboardEntity.setIdorder(orderbyEntity1.getIdorder());
        }
        salesboardServiceImp.saveList(salesboardEntities);
        productServiceIpm.saveList(productEntities);
        throw new Exception();
    }
}
