package com.mitocode.service.impl;

import com.mitocode.model.User;
import com.mitocode.repository.IUserRepo;
import com.mitocode.repository.IGenericRepo;
import com.mitocode.service.IUserService;
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
