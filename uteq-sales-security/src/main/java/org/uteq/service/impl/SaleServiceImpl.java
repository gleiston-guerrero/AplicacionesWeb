package org.uteq.service.impl;

import org.uteq.dto.IProcedureDTO;
import org.uteq.dto.ProcedureDTO;
import org.uteq.model.Sale;
import org.uteq.model.SaleDetail;
import org.uteq.repository.ISaleRepo;
import org.uteq.repository.IGenericRepo;
import org.uteq.service.ISaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Stream;

import static java.util.stream.Collectors.*;


@Service
@RequiredArgsConstructor
public class SaleServiceImpl extends CRUDImpl<Sale, Integer> implements ISaleService {

    //@Autowired
    private final ISaleRepo repo;

    @Override
    protected IGenericRepo<Sale, Integer> getRepo() {
        return repo;
    }

    @Override
    public Sale getSaleMostExpensive() {
        return repo.findAll()
                .stream()
                .max(Comparator.comparing(Sale::getTotal))
                .orElse(new Sale());
    }

    @Override
    public String getBestSellerUsername() {
        Map<String, Double> byUser = repo.findAll()
                .stream()
                .collect(groupingBy(s -> s.getUser().getUsername(), summingDouble(Sale::getTotal)));

        System.out.println(byUser);

        return Collections.max(byUser.entrySet(), Comparator.comparingDouble(Map.Entry::getValue)).getKey();
    }

    @Override
    public Map<String, Long> getSaleCountBySeller() {
        return repo.findAll()
                .stream()
                .collect(groupingBy(s -> s.getUser().getUsername(), counting()));
    }

    @Override
    public Map<String, Double> getMostSellerProduct() {
        Stream<Sale> saleStream = repo.findAll().stream();
        Stream<List<SaleDetail>> lsStream = saleStream.map(Sale::getDetails);

        //[ [det1,det2], [det3,det4], [det5,det6]......  ]
        //[det1, det2, det3, det4, det5 ...]
        Stream<SaleDetail> streamDetail = lsStream.flatMap(Collection::stream); //list -> list.stream()
        Map<String, Double> byProduct = streamDetail
                .collect(groupingBy(d -> d.getProduct().getName(), summingDouble(SaleDetail::getQuantity)));

        return byProduct.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .collect(toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (oldValue, newValue) -> oldValue, LinkedHashMap::new
                ));
    }

    @Override
    public List<ProcedureDTO> callProcedure1() {
        return repo.callProcedure1();
    }

    @Override
    public List<IProcedureDTO> callProcedure2() {
        return repo.callProcedure2();
    }

    @Override
    public List<ProcedureDTO> callProcedure3() {
        return repo.callProcedure3();
    }

    @Override
    public void callProcedure4() {
        repo.callProcedure4();
    }
}
