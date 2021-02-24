package com.sonatrach.dz.etatJournal.repo;

import java.util.ArrayList;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sonatrach.dz.etatJournal.domain.EtatJournal;



@Repository
public interface EtatJournalRepo extends JpaRepository<EtatJournal, String>{
ArrayList<EtatJournal>findByPayMonth();
}
