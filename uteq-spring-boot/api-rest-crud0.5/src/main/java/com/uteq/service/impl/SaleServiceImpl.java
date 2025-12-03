package org.uteq.service.impl;

import org.uteq.model.Sale;
import org.uteq.repository.ISaleRepo;
import org.uteq.repository.IGenericRepo;
import org.uteq.service.ISaleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SaleServiceImpl extends CRUDImpl<Sale, Integer> implements ISaleService {

    //@Autowired
    private final ISaleRepo repo;

    @Override
    protected IGenericRepo<Sale, Integer> getRepo() {
        return repo;
    }

}
