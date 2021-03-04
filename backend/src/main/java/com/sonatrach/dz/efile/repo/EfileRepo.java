package com.sonatrach.dz.efile.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.efile.domain.Efile;



@Repository
public interface EfileRepo extends JpaRepository<Efile, Integer> {
public List<Efile> findByIdStructure(Integer idS);
Efile findByIdStrIdFile(Integer idS,Integer idF);
}
