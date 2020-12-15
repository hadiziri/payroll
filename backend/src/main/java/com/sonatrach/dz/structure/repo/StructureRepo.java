package com.sonatrach.dz.structure.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.structure.domain.Structure;


@Repository
public interface StructureRepo extends JpaRepository<Structure, String>{

}
