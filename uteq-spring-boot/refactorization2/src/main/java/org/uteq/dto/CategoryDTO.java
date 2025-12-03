package org.uteq.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CategoryDTO {

    private Integer idCategory;

    @NotNull
    //@NotEmpty
    //@NotBlank
    @Size(min = 3, max = 50)
    private String nameofCategory;

    @NotNull
    @Size(min = 3, max = 50)
    private String descriptionCategory;

    @NotNull
    private boolean nabledCategory;

    /*@Max(value = 99)
    private int age1;
    @Min(value = 1)
    private int age2;

    @Email
    private String email;

    @Pattern(regexp = "[0-9]+")
    private String test;*/
}
