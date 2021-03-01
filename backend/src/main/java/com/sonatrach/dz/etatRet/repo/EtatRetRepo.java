package com.sonatrach.dz.etatRet.repo;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.etatJournal.domain.EtatJournal;
import com.sonatrach.dz.etatRet.domain.EtatRet;
import com.sonatrach.dz.etatRet.domain.EtatRetId;



@Repository
public interface EtatRetRepo  extends JpaRepository<EtatRet, EtatRetId>
{
	ArrayList<EtatRet>findByPayMonth();
}
