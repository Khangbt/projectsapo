package com.example.sapoproject.dto;

import java.sql.Timestamp;
import java.util.List;

public class OrderDto {
    private int idorder;
    private Integer idcustomer;
    private Timestamp dateSale;
    private Integer totalAmount;
    private Integer amountPaid;
    private Integer unpaidAmount;
    private Integer idPaymentMethods;

    private  List<SalesboarDto> salesboarDtos;

    private List<NameDto> nameDtos;

    public List<SalesboarDto> getSalesboarDtos() {
        return salesboarDtos;
    }

    public void setSalesboarDtos(List<SalesboarDto> salesboarDtos) {
        this.salesboarDtos = salesboarDtos;
    }

    public List<NameDto> getNameDtos() {
        return nameDtos;
    }

    public void setNameDtos(List<NameDto> nameDtos) {
        this.nameDtos = nameDtos;
    }

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

    public void setDateSale(Timestamp dateSale) {
        this.dateSale = dateSale;
    }

    public Integer getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Integer totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Integer getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(Integer amountPaid) {
        this.amountPaid = amountPaid;
    }

    public Integer getUnpaidAmount() {
        return unpaidAmount;
    }

    public void setUnpaidAmount(Integer unpaidAmount) {
        this.unpaidAmount = unpaidAmount;
    }

    public Integer getIdPaymentMethods() {
        return idPaymentMethods;
    }

    public void setIdPaymentMethods(Integer idPaymentMethods) {
        this.idPaymentMethods = idPaymentMethods;
    }
}
