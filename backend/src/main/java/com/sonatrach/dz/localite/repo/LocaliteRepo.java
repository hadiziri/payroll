package com.sonatrach.dz.localite.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.localite.domain.Localite;


@Repository
public interface LocaliteRepo extends JpaRepository<Localite,String >{

}
