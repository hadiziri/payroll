package com.sonatrach.dz.etatMand.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

@Entity
@Table(name ="PAIE_ETAT_MANDATEMENT")
@NamedQuery(name = "EtatMand.findByPayMonth", query = "SELECT p FROM EtatMand  p WHERE bulmoisexp=?1 order by bulcbanque,bulcagence ")
public class EtatMand {
	
	@Column(name="BUL_CBANQUE")
	String bulcbanque;
	@Column(name="BUL_CAGENCE")
	String bulcagence;
	@Column(name="DEPT")
	String dept;
	@Column(name="BUL_NOM")
	String bulnom;
	@Column(name="BUL_NCOMPTE")
	String bulncompte;
	@Column(name="BUL_NET")
	Float bulnet;
	@Column(name="BUL_MOIS_EXP")
	Date bulmoisexp;
	@Column(name="DIV")
	String div;
	@Column(name="DIR")
	String dir;
	@Id
	@Column(name="BUL_MATRICULE")
	String bulmatricule;
	
	public EtatMand() {
		
	}

	public String getBulcbanque() {
		return bulcbanque;
	}

	public void setBulcbanque(String bulcbanque) {
		this.bulcbanque = bulcbanque;
	}

	public String getBulcagence() {
		return bulcagence;
	}

	public void setBulcagence(String bulcagence) {
		this.bulcagence = bulcagence;
	}

	public String getDept() {
		return dept;
	}

	public void setDept(String dept) {
		this.dept = dept;
	}

	public String getBulnom() {
		return bulnom;
	}

	public void setBulnom(String bulnom) {
		this.bulnom = bulnom;
	}

	public String getBulncompte() {
		return bulncompte;
	}

	public void setBulncompte(String bulncompte) {
		this.bulncompte = bulncompte;
	}

	

	public Float getBulnet() {
		return bulnet;
	}

	public void setBulnet(Float bulnet) {
		this.bulnet = bulnet;
	}

	public Date getBulmoisexp() {
		return bulmoisexp;
	}

	public void setBulmoisexp(Date bulmoisexp) {
		this.bulmoisexp = bulmoisexp;
	}

	public String getDiv() {
		return div;
	}

	public void setDiv(String div) {
		this.div = div;
	}

	public String getDir() {
		return dir;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}

	public String getBulmatricule() {
		return bulmatricule;
	}

	public void setBulmatricule(String bulmatricule) {
		this.bulmatricule = bulmatricule;
	}
	
	
}
