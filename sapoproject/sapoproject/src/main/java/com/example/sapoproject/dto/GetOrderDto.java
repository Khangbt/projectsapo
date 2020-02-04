package com.example.sapoproject.dto;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

public class GetOrderDto {
    private int idorder;
    private Integer idcustomer;
    private Timestamp dateSale;
    private BigDecimal totalAmount;
    private BigDecimal amountpaid;
    private BigDecimal unpaidAmount;
    private String namePayment;
    private Integer phoneNumber;
    private String nameCustomer;

    public int getIdorder() {
        return idorder;
    }

    public void setIdorder(int idorder) {
        this.idorder = idorder;
    }

    public Integer getIdcustomer() {
        return idcustomer;
    }

    public void setIdcustomer(Integer idcustomer) {
        this.idcustomer = idcustomer;
    }

    public Timestamp getDateSale() {
        return dateSale;
    }

    public String getNamePayment() {
        return namePayment;
    }

    public void setNamePayment(String namePayment) {
        this.namePayment = namePayment;
    }

    public void setDateSale(Timestamp dateSale) {
        this.dateSale = dateSale;
    }


    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public BigDecimal getAmountpaid() {
        return amountpaid;
    }

    public void setAmountpaid(BigDecimal amountpaid) {
        this.amountpaid = amountpaid;
    }

    public BigDecimal getUnpaidAmount() {
        return unpaidAmount;
    }

    public void setUnpaidAmount(BigDecimal unpaidAmount) {
        this.unpaidAmount = unpaidAmount;
    }





    public Integer getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getNameCustomer() {
        return nameCustomer;
    }

    public void setNameCustomer(String nameCustomer) {
        this.nameCustomer = nameCustomer;
    }
}
