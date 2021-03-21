package com.sonatrach.dz.rubNum.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.rubNum.domain.RubId;
import com.sonatrach.dz.rubNum.domain.RubNum;


@Repository
public interface RubNumRepo extends JpaRepository<RubNum ,String > {

}
