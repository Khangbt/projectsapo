package com.example.sapoproject.repository;


import com.example.sapoproject.entity.CustomerEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends CrudRepository<CustomerEntity,Integer> {
    @Query("SELECT e from CustomerEntity  as e where e.nameCustomer like %?1%")
    Page<CustomerEntity> getNameCustomer(Pageable pageable,String name);
    @Query(value = "SELECT * from pos.customer   where CONVERT(phone_number, CHAR(11)) like %?1%" ,nativeQuery = true)
    Page<CustomerEntity> getSdt(Pageable pageable,int sdt);
    @Query("select e from  CustomerEntity as e")
    Page<CustomerEntity> getAllCustoomer(Pageable pageable);
}
