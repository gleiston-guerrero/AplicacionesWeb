package com.mitocode.service.impl;

import com.mitocode.model.Sale;
import com.mitocode.repository.ISaleRepo;
import com.mitocode.repository.IGenericRepo;
import com.mitocode.service.ISaleService;
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
