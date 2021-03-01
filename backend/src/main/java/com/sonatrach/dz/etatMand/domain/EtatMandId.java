package com.sonatrach.dz.etatMand.domain;

import java.io.Serializable;
import java.util.Date;

public class EtatMandId implements Serializable {
	String bulmatricule;
	Date bulmoisexp;
	String bulcbanque;

	public String getBulmatricule() {
		return bulmatricule;
	}
	public void setBulmatricule(String bulmatricule) {
		this.bulmatricule = bulmatricule;
	}
	public Date getBulmoisexp() {
		return bulmoisexp;
	}
	public void setBulmoisexp(Date bulmoisexp) {
		this.bulmoisexp = bulmoisexp;
	}
	public String getBulcbanque() {
		return bulcbanque;
	}
	public void setBulcbanque(String bulcbanque) {
		this.bulcbanque = bulcbanque;
	}

	
}
