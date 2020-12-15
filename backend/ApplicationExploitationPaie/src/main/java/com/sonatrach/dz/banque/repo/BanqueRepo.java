package com.sonatrach.dz.banque.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.banque.domain.Banque;
import com.sonatrach.dz.banque.domain.BanqueId;


@Repository
public interface BanqueRepo extends JpaRepository<Banque, BanqueId> {

}
