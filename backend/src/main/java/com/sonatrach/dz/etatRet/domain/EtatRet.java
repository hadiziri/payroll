package com.sonatrach.dz.etatRet.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.NamedQuery;
import javax.persistence.Table;



@Entity
@Table(name ="PAIE_ETAT_RETIMPOSABLES")
@IdClass(EtatRetId.class)
@NamedQuery(name = "EtatRet.findByPayMonth", query = "SELECT p FROM EtatRet  p WHERE moisexp=?1 AND anneeexp=?2 order by divop")
public class EtatRet implements Serializable{
	@Column(name="MOIS_EXP")
	String moisexp;
	@Column(name="ANNEE_EXP")
	String anneeexp;
	@Id
	@Column(name="AGT_MATRICULE")
	String agtmatricule;
	@Column(name="AGT_NOM")
	String agtnom;
	@Column(name="DIV_OP")
	String divop;
	@Column(name="DIR")
	String dir;
	@Id
	@Column(name="RUB_IMP")
	String rubimp;
	@Column(name="RUB_DESIGNATION")
	String rubdesignation;
	@Column(name="DBUL_RAPPEL")
	Float dbulrappel;
	@Column(name="DBUL_MONTANT")
	Float dbulmontant;
	
	public EtatRet() {
		
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

	public String getAgtmatricule() {
		return agtmatricule;
	}

	public void setAgtmatricule(String agtmatricule) {
		this.agtmatricule = agtmatricule;
	}

	public String getAgtnom() {
		return agtnom;
	}

	public void setAgtnom(String agtnom) {
		this.agtnom = agtnom;
	}

	public String getDivop() {
		return divop;
	}

	public void setDivop(String divop) {
		this.divop = divop;
	}

	public String getDir() {
		return dir;
	}

	public void setDir(String dir) {
		this.dir = dir;
	}

	public String getRubimp() {
		return rubimp;
	}

	public void setRubimp(String rubimp) {
		this.rubimp = rubimp;
	}

	public String getRubdesignation() {
		return rubdesignation;
	}

	public void setRubdesignation(String rubdesignation) {
		this.rubdesignation = rubdesignation;
	}

	public Float getDbulrappel() {
		return dbulrappel;
	}

	public void setDbulrappel(Float dbulrappel) {
		this.dbulrappel = dbulrappel;
	}

	public Float getDbulmontant() {
		return dbulmontant;
	}

	public void setDbulmontant(Float dbulmontant) {
		this.dbulmontant = dbulmontant;
	}


	
	
}
