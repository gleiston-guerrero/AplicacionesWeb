package org.uteq.service.impl;

import org.uteq.model.User;
import org.uteq.repository.IUserRepo;
import org.uteq.repository.IGenericRepo;
import org.uteq.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl extends CRUDImpl<User, Integer> implements IUserService {
    
    private final IUserRepo repo;

    @Override
    protected IGenericRepo<User, Integer> getRepo() {
        return repo;
    }

}
