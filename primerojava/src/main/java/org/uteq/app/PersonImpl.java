package org.uteq.app;

import lombok.Data;
import org.uteq.interfaces.IPerson;

import java.io.Serializable;

@Data
public class PersonImpl extends Person implements IPerson, Serializable {
    private int age;

    @Override
    public int calculateAge() {
        return age;
    }

    @Override
    public void incrementAge(int age) {
        this.age += age;
    }
}