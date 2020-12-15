package com.sonatrach.dz.diplome.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.diplome.domain.Diplome;




@Repository
public interface DiplomeRepo extends JpaRepository<Diplome,String >{

}
