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
@Transactional(rollbackFor = Exception.class)
public class SaveOrder {
    @Autowired
    private OrderServiceIpm orderServiceIpm;

    @Autowired
    private SalesboardServiceImp salesboardServiceImp;
    @Autowired
    private ProductServiceIpm productServiceIpm;

    public void saveOrde(OrderbyEntity orderbyEntity, List<SalesboarDto> salesboarDtos, List<ProductEntity> productEntities) throws Exception {

//        for(ProductEntity productEntity : productEntities){
//            System.out.println("version" + productEntity.getVersion());
//           int a = productServiceIpm.updateInventoryProduct(productEntity.getInventoryNumber(), productEntity.getIdproduct(), productEntity.getVersion());
//           System.out.println("có vào ko" + a);
//           System.out.println(productServiceIpm.getId(productEntity.getIdproduct()));
//           if(a !=1){
//               throw new IllegalStateException("dddddditfsadasdfs");
//           }

                productServiceIpm.saveList(productEntities);
           for (ProductEntity productEntity : productEntities){
               System.out.println(productServiceIpm.getId(productEntity.getIdproduct()));
           }
               OrderbyEntity orderbyEntity1 = orderServiceIpm.saveGetObject(orderbyEntity);
               List<SalesboardEntity> salesboardEntities = (List<SalesboardEntity>) DtotoEntity.getList(salesboarDtos, SalesboardEntity.class);
               for (SalesboardEntity salesboardEntity : salesboardEntities) {
                   salesboardEntity.setIdorder(orderbyEntity1.getIdorder());
               }
               salesboardServiceImp.saveList(salesboardEntities);

        }



    }
