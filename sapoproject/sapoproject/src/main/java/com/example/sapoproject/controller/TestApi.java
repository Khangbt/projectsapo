package com.example.sapoproject.controller;

import com.example.sapoproject.converter.Convent;
import com.example.sapoproject.converter.MaptoDto;
import com.example.sapoproject.dto.SalesboarDto;
import com.example.sapoproject.dto.TestDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class TestApi {
    Convent<TestDto> convent=new Convent<>();
    MaptoDto maptoDto=new MaptoDto();
    @RequestMapping(value = "/te",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> test(@RequestBody Map<String,Object> mmang){
        System.out.println(mmang);
                Object dto=  convent.mapToDto(mmang,TestDto.class);
    return new ResponseEntity<>(dto, HttpStatus.NOT_FOUND);}
}
