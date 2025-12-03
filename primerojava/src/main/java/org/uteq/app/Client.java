package org.uteq.app;

import lombok.*;
import org.uteq.util.Status;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Client{
    private String name;
    private LocalDate birthDate;
    private String email;
    private String phone;
    private float credit;
    private Integer sales;

    private Status status;

    @Override
    public String toString() {
        String stringClient = "Name: " + this.name;
        stringClient += "\nBirth Date: " + this.birthDate;
        stringClient += "\nEmail: " + this.email;
        stringClient += "\nPhone: " + this.phone;
        stringClient += "\nCredit: " + this.credit;
        stringClient += "\nSales: " + this.sales;
        stringClient += "\nStatus: " + this.status;

        return stringClient;
    }
    /*
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public float getCredit() {
        return credit;
    }

    public void setCredit(float credit) {
        this.credit = credit;
    }

    public Integer getSales() {
        return sales;
    }

    public void setSales(Integer sales) {
        this.sales = sales;
    }

    public Client() {
    }

    public Client(String name, LocalDate birthDate, String email, String phone, float credit, Integer sales) {
        this.name = name;
        this.birthDate = birthDate;
        this.email = email;
        this.phone = phone;
        this.credit = credit;
        this.sales = sales;
    }
     */
}
