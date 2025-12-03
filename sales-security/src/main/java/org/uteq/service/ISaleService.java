package org.uteq.service;

import org.uteq.dto.IProcedureDTO;
import org.uteq.dto.ProcedureDTO;
import org.uteq.model.Sale;

import java.util.List;
import java.util.Map;

public interface ISaleService extends ICRUD<Sale, Integer>{

    Sale getSaleMostExpensive(); //obtener la venta más cara
    String getBestSellerUsername(); //obtener el username del mejor vendedor
    Map<String, Long> getSaleCountBySeller(); //contar la cantidad de ventas por vendedor
    Map<String, Double> getMostSellerProduct(); //obtener el producto mas vendido
    List<ProcedureDTO> callProcedure1();
    List<IProcedureDTO> callProcedure2();
    List<ProcedureDTO> callProcedure3();
    void callProcedure4();
}
