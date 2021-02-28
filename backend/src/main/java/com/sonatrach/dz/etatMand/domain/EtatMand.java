package com.sonatrach.dz.etatMand.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

import com.sonatrach.dz.etatRet.domain.EtatRetId;

@Entity
@Table(name ="PAIE_ETAT_MANDATEMENT")
@IdClass(EtatMandId.class)
@NamedQuery(name = "EtatMand.findByPayMonth", query = "SELECT p FROM EtatMand  p  ")
public class EtatMand implements Serializable{
	@Id
	@Column(name="BUL_CBANQUE")
	String bulcbanque;
	@Id
	@Column(name="BUL_CAGENCE")
	String bulcagence;
	@Column(name="DEPT")
	String dept;
	@Column(name="BUL_NOM")
	String bulnom;
	@Column(name="BUL_NCOMPTE")
	String bulncompte;
	@Column(name="BUL_NET")
	BigDecimal bulnet;
	@Id
	@Column(name="BUL_MOIS_EXP")
	Date bulmoisexp;
	@Column(name="DIV")
	String div;
	@Column(name="DIR")
	String dir;
	@Id
	@Column(name="BUL_MATRICULE")
	String bulmatricule;
	@Column(name="BAN_DESIGNATION")
	String bandes;
	@Column(name="AGE_DESIGNATION")
	String agedes;
	@Column(name="DIV_DESIGNATION")
	String divdes;
	@Column(name="DIR_DESIGNATION")
	String dirdes;

	
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

	

	

	public BigDecimal getBulnet() {
		return bulnet;
	}

	public void setBulnet(BigDecimal bulnet) {
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

	public String getBandes() {
		return bandes;
	}

	public void setBandes(String bandes) {
		this.bandes = bandes;
	}

	public String getAgedes() {
		return agedes;
	}

	public void setAgedes(String agedes) {
		this.agedes = agedes;
	}

	public String getDivdes() {
		return divdes;
	}

	public void setDivdes(String divdes) {
		this.divdes = divdes;
	}

	public String getDirdes() {
		return dirdes;
	}

	public void setDirdes(String dirdes) {
		this.dirdes = dirdes;
	}
	
	
}
