package com.example.sapoproject.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "customer", schema = "pos", catalog = "")
public class CustomerEntity {
    private int idcustomer;
    private String nameCustomer;
    private Integer phoneNumber;
    private String city;
    private String email;
    private String address;
    private String district;

    @Id
    @Column(name = "idcustomer", nullable = false)
    public int getIdcustomer() {
        return idcustomer;
    }

    public void setIdcustomer(int idcustomer) {
        this.idcustomer = idcustomer;
    }

    @Basic
    @Column(name = "name_customer", nullable = true, length = 45)
    public String getNameCustomer() {
        return nameCustomer;
    }

    public void setNameCustomer(String nameCustomer) {
        this.nameCustomer = nameCustomer;
    }

    @Basic
    @Column(name = "phone_number", nullable = true)
    public Integer getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Basic
    @Column(name = "city", nullable = true, length = 45)
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Basic
    @Column(name = "email", nullable = true, length = 45)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "address", nullable = true, length = 45)
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "District", nullable = true, length = 45)
    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CustomerEntity entity = (CustomerEntity) o;
        return idcustomer == entity.idcustomer &&
                Objects.equals(nameCustomer, entity.nameCustomer) &&
                Objects.equals(phoneNumber, entity.phoneNumber) &&
                Objects.equals(city, entity.city) &&
                Objects.equals(email, entity.email) &&
                Objects.equals(address, entity.address) &&
                Objects.equals(district, entity.district);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idcustomer, nameCustomer, phoneNumber, city, email, address, district);
    }
}
