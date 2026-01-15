package model;


import lombok.*;

import java.util.Objects;

//@Data
@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @ToString.Include
    @EqualsAndHashCode.Include
    private int idProduct;

    @ToString.Include
    @EqualsAndHashCode.Include
    //@ToString.Exclude
    private String name;

    //@ToString.Exclude
    //@EqualsAndHashCode.Exclude
    private double price;


}
