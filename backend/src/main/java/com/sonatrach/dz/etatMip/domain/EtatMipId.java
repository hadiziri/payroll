package com.sonatrach.dz.etatMip.domain;

import java.io.Serializable;
import java.sql.Date;

public class EtatMipId implements Serializable{
	String bulmatricule;
	Date bulmoispaie;
	public String getBulmatricule() {
		return bulmatricule;
	}
	public void setBulmatricule(String bulmatricule) {
		this.bulmatricule = bulmatricule;
	}
	public Date getBulmoispaie() {
		return bulmoispaie;
	}
	public void setBulmoispaie(Date bulmoispaie) {
		this.bulmoispaie = bulmoispaie;
	}
	
}
