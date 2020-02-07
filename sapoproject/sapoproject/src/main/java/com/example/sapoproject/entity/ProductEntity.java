package com.example.sapoproject.entity;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "product", schema = "pos")
public class ProductEntity {
    private int idproduct;
    private String nameProduct;
    private Integer inventoryNumber;
    private Timestamp dateCreated;
    private Integer price;
    private String productCode;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "idproduct", nullable = false)
    public int getIdproduct() {
        return idproduct;
    }

    public void setIdproduct(int idproduct) {
        this.idproduct = idproduct;
    }

    @Basic
    @Column(name = "name_product", nullable = true, length = 45)
    public String getNameProduct() {
        return nameProduct;
    }

    public void setNameProduct(String nameProduct) {
        this.nameProduct = nameProduct;
    }

    @Basic
    @Column(name = "inventory_number", nullable = true)
    public Integer getInventoryNumber() {
        return inventoryNumber;
    }

    public void setInventoryNumber(Integer inventoryNumber) {
        this.inventoryNumber = inventoryNumber;
    }

    @Basic
    @Column(name = "date_created", nullable = true)
    public Timestamp getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Timestamp dateCreated) {
        this.dateCreated = dateCreated;
    }

    @Basic
    @Column(name = "price", nullable = true, precision = 0)
    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ProductEntity that = (ProductEntity) o;

        if (idproduct != that.idproduct) return false;
        if (nameProduct != null ? !nameProduct.equals(that.nameProduct) : that.nameProduct != null) return false;
        if (inventoryNumber != null ? !inventoryNumber.equals(that.inventoryNumber) : that.inventoryNumber != null)
            return false;
        if (dateCreated != null ? !dateCreated.equals(that.dateCreated) : that.dateCreated != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idproduct;
        result = 31 * result + (nameProduct != null ? nameProduct.hashCode() : 0);
        result = 31 * result + (inventoryNumber != null ? inventoryNumber.hashCode() : 0);
        result = 31 * result + (dateCreated != null ? dateCreated.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        return result;
    }

    @Basic
    @Column(name = "product_code", nullable = true, length = 45)
    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }
}
