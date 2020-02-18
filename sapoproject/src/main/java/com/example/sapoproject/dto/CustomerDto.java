package com.example.sapoproject.dto;

import com.example.sapoproject.annotation.valite.Sdt;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

public class CustomerDto {

    private int idCustomer;
    @NotNull(message = "ko dc nulll")
    private String nameCustomer;
    @Sdt(message = "số điện thoaijt quá dài")
    @NotNull(message = "trường này không đươc null")
    private Integer phoneNumber;

    private String city;

    private String email;

    private String address;

    private String district;

    public int getIdCustomer() {
        return idCustomer;
    }

    public void setIdCustomer(int idCustomer) {
        this.idCustomer = idCustomer;
    }

    public String getNameCustomer() {
        return nameCustomer;
    }

    public void setNameCustomer(String nameCustomer) {
        this.nameCustomer = nameCustomer;
    }

    public Integer getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }
}
