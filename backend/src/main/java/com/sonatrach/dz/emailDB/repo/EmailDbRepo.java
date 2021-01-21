package com.sonatrach.dz.emailDB.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.emailDB.domain.EmailDB;


@Repository
public interface EmailDbRepo extends JpaRepository<EmailDB, Integer>{

}
