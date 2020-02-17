package com.example.sapoproject.dto;

import com.example.sapoproject.annotation.valite.SizeL;

import javax.validation.constraints.NotNull;
import java.util.List;

public class SetOrderDto {
    @NotNull(message = "không có khách hàng")
    private Integer idCustomer;
    @NotNull(message = "thiếu tổng số tiền thiếu")
    private Long totalAmount;
    @NotNull(message = "số tiền khách trả thiếu")
    private Long amountPaid;
    @NotNull(message = "số tiền trả lại thiếu")
    private Long unpaidAmount;
    @NotNull(message = "thiếu phương thức thanh toán")
    private Integer idPaymentMethods;
// @SizeL(size = 20)
    @NotNull(message = "không dc thiếu")
    private List<SalesboarDto> salesboarDtos;


    public Integer getIdCustomer() {
        return idCustomer;
    }

    public void setIdCustomer(Integer idCustomer) {
        this.idCustomer = idCustomer;
    }

    public Long getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Long totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Long getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(Long amountPaid) {
        this.amountPaid = amountPaid;
    }

    public Long getUnpaidAmount() {
        return unpaidAmount;
    }

    public void setUnpaidAmount(Long unpaidAmount) {
        this.unpaidAmount = unpaidAmount;
    }

    public Integer getIdPaymentMethods() {
        return idPaymentMethods;
    }

    public void setIdPaymentMethods(Integer idPaymentMethods) {
        this.idPaymentMethods = idPaymentMethods;
    }

    public List<SalesboarDto> getSalesboarDtos() {
        return salesboarDtos;
    }

    public void setSalesboarDtos(List<SalesboarDto> salesboarDtos) {
        this.salesboarDtos = salesboarDtos;
    }
}
