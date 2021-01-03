package com.sonatrach.dz.shactivity.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.shactivity.domain.ShActivity;



@Repository
public interface ShActivityRepo extends JpaRepository<ShActivity, Integer> {

}
