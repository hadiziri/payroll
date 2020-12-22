package com.sonatrach.dz.chang.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.chang.domain.Change;


@Repository
public interface ChangRepo extends JpaRepository<Change,String >{

}
