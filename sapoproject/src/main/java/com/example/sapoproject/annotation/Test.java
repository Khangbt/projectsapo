package com.example.sapoproject.annotation;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Id;

public class Test {
    private int idcustomer;
    private String nameCustomer;

    private String city;



    public int getIdcustomer() {
        return idcustomer;
    }

    public void setIdcustomer(int idcustomer) {
        this.idcustomer = idcustomer;
    }



    public String getNameCustomer() {
        return nameCustomer;
    }

    public void setNameCustomer(String nameCustomer) {
        this.nameCustomer = nameCustomer;
    }






    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
}
