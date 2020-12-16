package com.sonatrach.dz.pays.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.pays.domain.Pays;

@Repository

public interface PaysRepo extends JpaRepository<Pays, Integer>{

}
