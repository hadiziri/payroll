package com.sonatrach.dz.rubNum.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.rubNum.RubNum;


@Repository
public interface RubNumRepo extends JpaRepository<RubNum ,String > {

}
