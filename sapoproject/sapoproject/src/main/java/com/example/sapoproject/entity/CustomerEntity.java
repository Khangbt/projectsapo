package com.example.sapoproject.entity;

import javax.persistence.*;

@Entity
@Table(name = "customer", schema = "pos")
public class CustomerEntity {
    private int idCustomer;
    private String nameCustomer;
    private Integer phoneNumber;
    private String city;
    private String email;
    private String address;
    private String district;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "idcustomer", nullable = false)
    public int getIdcustomer() {
        return idCustomer;
    }

    public void setIdcustomer(int idcustomer) {
        this.idCustomer = idcustomer;
    }

    @Basic
    @Column(name = "name_customer", nullable = true, length = 45)
    public String getNameCustomer() {
        return nameCustomer;
    }

    public void setNameCustomer(String nameCustomer) {
        this.nameCustomer = nameCustomer;
    }

    @Basic
    @Column(name = "phone_number", nullable = true)
    public Integer getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Basic
    @Column(name = "city", nullable = true, length = 45)
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Basic
    @Column(name = "email", nullable = true, length = 45)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "address", nullable = true, length = 45)
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "District", nullable = true, length = 45)
    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CustomerEntity that = (CustomerEntity) o;

        if (idCustomer != that.idCustomer) return false;
        if (nameCustomer != null ? !nameCustomer.equals(that.nameCustomer) : that.nameCustomer != null) return false;
        if (phoneNumber != null ? !phoneNumber.equals(that.phoneNumber) : that.phoneNumber != null) return false;
        if (city != null ? !city.equals(that.city) : that.city != null) return false;
        if (email != null ? !email.equals(that.email) : that.email != null) return false;
        if (address != null ? !address.equals(that.address) : that.address != null) return false;
        if (district != null ? !district.equals(that.district) : that.district != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = idCustomer;
        result = 31 * result + (nameCustomer != null ? nameCustomer.hashCode() : 0);
        result = 31 * result + (phoneNumber != null ? phoneNumber.hashCode() : 0);
        result = 31 * result + (city != null ? city.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (address != null ? address.hashCode() : 0);
        result = 31 * result + (district != null ? district.hashCode() : 0);
        return result;
    }
}
