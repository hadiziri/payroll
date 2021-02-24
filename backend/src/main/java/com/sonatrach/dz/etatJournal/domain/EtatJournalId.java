package com.sonatrach.dz.etatJournal.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Id;

public class EtatJournalId implements Serializable{
	String bulmatricule;
	String moispaie;
	public String getBulmatricule() {
		return bulmatricule;
	}
	public void setBulmatricule(String bulmatricule) {
		this.bulmatricule = bulmatricule;
	}
	public String getMoispaie() {
		return moispaie;
	}
	public void setMoispaie(String moispaie) {
		this.moispaie = moispaie;
	}

	
}
