package com.example.sapoproject.entity;

import javax.persistence.*;

@Entity
@Table(name = "payment_method", schema = "pos", catalog = "")
public class PaymentEntity {
    private int idpayment;
    private String namePayment;

    @Id
    @Column(name = "id", nullable = false)
    public int getIdpayment() {
        return idpayment;
    }

    public void setIdpayment(int idpayment) {
        this.idpayment = idpayment;
    }

    @Basic
    @Column(name = "name", nullable = true, length = 45)
    public String getNamePayment() {
        return namePayment;
    }

    public void setNamePayment(String namePayment) {
        this.namePayment = namePayment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        PaymentEntity that = (PaymentEntity) o;

        if (idpayment != that.idpayment) return false;
        if (namePayment != null ? !namePayment.equals(that.namePayment) : that.namePayment != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idpayment;
        result = 31 * result + (namePayment != null ? namePayment.hashCode() : 0);
        return result;
    }
}
