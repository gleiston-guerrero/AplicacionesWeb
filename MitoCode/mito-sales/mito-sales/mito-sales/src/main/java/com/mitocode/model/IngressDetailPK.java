package com.mitocode.model;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;

@Embeddable
@EqualsAndHashCode
public class IngressDetailPK {

    @ManyToOne
    @JoinColumn(nullable = false, name = "id_ingress", foreignKey = @ForeignKey(name = "INGRESS_DETAIL_ING"))
    private Ingress ingress;

    @ManyToOne
    @JoinColumn(nullable = false, name = "id_product", foreignKey = @ForeignKey(name = "INGRESS_DETAIL_PRO"))
    private Product product;
}
