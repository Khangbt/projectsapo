package com.example.sapoproject.entity;

import javax.persistence.*;

@Entity
@Table(name = "salesboard", schema = "pos")
@IdClass(SalesboardEntityPK.class)
public class SalesboardEntity {
    private int idorder;
    private int idproduct;
    private Integer amount;

    @Id
    @Column(name = "idorder", nullable = false)
    public int getIdorder() {
        return idorder;
    }

    public void setIdorder(int idorder) {
        this.idorder = idorder;
    }

    @Id
    @Column(name = "idproduct", nullable = false)
    public int getIdproduct() {
        return idproduct;
    }

    public void setIdproduct(int idproduct) {
        this.idproduct = idproduct;
    }

    @Basic
    @Column(name = "amount", nullable = true)
    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SalesboardEntity that = (SalesboardEntity) o;

        if (idorder != that.idorder) return false;
        if (idproduct != that.idproduct) return false;
        if (amount != null ? !amount.equals(that.amount) : that.amount != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idorder;
        result = 31 * result + idproduct;
        result = 31 * result + (amount != null ? amount.hashCode() : 0);
        return result;
    }
}
