package com.sonatrach.dz.emailDB.repo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.emailDB.domain.EmailDB;


@Repository
public interface EmailDbRepo extends JpaRepository<EmailDB, Integer>{
ArrayList<EmailDB>findByIdUser(Integer id);
}
