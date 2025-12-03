package org.uteq.service.impl;

import org.uteq.model.Client;
import org.uteq.repository.IClientRepo;
import org.uteq.repository.IGenericRepo;
import org.uteq.service.IClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl extends CRUDImpl<Client, Integer> implements IClientService {

    //@Autowired
    private final IClientRepo repo;

    @Override
    protected IGenericRepo<Client, Integer> getRepo() {
        return repo;
    }

}
