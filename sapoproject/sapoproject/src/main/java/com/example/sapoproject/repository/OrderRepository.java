package com.example.sapoproject.repository;

import com.example.sapoproject.entity.OrderbyEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;
@Repository
public interface OrderRepository extends CrudRepository<OrderbyEntity,Integer> {
    Optional<OrderbyEntity> getByIdorder(int id);
    @Query(value = "SELECT orderby.*,payment.name_payment,customer.phone_number,customer.name_customer " +
                   "from customer,orderby,payment where customer.idcustomer=orderby.idcustomer and " +
                   "payment.idpayment=orderby.id_payment_methods",nativeQuery = true)
    Iterable<Map<String,Object>> getAll();
}

