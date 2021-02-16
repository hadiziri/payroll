package com.sonatrach.dz.etatMand.repo;

import java.util.Date;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.etatJournal.domain.EtatJournal;
import com.sonatrach.dz.etatMand.domain.EtatMand;


@Repository
public interface EtatMandRepo  extends JpaRepository<EtatMand, String>{
ArrayList<EtatMand>findByPayMonth();
}
