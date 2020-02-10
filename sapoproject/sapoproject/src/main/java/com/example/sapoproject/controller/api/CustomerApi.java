package com.example.sapoproject.controller.api;

import com.example.sapoproject.annotation.Test;
import com.example.sapoproject.converter.Convent;
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

import javax.validation.constraints.Null;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin({"*"})
public class CustomerApi {
    @Autowired
    private CustomerServiceIpm customerServiceIpm;
    Convent<CustomerDto> convent=new Convent<>();
    //lấy full danh sách orders
    @RequestMapping(value = "/customers", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAll(@RequestParam(required = false, defaultValue = "0") @Null Integer page,
                                    @RequestParam(required = false, defaultValue = "5") @Null Integer size) {
        Pageable pageable = new LogicPage().logic(20, 0, size, page);
        Page<CustomerEntity> list = customerServiceIpm.getAll(pageable);
        if (list.getSize() == 0) {
            return new ResponseEntity<>("khong co gia tri", HttpStatus.BAD_GATEWAY);
        }
        Page<CustomerDto> dtos= (Page<CustomerDto>) DtotoEntity.getDto(list,CustomerDto.class);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @RequestMapping(value = "/searchcustomer", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getSerch(@RequestParam String mailOrSdt,
                                      @RequestParam(required = false, defaultValue = "0") @Null Integer page,
                                      @RequestParam(required = false, defaultValue = "5") @Null Integer size) {
        Pageable pageable =  new LogicPage().logic(20, 0, size, page);
        Page<CustomerEntity> entities;
        if (new LogicType().checkType(mailOrSdt)) {
            entities = customerServiceIpm.getByName(pageable, mailOrSdt);
            System.out.println("đây là chữ");
        } else {
            entities = customerServiceIpm.getBySDT(pageable, Integer.valueOf(mailOrSdt));
            System.out.println("đây là số");
        }
        if(entities.getSize()==0){
            return new ResponseEntity<>("không có giá trị",HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(DtotoEntity.getList(entities.toList(),CustomerDto.class), HttpStatus.OK);
    }

    @RequestMapping(value = "/customer/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getId(@PathVariable int id) {
        Optional<CustomerEntity> customerEntity = customerServiceIpm.getIdCustomer(id);
        if (!customerEntity.isPresent()) {
            return new ResponseEntity<>("ko có giá tri", HttpStatus.NOT_FOUND);
        }
        CustomerEntity entity=customerEntity.get();
        return new ResponseEntity<>(DtotoEntity.getDTOTest(CustomerDto.class,entity), HttpStatus.OK);
    }

    @RequestMapping(value = "/customer/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> putCustomer(@RequestBody Map<String,Object> mapDto, @PathVariable int id) {
        Optional<CustomerEntity> customerEntity = customerServiceIpm.getIdCustomer(id);
        if (!customerEntity.isPresent()) {
            return new ResponseEntity<>("ko có giá trị", HttpStatus.NOT_FOUND);
        }
        Object o=convent.dtoForm(mapDto,CustomerDto.class);
        if(!(o instanceof CustomerDto)){
            return new ResponseEntity<>(o, HttpStatus.OK);
        }

        CustomerEntity entity = customerEntity.get();
        System.err.println(((CustomerDto) o).getPhoneNumber()+"----------"+entity.getPhoneNumber());
        if(!(((CustomerDto) o).getPhoneNumber().equals(entity.getPhoneNumber()))){
            System.err.println("vào đây");
            if(customerServiceIpm.checkSdt(((CustomerDto) o).getPhoneNumber())){
                return new ResponseEntity<>("số điênn thoai đa tồn tại", HttpStatus.NOT_FOUND);
            }
        }
        entity = (CustomerEntity) DtotoEntity.getDTO(entity,o);
        entity.setIdcustomer(id);

        System.err.println(entity);
        CustomerEntity entity1= customerServiceIpm.saveAndGetID(entity);
        return new ResponseEntity<>(DtotoEntity.getDTOTest(CustomerDto.class,entity1), HttpStatus.OK);
    }

    @RequestMapping(value = "/customer", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> postCustomer(@RequestBody Map<String,Object> customerDto) {
        Object entity ;
        entity =  convent.dtoToEntity(CustomerEntity.class,customerDto, CustomerDto.class);
        if(!(entity instanceof CustomerEntity)){
             return new ResponseEntity<>(entity, HttpStatus.NOT_FOUND);
        }
        if (customerServiceIpm.checkSdt(((CustomerEntity) entity).getPhoneNumber())){
            return new ResponseEntity<>("Số điện thoại đã tồn tai", HttpStatus.NOT_FOUND);
        }
        CustomerEntity entity1= customerServiceIpm.saveAndGetID((CustomerEntity) entity);
        return new ResponseEntity<>(DtotoEntity.getDTOTest(CustomerDto.class,entity1), HttpStatus.OK);
    }

    @RequestMapping(value = "/test", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getIdAA() {

        List<Map<String, Object>> tests = customerServiceIpm.getAll1();
        List<Test> tests1= (List<Test>) new MaptoDto().getMapList(tests,Test.class);
        return new ResponseEntity<>(tests1, HttpStatus.OK);
    }

}
