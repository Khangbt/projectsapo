package com.example.sapoproject.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "orderby", schema = "pos")
public class OrderbyEntity {
    private int idorder;
    private Integer idcustomer;
    private Timestamp dateSale;
    private Long totalAmount;
    private Long amountPaid;
    private Long unpaidAmount;
    private Integer idPaymentMethods;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    public int getIdorder() {
        return idorder;
    }

    public void setIdorder(int idorder) {
        this.idorder = idorder;
    }

    @Basic
    @Column(name = "customer_id", nullable = true)
    public Integer getIdcustomer() {
        return idcustomer;
    }

    public void setIdcustomer(Integer idcustomer) {
        this.idcustomer = idcustomer;
    }

    @Basic
    @Column(name = "sale_date", nullable = true)
    public Timestamp getDateSale() {
        return dateSale;
    }

    public void setDateSale(Timestamp dateSale) {
        this.dateSale = dateSale;
    }

    @Basic
    @Column(name = "total_amount", nullable = true, precision = 0)
    public Long getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Long totalAmount) {
        this.totalAmount = totalAmount;
    }

    @Basic
    @Column(name = "amount_paid", nullable = true, precision = 0)
    public Long getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(Long amountPaid) {
        this.amountPaid = amountPaid;
    }

    @Basic
    @Column(name = "unpaid_amount", nullable = true, precision = 0)
    public Long getUnpaidAmount() {
        return unpaidAmount;
    }

    public void setUnpaidAmount(Long unpaidAmount) {
        this.unpaidAmount = unpaidAmount;
    }

    @Basic
    @Column(name = "payment_methods_id", nullable = true)
    public Integer getIdPaymentMethods() {
        return idPaymentMethods;
    }

    public void setIdPaymentMethods(Integer idPaymentMethods) {
        this.idPaymentMethods = idPaymentMethods;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        OrderbyEntity that = (OrderbyEntity) o;

        if (idorder != that.idorder) return false;
        if (idcustomer != null ? !idcustomer.equals(that.idcustomer) : that.idcustomer != null) return false;
        if (dateSale != null ? !dateSale.equals(that.dateSale) : that.dateSale != null) return false;
        if (totalAmount != null ? !totalAmount.equals(that.totalAmount) : that.totalAmount != null) return false;
        if (amountPaid != null ? !amountPaid.equals(that.amountPaid) : that.amountPaid != null) return false;
        if (unpaidAmount != null ? !unpaidAmount.equals(that.unpaidAmount) : that.unpaidAmount != null) return false;
        if (idPaymentMethods != null ? !idPaymentMethods.equals(that.idPaymentMethods) : that.idPaymentMethods != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idorder;
        result = 31 * result + (idcustomer != null ? idcustomer.hashCode() : 0);
        result = 31 * result + (dateSale != null ? dateSale.hashCode() : 0);
        result = 31 * result + (totalAmount != null ? totalAmount.hashCode() : 0);
        result = 31 * result + (amountPaid != null ? amountPaid.hashCode() : 0);
        result = 31 * result + (unpaidAmount != null ? unpaidAmount.hashCode() : 0);
        result = 31 * result + (idPaymentMethods != null ? idPaymentMethods.hashCode() : 0);
        return result;
    }
}
