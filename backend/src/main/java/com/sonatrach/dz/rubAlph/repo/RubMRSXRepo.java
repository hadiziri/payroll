package com.sonatrach.dz.rubAlph.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.rubAlph.domain.RubMRSX;



@Repository
public interface RubMRSXRepo extends JpaRepository<RubMRSX ,String >{

}
