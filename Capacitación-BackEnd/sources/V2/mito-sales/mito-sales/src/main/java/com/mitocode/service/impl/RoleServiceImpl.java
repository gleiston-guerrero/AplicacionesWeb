package com.mitocode.service.impl;

import com.mitocode.model.Role;
import com.mitocode.repository.IRoleRepo;
import com.mitocode.repository.IGenericRepo;
import com.mitocode.service.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl extends CRUDImpl<Role, Integer> implements IRoleService {

    private final IRoleRepo repo;

    @Override
    protected IGenericRepo<Role, Integer> getRepo() {
        return repo;
    }

}
