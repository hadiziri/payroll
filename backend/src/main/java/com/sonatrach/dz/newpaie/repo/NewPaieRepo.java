package com.sonatrach.dz.newpaie.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.newpaie.domain.NewPaie;



@Repository
public interface NewPaieRepo  extends JpaRepository<NewPaie ,String > {

}
