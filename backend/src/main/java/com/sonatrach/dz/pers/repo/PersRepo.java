package com.sonatrach.dz.pers.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.pers.domain.Pers;



@Repository
public interface PersRepo  extends JpaRepository<Pers ,String > {

}
