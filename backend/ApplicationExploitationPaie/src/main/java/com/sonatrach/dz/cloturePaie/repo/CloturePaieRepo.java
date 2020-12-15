package com.sonatrach.dz.cloturePaie.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.cloturePaie.domain.CloturePaie;

@Repository
public interface CloturePaieRepo extends JpaRepository<CloturePaie, Integer>{

}
