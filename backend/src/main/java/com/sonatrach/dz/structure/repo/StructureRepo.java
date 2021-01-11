package com.sonatrach.dz.structure.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.structure.domain.Structure;


@Repository
public interface StructureRepo extends JpaRepository<Structure, Integer >{
List<Structure> findByActivity(Integer idA);
List<Structure>findByStatus(int status);
Structure findByName(String name);

}
