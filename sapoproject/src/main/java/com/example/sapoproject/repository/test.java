package com.example.sapoproject.repository;

import com.example.sapoproject.entity.ProductEntity;
import com.example.sapoproject.service.SalesboardService;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;

public class test {

    @Autowired
    private static ProductRepository pR;
    public static void main(String[] args) {
        ProductEntity p= new ProductEntity();
        p.setNameProduct("lvh");
        p.setProductCode("lvh");
        p.setInventoryNumber(3);
        p.setPrice(Long.valueOf(20000));
        System.out.println("lhhh");
        System.out.println(pR.save(p));

    }
}
