package com.example.sapoproject.logic;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class LogicPage {
    public Pageable logic(int default_siza,int default_page,int siza,int page){
        if(page<=0) page=0;
        if(siza<=0) siza=default_siza;

        Pageable pageable= PageRequest.of(page,siza);
    return pageable;}
}
