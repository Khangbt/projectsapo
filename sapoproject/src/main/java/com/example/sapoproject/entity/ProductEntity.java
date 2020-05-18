package com.example.sapoproject.entity;


import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "product", schema = "pos")
public class ProductEntity {
    private int idproduct;
    private String nameProduct;
    private Integer inventoryNumber;
    private Timestamp dateCreated;
    private Long price;
    private String productCode;
    private Long version;

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
    public Long getPrice() {
        return price;
    }
    public void setPrice(Long price) {
        this.price = price;
    }


    @Version
    @Column(name = "version", nullable = true)
    public Long getVersion() {
        return version;
    }

    public void setVersion(Long version) {
        this.version = version;
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
