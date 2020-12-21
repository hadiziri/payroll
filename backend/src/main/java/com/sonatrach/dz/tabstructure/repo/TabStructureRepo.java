package com.sonatrach.dz.tabstructure.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.sonatrach.dz.tabstructure.domain.TabStructure;

@Repository
public interface TabStructureRepo extends JpaRepository<TabStructure, String>{

}
