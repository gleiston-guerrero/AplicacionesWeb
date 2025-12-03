package org.uteq.service.impl;

import org.uteq.model.Role;
import org.uteq.repository.IRoleRepo;
import org.uteq.repository.IGenericRepo;
import org.uteq.service.IRoleService;
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
