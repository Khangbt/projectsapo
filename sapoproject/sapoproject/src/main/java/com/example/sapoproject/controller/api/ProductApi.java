package com.example.sapoproject.controller.api;

import com.example.sapoproject.converter.DtotoEntity;
import com.example.sapoproject.dto.ProductDto;
import com.example.sapoproject.entity.CustomerEntity;
import com.example.sapoproject.entity.ProductEntity;
import com.example.sapoproject.service.ipm.ProductServiceIpm;
import org.hibernate.annotations.Parameter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin({"*"})
public class ProductApi {
    @Autowired
    private ProductServiceIpm productServiceIpm;
    @RequestMapping(value = "/sreachproduct", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> sreachName(@RequestParam String name){
        List<ProductEntity> entities= (List<ProductEntity>) productServiceIpm.getName(name);
        if(entities.size()==0){
            return new ResponseEntity<>("Không có giá trị", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(entities,HttpStatus.OK);
    }
    @RequestMapping(value = "/product/{id}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getId(@PathVariable int id){
        Optional<ProductEntity> entity=productServiceIpm.getId(id);
        if(!entity.isPresent()){
            return new ResponseEntity<>("không có giá tri",HttpStatus.OK);
        }

        return new ResponseEntity<>(entity.get(),HttpStatus.OK);
    }
    @RequestMapping(value = "/products",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> postProduct(@Valid @RequestBody ProductDto productDto){
        ProductEntity entity=new ProductEntity();
        Date date=new Date();
        entity.setDateCreated(new Timestamp(date.getTime()));
        entity= (ProductEntity) DtotoEntity.getDTO(entity,productDto);
        productServiceIpm.save(entity);

        return new ResponseEntity<>(entity,HttpStatus.OK);
    }
    @RequestMapping(value = "/product/{id}",method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> putProduct(@Valid @RequestBody ProductDto productDto,@PathVariable int id){
        Optional<ProductEntity> customerEntity = productServiceIpm.getId(id);
        if (!customerEntity.isPresent()) {
            return new ResponseEntity<>("ko có giá trị", HttpStatus.NOT_FOUND);
        }
        ProductEntity entity = customerEntity.get();
        entity = (ProductEntity) DtotoEntity.getDTO(entity, productDto);
        productServiceIpm.save(entity);
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }
}
