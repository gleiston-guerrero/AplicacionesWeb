package org.uteq.repository;

import org.uteq.dto.IProcedureDTO;
import org.uteq.dto.ProcedureDTO;
import org.uteq.model.Sale;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.Procedure;

import java.util.List;

public interface ISaleRepo extends IGenericRepo<Sale, Integer> {

    @Query(value = "select * from fn_sales()", nativeQuery = true)
    List<ProcedureDTO> callProcedure1();

    @Query(value = "select * from fn_sales()", nativeQuery = true)
    List<IProcedureDTO> callProcedure2();

    @Query(name = "Sale.fn_sales",nativeQuery = true)
    List<ProcedureDTO> callProcedure3();

    @Procedure(procedureName = "pr_sales")
    void callProcedure4();
}
