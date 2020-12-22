package com.sonatrach.dz.dep.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.dep.domain.Dep;




@Repository
public interface DepRepo extends JpaRepository<Dep,String > {

}
