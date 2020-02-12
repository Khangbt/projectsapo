package com.example.sapoproject.controller.api;

import com.example.sapoproject.converter.Convent;
import com.example.sapoproject.converter.DtotoEntity;
import com.example.sapoproject.converter.MaptoDto;
import com.example.sapoproject.converter.Update;
import com.example.sapoproject.dto.GetOrderDto;
import com.example.sapoproject.dto.NameDto;
import com.example.sapoproject.dto.SalesboarDto;
import com.example.sapoproject.dto.SetOrderDto;
import com.example.sapoproject.entity.OrderbyEntity;
import com.example.sapoproject.entity.ProductEntity;
import com.example.sapoproject.entity.SalesboardEntity;
import com.example.sapoproject.logic.LogicPage;
import com.example.sapoproject.service.ipm.OrderServiceIpm;
import com.example.sapoproject.service.ipm.ProductServiceIpm;
import com.example.sapoproject.service.ipm.SalesboardServiceImp;
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
public class OrderApi {
    @Autowired
    private OrderServiceIpm orderServiceIpm;

    @Autowired
    private SalesboardServiceImp salesboardServiceImp;
    @Autowired
    private ProductServiceIpm productServiceIpm;
    private MaptoDto maptoDto=new MaptoDto();

//    private DtotoEntity dtotoEntity=new DtotoEntity();
// tìm theo id order
//    @RequestMapping(value = "/order/{id}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> getId(@PathVariable int id){
//        Optional<OrderbyEntity> entities=orderServiceIpm.getId(id);
//        if(!entities.isPresent()){
//            return new ResponseEntity<>("không có gía trị", HttpStatus.NOT_FOUND);
//        }
//
//         return new ResponseEntity<>(entities, HttpStatus.OK);
//    }
//    request ra chuỗi sp
    //lấy full danh sách orders

    @RequestMapping(value = "/orders",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAll(@RequestParam(required = false, defaultValue = "0") @Null Integer page,
                                    @RequestParam(required = false, defaultValue = "0") @Null Integer size)
    {
        Pageable pageable= new LogicPage().logic(20, 0, size, page);
        Page<Map<String,Object>> entities=  orderServiceIpm.getAllOrder(pageable);
        if(entities.getSize()==0){
            return new ResponseEntity<>("không có gía trị", HttpStatus.NOT_FOUND);
        }
       // List<GetOrderDto> getOrderDtos= (List<GetOrderDto>) maptoDto.getMapList(entities.toList(),GetOrderDto.class);
        Page<GetOrderDto> dtos= (Page<GetOrderDto>) maptoDto.getDto(entities,GetOrderDto.class);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
    //lấy danh sách theo tên khách hàng
    @RequestMapping(value = "/order",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getByNameProduct(@RequestParam String name,
                                              @RequestParam(required = false, defaultValue = "0") @Null Integer page,
                                              @RequestParam(required = false, defaultValue = "0") @Null Integer size)
    {
        Pageable pageable= new LogicPage().logic(20, 0, size, page);
        Page<Map<String,Object>> entities=  orderServiceIpm.getNameCustomer(pageable,name);
        if(entities.getSize()==0){
            return new ResponseEntity<>("không có gía trị", HttpStatus.NOT_FOUND);
        }
        // List<GetOrderDto> getOrderDtos= (List<GetOrderDto>) maptoDto.getMapList(entities.toList(),GetOrderDto.class);
        Page<GetOrderDto> dtos= (Page<GetOrderDto>) maptoDto.getDto(entities,GetOrderDto.class);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @RequestMapping(value = "/order/{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getIdOrder(@PathVariable int id) {
        Optional<Map<String,Object>> entity = orderServiceIpm.getIdorder(id);
        if (entity.get().size()==0) {
            return new ResponseEntity<>("không có giá tri", HttpStatus.OK);
        }
        Map<String,Object> entity1=entity.get();
        return new ResponseEntity<>(maptoDto.getMap(GetOrderDto.class,entity1), HttpStatus.OK);
    }
////     lưu 1 roder mới
//    @RequestMapping(value = "/orders",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> post(@RequestBody OrderbyEntity entity){
//     //   Iterable<SalesboardEntity> entities=orderServiceIpm.getId(id);
//
//        orderServiceIpm.saveGetObject(entity);
//        return new ResponseEntity<>(entity, HttpStatus.OK);
//    }
//    lưu danh sách đơn hàng khách hàng
//    @RequestMapping(value = "/orderslistboarn",method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseEntity<?> postList(@RequestBody List<SalesboardEntity> entity){
//        //   Iterable<SalesboardEntity> entities=orderServiceIpm.getId(id);
//        salesboardServiceImp.saveList(entity);
//        return new ResponseEntity<>(entity, HttpStatus.OK);
//    }
//    tên sp và số lượng khách hàng mua
    @RequestMapping(value = "/ordername/{id}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getNameId(@PathVariable int id){
        List<Map<String,Object>> entities=salesboardServiceImp.getName(id);
        List<NameDto> dtos= (List<NameDto>) maptoDto.getMapList(entities,NameDto.class);
        if(dtos.size()==0){
            return new ResponseEntity<>("không tồn tại id", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @RequestMapping(value = "/ordernames/{id}",method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getNameIdPage(@PathVariable int id,
                                           @RequestParam(required = false, defaultValue = "0") @Null Integer page,
                                           @RequestParam(required = false, defaultValue = "5") @Null Integer size){
        Pageable pageable = new LogicPage().logic(20, 0, size, page);
        Page<Map<String,Object>> entities=salesboardServiceImp.getNamePage(id,pageable);
        if(entities.getSize()==0){
            return new ResponseEntity<>("không tồn tại id", HttpStatus.NOT_FOUND);
        }
        Page<NameDto> dtos= (Page<NameDto>) maptoDto.getDto(entities,NameDto.class);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }
    //thêm 1 đơn hàng
    @RequestMapping(value = "/setorder" ,method = RequestMethod.POST,produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getOrderSp(@RequestBody Map<String,Object> map){
//        try {
            List<Integer> list=new ArrayList<>();
            Convent<SetOrderDto> convent=new Convent<>();
            Object setOrder= convent.dtoForm(map,SetOrderDto.class);
            if(!(setOrder instanceof SetOrderDto)){
                return new ResponseEntity<>(setOrder,HttpStatus.NOT_FOUND);
            }

            SetOrderDto setOrderDto= (SetOrderDto) setOrder;
            List<SalesboarDto> maps=setOrderDto.getSalesboarDtos();
            List<Map<String,Object>> mapList=new ArrayList<>();
                for (Object dto:maps){
                    Map<String,Object> dto1= (Map<String, Object>) dto;
                    mapList.add(dto1);
                }
            List<SalesboarDto> salesboarDtos= (List<SalesboarDto>) new MaptoDto().getMapList(mapList,SalesboarDto.class);
            for (SalesboarDto dto:salesboarDtos) {
                list.add(dto.getIdProduct());
            }
            List<ProductEntity> list1= (List<ProductEntity>) productServiceIpm.getListId(list);
            List<ProductEntity> productEntities= new Update().updateProduct(list1,salesboarDtos);
            if(productEntities==null){
                return new ResponseEntity<>("Lỗi sản phẩm quá số lượng",HttpStatus.NOT_FOUND);
            }

            OrderbyEntity orderbyEntity= (OrderbyEntity) DtotoEntity.getDTOTest(OrderbyEntity.class,setOrderDto);
            Date date=new Date();
            orderbyEntity.setDateSale(new Timestamp(date.getTime()));
            OrderbyEntity orderbyEntity1=orderServiceIpm.saveGetObject(orderbyEntity);
            List<SalesboardEntity> salesboardEntities= (List<SalesboardEntity>) DtotoEntity.getList(salesboarDtos,SalesboardEntity.class);
            for (SalesboardEntity salesboardEntity: salesboardEntities){
                salesboardEntity.setIdorder(orderbyEntity1.getIdorder());
            }
            salesboardServiceImp.saveList(salesboardEntities);
            productServiceIpm.saveList(productEntities);
            return new ResponseEntity<>(orderbyEntity,HttpStatus.OK);
        }
//        catch (Exception e){
//            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
//        }


}
