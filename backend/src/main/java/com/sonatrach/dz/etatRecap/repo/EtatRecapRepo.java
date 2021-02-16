package com.sonatrach.dz.etatRecap.repo;

import java.util.Date;
import java.util.List;
import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.etatMand.domain.EtatMand;
import com.sonatrach.dz.etatRecap.domain.EtatRecap;
import com.sonatrach.dz.etatRecap.domain.EtatRecapId;


@Repository
public interface EtatRecapRepo extends JpaRepository<EtatRecap, EtatRecapId> {
	List<EtatRecap>findByPayMonth();
	List<EtatRecap>findByReport(String report);
}
