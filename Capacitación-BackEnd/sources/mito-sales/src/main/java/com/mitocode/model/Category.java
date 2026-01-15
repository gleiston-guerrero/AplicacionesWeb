package com.mitocode.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Category {

    private Integer idCategory;
    private String name;
    private String description;
    private boolean enabled;

}
