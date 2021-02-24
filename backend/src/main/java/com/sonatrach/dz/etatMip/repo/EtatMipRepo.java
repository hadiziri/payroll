package com.sonatrach.dz.etatMip.repo;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.etatJournal.domain.EtatJournal;
import com.sonatrach.dz.etatMip.domain.EtatMip;



@Repository
public interface EtatMipRepo  extends JpaRepository<EtatMip, String>{
	ArrayList<EtatMip>findByPayMonth();
}
