package com.example.sapoproject.controller.api;

import com.example.sapoproject.annotation.Test;
import com.example.sapoproject.converter.DtotoEntity;
import com.example.sapoproject.converter.MaptoDto;
import com.example.sapoproject.dto.CustomerDto;
import com.example.sapoproject.entity.CustomerEntity;
import com.example.sapoproject.logic.LogicPage;
import com.example.sapoproject.logic.LogicType;
import com.example.sapoproject.service.ipm.CustomerServiceIpm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Null;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin({"*"})
public class CustomerApi {
    @Autowired
    private CustomerServiceIpm customerServiceIpm;

    @RequestMapping(value = "/customers", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAll(@RequestParam(required = false, defaultValue = "0") @Null Integer page,
                                    @RequestParam(required = false, defaultValue = "5") @Null Integer size) {
        Pageable pageable = new LogicPage().logic(20, 0, size, page);
        Page<CustomerEntity> list = customerServiceIpm.getAll(pageable);
        if (list.getSize() == 0) {
            return new ResponseEntity<>("khong co gia tri", HttpStatus.BAD_GATEWAY);
        }
        return new ResponseEntity<>(list.iterator(), HttpStatus.OK);
    }

    @RequestMapping(value = "/searchcustomer", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getSerch(@RequestParam String mailOrSdt) {
        Pageable pageable = PageRequest.of(0, 5);
        Page<CustomerEntity> entities;
        if (new LogicType().checkType(mailOrSdt)) {
            entities = customerServiceIpm.getByName(pageable, mailOrSdt);
            System.out.println("đây là chữ");
        } else {
            entities = customerServiceIpm.getBySDT(pageable, Integer.valueOf(mailOrSdt));
            System.out.println("đây là số");
        }
        return new ResponseEntity<>(entities.iterator(), HttpStatus.OK);
    }

    @RequestMapping(value = "/customer/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getId(@PathVariable int id) {
        Optional<CustomerEntity> customerEntity = customerServiceIpm.getIdCustomer(id);
        if (!customerEntity.isPresent()) {
            return new ResponseEntity<>("ko có giá tri", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(customerEntity.get(), HttpStatus.OK);
    }

    @RequestMapping(value = "/customer/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> putCustomer(@Valid @RequestBody CustomerDto customerDto, @PathVariable int id) {
        Optional<CustomerEntity> customerEntity = customerServiceIpm.getIdCustomer(id);
        if (!customerEntity.isPresent()) {
            return new ResponseEntity<>("ko có giá trị", HttpStatus.NOT_FOUND);

        }
        CustomerEntity entity = customerEntity.get();
        entity = (CustomerEntity) DtotoEntity.getDTO(entity, customerDto);
        customerServiceIpm.save(entity);
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @RequestMapping(value = "/customers", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> postCustomer(@Valid @RequestBody CustomerDto customerDto) {
        CustomerEntity entity = new CustomerEntity();
        entity = (CustomerEntity) DtotoEntity.getDTO(entity, customerDto);
        customerServiceIpm.save(entity);
        return new ResponseEntity<>(entity, HttpStatus.OK);
    }

    @RequestMapping(value = "/test", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getIdAA() {

        List<Map<String, Object>> tests = customerServiceIpm.getAll1();
        List<Test> tests1= (List<Test>) new MaptoDto().getMapList(tests,Test.class);
        return new ResponseEntity<>(tests1, HttpStatus.OK);
    }

}
