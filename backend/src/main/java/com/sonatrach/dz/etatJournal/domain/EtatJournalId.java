package com.sonatrach.dz.etatJournal.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Id;

public class EtatJournalId implements Serializable{
	String bulmatricule;
	String moisexp;
	String anneeexp;
	public String getBulmatricule() {
		return bulmatricule;
	}
	public void setBulmatricule(String bulmatricule) {
		this.bulmatricule = bulmatricule;
	}
	public String getMoisexp() {
		return moisexp;
	}
	public void setMoisexp(String moisexp) {
		this.moisexp = moisexp;
	}
	public String getAnneeexp() {
		return anneeexp;
	}
	public void setAnneeexp(String anneeexp) {
		this.anneeexp = anneeexp;
	}
	
}
