package com.example.sapoproject.converter;

import com.example.sapoproject.dto.SalesboarDto;
import com.example.sapoproject.dto.SetOrderDto;
import com.example.sapoproject.entity.ProductEntity;

import java.util.List;

public class Update {
    public   List<ProductEntity> updateProduct(List<ProductEntity> list, List<SalesboarDto> dtos){
        if(list.size()!=dtos.size()){
            return null;
        }

        for (ProductEntity entity:list){
            for (SalesboarDto dto: dtos){
                if(entity.getIdproduct()==dto.getIdProduct()){
                    int dem=entity.getInventoryNumber()-dto.getAmount();
                    if(dem<0){
                        return null;
                    }else {
                        entity.setInventoryNumber(dem);
                    }
                }
            }
        }

    return list;}
}
