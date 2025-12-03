package org.uteq.service.impl;

import org.uteq.model.Provider;
import org.uteq.repository.IProviderRepo;
import org.uteq.repository.IGenericRepo;
import org.uteq.service.IProviderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProviderServiceImpl extends CRUDImpl<Provider, Integer> implements IProviderService {
    
    private final IProviderRepo repo;

    @Override
    protected IGenericRepo<Provider, Integer> getRepo() {
        return repo;
    }

}
