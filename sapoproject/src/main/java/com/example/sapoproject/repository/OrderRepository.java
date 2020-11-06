package com.example.sapoproject.repository;

import com.example.sapoproject.entity.OrderbyEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;
@Repository
public interface OrderRepository extends JpaRepository<OrderbyEntity,Integer> {
    Optional<OrderbyEntity> getByIdorder(int id);
    @Query(value = "SELECT orderby.*,orderby.id as idorder,payment.name,customer.phone_number,customer.name_customer " +
            " from customer,orderby,payment where customer.idcustomer=orderby.customer_id and " +
            " payment.idpayment=orderby.payment_methods_id order by orderby.id ASC ",nativeQuery = true)
    Page<Map<String,Object>> getAll(Pageable pageable);
    @Query(value = "select max(id) from orderby",nativeQuery = true)
    int getMaxOrder();
    @Query(value = "select orderby.*,payment.name,customer.phone_number,customer.name_customer  " +
            "from customer,orderby,payment where customer.idcustomer=orderby.customer_id and  " +
            "payment.idpayment=orderby.payment_methods_id and customer.name_customer like %?1%",nativeQuery = true)
    Page<Map<String,Object>> getByCutomerName(Pageable pageable,String name);
    @Query(value = "SELECT orderby.*,payment.name,customer.phone_number,customer.name_customer " +
            "from customer,orderby,payment where customer.idcustomer=orderby.customer_id and  " +
            "payment.idpayment=orderby.payment_methods_id and orderby.id=?1 ",nativeQuery = true)
    Optional<Map<String,Object>> getIdOrder(int id);
}