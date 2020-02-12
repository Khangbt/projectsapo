package com.example.sapoproject.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;

public class SalesboardEntityPK implements Serializable {
    private int idorder;
    private int idproduct;

    @Column(name = "idorder", nullable = false)
    @Id
    public int getIdorder() {
        return idorder;
    }

    public void setIdorder(int idorder) {
        this.idorder = idorder;
    }

    @Column(name = "idproduct", nullable = false)
    @Id
    public int getIdproduct() {
        return idproduct;
    }

    public void setIdproduct(int idproduct) {
        this.idproduct = idproduct;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SalesboardEntityPK that = (SalesboardEntityPK) o;

        if (idorder != that.idorder) return false;
        if (idproduct != that.idproduct) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idorder;
        result = 31 * result + idproduct;
        return result;
    }
}
