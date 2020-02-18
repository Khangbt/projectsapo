package com.example.sapoproject.repository;

import com.example.sapoproject.entity.OrderbyEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Map;
import java.util.Optional;
@Repository
public interface OrderRepository extends JpaRepository<OrderbyEntity,Integer> {

    Optional<OrderbyEntity> getByIdorder(int id);
    @Query(value = "SELECT  orders.id as idOrder, orders.customer_id as idCustomer ,orders.sale_date as dateSale,orders.total_amount as totalAmount," +
            "orders.paid_amount as amountPaid,orders.unpaid_amount as unpaidAmount,orders.payment_method_id ,payment_method.name as namePayment,customer.phone_number as phoneNumber,customer.customer_name as nameCustomer " +
            "from customer,orders,payment_method where customer.id=orders.customer_id and " +
            "payment_method.id=orders.payment_method_id "+"order  by orders.sale_date desc",nativeQuery = true)
    Page<Map<String,Object>> getAll(Pageable pageable);
    @Query(value = "select max(id) from orders",nativeQuery = true)
    int getMaxOrder();
    @Query(value = "SELECT  orders.id as idOrder, orders.customer_id as idCustomer ,orders.sale_date as dateSale,orders.total_amount as totalAmount," +
            "orders.paid_amount as amountPaid," +
            "orders.unpaid_amount as unpaidAmount,orders.payment_method_id,payment_method.name as namePayment,customer.phone_number as phoneNumber,customer.customer_name as name_customer " +
            "from customer,orders,payment_method where customer.id=orders.customer_id and " +
            "payment_method.id=orders.payment_method_id and (customer.customer_name like %?1%) "+"order  by orders.sale_date desc" ,nativeQuery = true)
    Page<Map<String,Object>> getByCutomerName(Pageable pageable,String name);
    @Query(value = "SELECT  orders.id as idOrder, orders.customer_id as idCustomer ,orders.sale_date as dateSale,orders.total_amount as totalAmount," +
            "orders.paid_amount as amountPaid," +
            "orders.unpaid_amount as unpaidAmount,orders.payment_method_id,payment_method.name as namePayment,customer.phone_number as phoneNumber,customer.customer_name as name_customer " +
            "from customer,orders,payment_method where customer.id=orders.customer_id and " +
            "payment_method.id=orders.payment_method_id and orders.id=?1",nativeQuery = true)
    Optional<Map<String,Object>> getIdOrder(int id);
}

