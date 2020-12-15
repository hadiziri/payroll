package com.sonatrach.dz.fonction.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.fonction.domain.Fonction;



@Repository
public interface FonctionRepo extends JpaRepository<Fonction,String >{

}
