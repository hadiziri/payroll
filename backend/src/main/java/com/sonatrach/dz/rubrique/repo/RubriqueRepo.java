package com.sonatrach.dz.rubrique.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.rubrique.domain.Rubrique;


@Repository
public interface RubriqueRepo  extends JpaRepository<Rubrique, String> {

}
