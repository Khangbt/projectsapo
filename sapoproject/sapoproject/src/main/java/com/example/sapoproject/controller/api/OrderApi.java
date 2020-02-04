package com.example.sapoproject.controller.api;

import com.example.sapoproject.converter.MaptoDto;
import com.example.sapoproject.dto.NameDto;
import com.example.sapoproject.entity.OrderbyEntity;
import com.example.sapoproject.entity.SalesboardEntity;
import com.example.sapoproject.service.ipm.OrderServiceIpm;
import com.example.sapoproject.service.ipm.SalesboardServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class OrderApi {
    @Autowired
    private OrderServiceIpm orderServiceIpm;

    @Autowired
    private SalesboardServiceImp salesboardServiceImp;
    private MaptoDto maptoDto=new MaptoDto();
                    @RequestMapping(value = "/order/{id}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getId(@PathVariable int id){
        Optional<OrderbyEntity> entities=orderServiceIpm.getId(id);
        if(!entities.isPresent()){
            return new ResponseEntity<>("không có gía trị", HttpStatus.NOT_FOUND);
        }

         return new ResponseEntity<>(entities, HttpStatus.OK);
    }
    @RequestMapping(value = "/orders",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAll(){
       List<Map<String,Object>> entities= (List<Map<String, Object>>) orderServiceIpm.getAllOrder();
        if(entities.size()==0){
            return new ResponseEntity<>("không có gía trị", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(entities, HttpStatus.OK);
    }
    @RequestMapping(value = "/orders",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> post(@RequestBody SalesboardEntity entity){
     //   Iterable<SalesboardEntity> entities=orderServiceIpm.getId(id);
        salesboardServiceImp.save(entity);
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }
    @RequestMapping(value = "/orderslist",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> postList(@RequestBody List<SalesboardEntity> entity){
        //   Iterable<SalesboardEntity> entities=orderServiceIpm.getId(id);
        salesboardServiceImp.saveList(entity);
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }
    @RequestMapping(value = "/ordername/{id}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getNameId(@PathVariable int id){
        List<Map<String,Object>> entities=salesboardServiceImp.getName(id);
        List<NameDto> dtos= (List<NameDto>) maptoDto.getMapList(entities,NameDto.class);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
}
