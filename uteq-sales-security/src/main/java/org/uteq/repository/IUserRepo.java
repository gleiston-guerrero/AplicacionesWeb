package org.uteq.repository;

import org.uteq.model.User;

public interface IUserRepo extends IGenericRepo<User, Integer> {

    //@Query -> FROM User WHERE u.username = :username
    User findOneByUsername(String username);

}
