package com.mitocode.service.impl;

import com.mitocode.model.Provider;
import com.mitocode.repository.IProviderRepo;
import com.mitocode.repository.IGenericRepo;
import com.mitocode.service.IProviderService;
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
