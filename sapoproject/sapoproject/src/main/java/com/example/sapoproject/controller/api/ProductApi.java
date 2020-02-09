package com.example.sapoproject.controller.api;

import com.example.sapoproject.converter.Convent;
import com.example.sapoproject.converter.DtotoEntity;
import com.example.sapoproject.dto.CustomerDto;
import com.example.sapoproject.dto.ProductDto;
import com.example.sapoproject.entity.ProductEntity;
import com.example.sapoproject.logic.LogicPage;
import com.example.sapoproject.service.ipm.ProductServiceIpm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Null;
import java.sql.Timestamp;
import java.util.*;

@RestController
@CrossOrigin({"*"})
public class ProductApi {
    @Autowired
    private ProductServiceIpm productServiceIpm;
    Convent<ProductDto> convent = new Convent<>();


    @RequestMapping(value = "/sreachproduct", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> sreachName(@RequestParam String name) {
        List<ProductEntity> entities = (List<ProductEntity>) productServiceIpm.getName(name);
        if (entities.size() == 0) {
            return new ResponseEntity<>("Không có giá trị", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(DtotoEntity.getList(entities, ProductDto.class), HttpStatus.OK);
    }
    @RequestMapping(value = "/products", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllProduct(@RequestParam(required = false, defaultValue = "0") @Null Integer page,
                                           @RequestParam(required = false, defaultValue = "5") @Null Integer size) {
        Pageable pageable = new LogicPage().logic(20, 0, size, page);
        Page<ProductEntity> entities=  productServiceIpm.getAllLi(pageable);
        if (entities.getSize() == 0) {
            return new ResponseEntity<>("khong co gia tri", HttpStatus.BAD_GATEWAY);
        }
        Page<ProductEntity> dtos= (Page<ProductEntity>) DtotoEntity.getDto(entities,CustomerDto.class);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
    @RequestMapping(value = "/product/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getId(@PathVariable int id) {
        Optional<ProductEntity> entity = productServiceIpm.getId(id);
        if (!entity.isPresent()) {
            return new ResponseEntity<>("không có giá tri", HttpStatus.OK);
        }
        ProductEntity entity1=entity.get();
        return new ResponseEntity<>(DtotoEntity.getDTOTest(ProductDto.class,entity1), HttpStatus.OK);
    }

    @RequestMapping(value = "/product", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> postProduct(@RequestBody Map<String, Object> productDto) {
        Object entity = convent.dtoToEntity(ProductEntity.class, productDto, ProductDto.class);
        if (!(entity instanceof ProductEntity)) {
            return new ResponseEntity<>(entity, HttpStatus.NOT_FOUND);
        }
        ProductEntity entity1 = (ProductEntity) entity;
        Date date = new Date();
        entity1.setDateCreated(new Timestamp(date.getTime()));

        ProductEntity get = productServiceIpm.saveGetId(entity1);

        return new ResponseEntity<>(DtotoEntity.getDTOTest(ProductDto.class,get), HttpStatus.OK);
    }

    @RequestMapping(value = "/product/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> putProduct(@RequestBody Map<String,Object > productDto, @PathVariable int id) {
        Optional<ProductEntity> customerEntity = productServiceIpm.getId(id);
        if (!customerEntity.isPresent()) {
            return new ResponseEntity<>("ko có giá trị", HttpStatus.NOT_FOUND);
        }
        Object o=convent.mapToDto(productDto,ProductDto.class);
        if(!(o instanceof  ProductDto)){
            return new ResponseEntity<>(o, HttpStatus.NOT_FOUND);
        }
        ProductEntity entity = customerEntity.get();

        entity = (ProductEntity) DtotoEntity.getDTO(entity,o);
        entity.setIdproduct(id);
        System.err.println(entity.toString());
       ProductEntity entity1= productServiceIpm.saveGetId(entity);

        return new ResponseEntity<>(DtotoEntity.getDTOTest(ProductDto.class,entity1), HttpStatus.OK);
    }

    @RequestMapping(value = "/testmoi", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getIdAA() {
        Integer[] a = {1, 2, 3};
        List<Integer> list = Arrays.asList(a);
        Iterable<ProductEntity> entities = productServiceIpm.getListId(list);
        return new ResponseEntity<>(entities, HttpStatus.OK);
    }
}
