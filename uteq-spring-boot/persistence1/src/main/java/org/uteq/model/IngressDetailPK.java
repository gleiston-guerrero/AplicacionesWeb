package org.uteq.model;

import jakarta.persistence.*;
import lombok.EqualsAndHashCode;

@Embeddable
@EqualsAndHashCode
public class IngressDetailPK {

    @ManyToOne
    @JoinColumn(nullable = false, name = "ingress_id", foreignKey = @ForeignKey(name = "INGRESS_DETAIL_ING"))
    private Ingress ingress;

    @ManyToOne
    @JoinColumn(nullable = false, name = "product_id", foreignKey = @ForeignKey(name = "INGRESS_DETAIL_PRO"))
    private Product product;
}
